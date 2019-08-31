<!--
 * @Author: wenhao.huang
 * @UserId: 18073766
 * @Create: 2019-08-30 19:33:12
 -->
<template>
  <div class="el-sn-table2">
    <el-table
      ref="elDataTable"
      :data="list"
      :height="height"
      :stripe="stripe"
      :border="border"
      :fit="fit"
      :highlight-current-row="highlightCurrentRow"
      :default-sort="defaultSort"
      @select="rowSelected"
      @select-all="handleSelectionAll"
      @current-change="currentChange"
      @expand-change="expandChange"
      @sort-change="sortChange"
      v-loading="loading"
    >
      <el-table-column
        v-if="tablePrefix.type&&(tablePrefix.type==='expand'||(Array.isArray(tablePrefix.type)&&tablePrefix.type.some(unit=>unit==='expand')))"
        type="expand"
        :width="tablePrefix.width"
        :min-width="tablePrefix.minWidth"
      >
        <template slot-scope="props">
          <cell-row
            :item="tablePrefix"
            :index="props.$index"
            :scope="props"
            :key="`${timestamp}-${props.$index}`"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="tablePrefix.type&&(tablePrefix.type==='index'||(Array.isArray(tablePrefix.type)&&tablePrefix.type.some(unit=>unit==='index')))"
        type="index"
        :index="tablePrefix.index"
        :width="tablePrefix.width"
        :min-width="tablePrefix.minWidth"
      />
      <el-table-column
        v-if="tablePrefix.type&&(tablePrefix.type==='radio'||(Array.isArray(tablePrefix.type)&&tablePrefix.type.some(unit=>unit==='radio')))"
        label=" "
        :width="tablePrefix.width||50"
        :min-width="tablePrefix.minWidth"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="scope.row[keywords]"
            :disabled="!(tablePrefix.selectable?tablePrefix.selectable(scope.row,scope.$index):true)"
            @change="radioChange($event, scope.row)"
          >&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tablePrefix.type&&(tablePrefix.type==='selection'||(Array.isArray(tablePrefix.type)&&tablePrefix.type.some(unit=>unit==='selection')))"
        type="selection"
        :selectable="tablePrefix.selectable"
        :width="tablePrefix.width"
        :min-width="tablePrefix.minWidth"
      />
      <el-table-column
        v-for="(item, index) in tableColumns"
        :key="item.key"
        :label="item.title"
        :prop="item.key"
        :column-key="item.key"
        :width="item.width"
        :align="item.align"
        :header-align="item.align"
        :sortable="item.sortable===true?'custom':undefined"
        :min-width="item.minWidth"
        :fixed="item.fixed"
        :formatter="item.formatter"
        :show-overflow-tooltip="item.showOverflowTooltip"
        :class-name="item.className"
        :label-class-name="item.labelClassName"
        :filters="item.filters"
        :filter-method="item.filters&&item.filterMethod"
      >
        <template slot-scope="scope">
          <cell-row
            :item="item"
            :index="index"
            :scope="scope"
            :key="`${timestamp}-${scope.$index}-${index}`"
          />
        </template>
      </el-table-column>
      <!-- 最后的一列操作列 -->
      <el-table-column
        label="操作"
        v-if="operation && operation.commands && operation.commands.length"
        :width="operation.width"
        :min-width="operation.minWidth"
        class-name="column-operation"
      >
        <template slot-scope="scope">
          <div class="column-operation-more">
            <el-button
              v-for="(item, index) in operation.commands.filter(v => !v.visibleFunc || v.visibleFunc(scope.row))"
              :key="index"
              type="text"
              :disabled="item.disabledFunc && item.disabledFunc(scope.row)"
              @click="handleOperate(item.command, scope.row, scope.$index)"
            >{{ item.label }}</el-button>
            <div v-if="operation && operation.groups && operation.groups.filter(v => !v.visibleFunc || v.visibleFunc(scope.row)).length">
              <el-dropdown
                v-for="(group, index) in operation.groups.filter(v => !v.visibleFunc || v.visibleFunc(scope.row))"
                :key="index"
                @command="(value) => handleOperate(value, scope.row, scope.$index)"
              >
                <span class="el-dropdown-link">{{ group.title }}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in group.children.filter(v => !v.visibleFunc || v.visibleFunc(scope.row))"
                    :key="index"
                    :disabled="item.disabledFunc && item.disabledFunc(scope.row)"
                    :command="item.command"
                  >{{ item.label }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt10"
      v-if="pagination && pagination.total"
      :total="pagination.total"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :simple="pagination.simple"
      :layout="pagination.layout"
      :hide-on-single-page="pagination.hideOnSingPage"
      @size-change="limitChange"
      @current-change="currentPageChange"
    />
  </div>
</template>

<script>
import cellRow from './cellRow';

export default {
  name: 'ElSnTable2',
  components: {
    cellRow
  },
  props: {
    columns: {
      // 列数据
      type: Array,
      default: () => []
    },
    data: {
      // 表格数据
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: () => undefined
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    fit: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object,
      default: undefined
    },
    pagination: {
      // 分页栏配置
      type: Object,
      default: () => undefined
    },
    defaultRadio: {
      // 默认单选行
      type: String,
      default: ''
    },
    defaultSelects: {
      // 默认多选, 传入已勾选的行keywords值
      type: Array,
      default: () => []
    },
    operation: {
      type: Object,
      default: () => {
        return {
          width: 200,
          commands: [],
          groups: []
        };
      }
    }
  },
  data() {
    return {
      loading: false, // 加载状态
      timestamp: 1, // 当前页数据加载完成时刻时间戳,用于组件key渲染唯一性校验
      tableColumns: [], // 表格列数据,去除含有type类型的对象后的列数据
      tablePrefix: {}, // 表格前缀对象,用于type不为空时的表头对象记录
      keywords: '', // 表格行数据关键字,必须为唯一类型.用来区分行数据,多选和单选必需
      list: [], // 表格内容数据
      radio: '', // 单选值
      multipleSelection: [] // 多选项数组,当type类型为selection时使用这个数组存储被勾选的行对象.
    };
  },
  watch: {
    data(arr) {
      this.list = arr || [];
      if (this.tablePrefix.type) {
        this.setTableRowCheckStatus(arr);
      }
      this.dataChange();
    },
    defaultRadio() {
      this.radio = this.defaultRadio;
    },
    columns() {
      this.handleTableColumnsData();
    }
  },
  created() {
    this.handleTableColumnsData();
  },
  mounted() {
    this.list = this.data || [];
    if (this.defaultRadio) {
      this.radio = this.defaultRadio; // 处理默认单选行
    }
    if (this.defaultSelects.length) {
      this.setTableRowCheckStatus(this.data); // 处理默认多选行
    }
  },
  methods: {
    handleTableColumnsData() {
      this.tableColumns = [];
      this.tablePrefix = {};
      this.columns.forEach(item => {
        if (item.type) {
          this.tablePrefix = item;
          this.keywords = item.keywords;
        } else {
          this.tableColumns.push(item);
        }
      });
    },
    // 处理操作列事件
    handleOperate(command, row, index) {
      this.$emit('handle-operate', command, row, index);
    },
    dataChange() {
      // 数据改变时拿到时间戳, 用于cell组件渲染
      this.timestamp = new Date().valueOf();
    },
    // 分页-切换条数据
    limitChange(limit) {
      this.$emit('size-change', limit);
    },
    // 分页-当前页码改变
    currentPageChange(page) {
      this.$emit('page-change', page);
    },
    // 全选选择框点击时触发, 根据selection的内容来判断是全选还是取消全选
    handleSelectionAll(selection) {
      if (selection.length === 0) {
        // 反选, 反选前必定是全选状态, 直接将本页中所有数据从multipleSelection中删除
        this.list.forEach(item => {
          this.multipleSelection.forEach((v, index) => {
            if (item[this.keywords] === v[this.keywords]) {
              this.multipleSelection.splice(index, 1);
            }
          });
        });
      } else {
        // 全选, 将本页中没有加入multipleSelection的项加入进去
        selection.forEach(item => {
          if (!this.multipleSelection.some(v => v[this.keywords] === item[this.keywords])) {
            this.multipleSelection.push(item);
          }
        });
      }
      this.$emit('select-change', this.multipleSelection);
    },
    // 勾选或取消勾选一行时触发, 根据row是否在selection中判断是勾选还是取消勾选
    rowSelected(selection, row) {
      if (selection.length > 0 && selection.some(item => item[this.keywords] === row[this.keywords])) {
        // 勾选动作, 将这行数据加入到多选数组中
        this.multipleSelection.push(row);
      } else {
        // 取消勾选动作, 从多选数组中删除这行数据
        this.multipleSelection.forEach((item, index) => {
          if (item[this.keywords] === row[this.keywords]) {
            this.multipleSelection.splice(index, 1);
          }
        });
        // 如果取消勾选的行是默认勾选的, 从其从默认勾选数组中去除
        if (this.defaultSelects && this.defaultSelects.some(v => v === row[this.keywords])) {
          const index = this.defaultSelects.findIndex(i => i === row[this.keywords]);
          this.defaultSelects.splice(index, 1);
        }
      }
      this.$emit('select-change', this.multipleSelection);
    },
    // 设置表格当前页的各行勾选状态
    setTableRowCheckStatus(data) {
      const arr = [];
      data.forEach(item => {
        if (this.multipleSelection && this.multipleSelection.some(v => v[this.keywords] === item[this.keywords])) {
          const index = this.multipleSelection.findIndex(v => v[this.keywords] === item[this.keywords]);
          arr.push(this.multipleSelection[index]);
        }
        // 如果本页中有默认勾选数据,将其勾选, 并放入已勾选数组,同时从默认勾选数组中去除
        if (this.defaultSelects && this.defaultSelects.some(v => v === item[this.keywords])) {
          this.multipleSelection.push(item);
          arr.push(item);
          const index2 = this.defaultSelects.findIndex(v => v === item[this.keywords]);
          this.defaultSelects.splice(index2, 1);
        }
      });
      this.$nextTick(() => {
        arr.forEach(item => {
          this.$refs.elDataTable.toggleRowSelection(item);
        });
      });
      this.$emit('select-change', this.multipleSelection);
    },
    // 行选择状态重置,用于一个操作完成后表格状态重置,如批量删除成功后调用,表格的多选值就重置了
    reset() {
      this.multipleSelection = [];
      this.defaultSelects.length = 0;
      this.defaultRadio = '';
      this.radio = '';
      this.$emit('radio-change', '');
      this.$emit('select-change', []);
    },
    // 单选时当前选中行变化
    radioChange(val, row) {
      this.$emit('radio-change', row);
    },
    // 当前点击的行变化
    currentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow);
    },
    // 可展开时展开或关闭行时触发
    expandChange(row, expandRows) {
      this.$emit('expand-change', row, expandRows);
    },
    // 排序条件变化
    sortChange(column) {
      this.$emit('sort-change', column);
    },
    // 清除过滤条件,如果参数为空,就清除所有过滤条件
    clearFilter(val) {
      this.$refs.elDataTable.clearFilter(val);
    }
  }
};
</script>
