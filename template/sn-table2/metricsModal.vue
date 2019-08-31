<!--
 * @Author: wenhao.huang
 * @UserId: 18073766
 * @Create: 2019-08-27 22:21:53
 -->
<template>
  <el-dialog
    :visible.sync="showAddMetrics"
    width="900px"
    top="10vh"
  >
    <div
      slot="title"
      class="flex-center"
    >
      <span class="bold dialog-title">选择指标</span>
      <span class="dialog-title-comment">(最多可选30个指标)</span>
    </div>
    <div class="search-line flex flex-center mb20">
      <el-select
        class="mr10"
        v-model="metricStatus"
        placeholder="指标状态"
      >
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <el-select
        class="mr10"
        v-model="metricType"
        placeholder="指标类型"
        clearable
      >
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
      <el-select
        class="mr10"
        v-model="domain"
        @change="subjectByDomain"
        placeholder="业务域"
        clearable
        @clear="clearDomain"
      >
        <el-option
          v-for="item in domainList"
          :key="item.busiDomain"
          :value="item.busiDomain"
          :label="item.busiName"
        />
      </el-select>
      <el-select
        class="mr10"
        v-model="subject"
        placeholder="主题"
        clearable
      >
        <el-option
          v-for="item in subjectList"
          :key="item.subject"
          :value="item.subject"
          :label="item.subjectName"
        />
      </el-select>
      <el-input
        class="search-input mr10"
        v-model="searchKey"
        placeholder="请输入名称或编码"
      />
      <el-button
        type="primary"
        @click="searchBtn"
      >查询</el-button>
    </div>
    <el-sn-table2
      v-if="showAddMetrics"
      ref="metricTable"
      class="modal-table"
      v-loading="loading"
      keywords="metricCode"
      :columns="columns"
      :selection="selection"
      :default-selects="defaultSelects"
      @select-change="selectChange"
      :data="tableData"
      :pagination="pagination"
      @page-change="pageChange"
    />
    <span slot="footer">
      <el-button @click="showAddMetrics = false">取 消</el-button>
      <el-button
        type="primary"
        :disabled="!selectList.length"
        @click="addSeleMetrics"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      searchKey: '', // 搜索条件
      subject: '', // 主题
      subjectList: [],
      domain: '', // 业务域
      domainList: [],
      metricType: '', // 指标类型
      typeList: [
        {
          label: '汇总指标',
          value: '1'
        },
        {
          label: '明细指标',
          value: '0'
        }
      ],
      metricStatus: '1', // 指标状态
      statusList: [
        {
          label: '上线指标',
          value: '1'
        }
        // {
        //   label: '灰度指标',
        //   value: '2'
        // }
      ],
      loading: false,
      pagination: {
        currentPage: 1,
        total: 0
      },
      showAddMetrics: true, // 弹框默认显示
      selectList: this.$store.state.metricsList || [], // 已选中的数据
      tableData: [],
      columns: [
        {
          type: 'selection',
          keywords: 'metricCode', // 行的唯一性属性关键字
          selectable: (row, index) => {
            // return this.metricsList.some(v => v.metricCode === row.metricCode)
            return true
          }
        },
        {
          key: 'metricName',
          title: '指标名称',
          showOverflowTooltip: true,
          width: 220
        },
        {
          key: 'metricCode',
          title: '指标编码',
          width: 190
        },
        {
          key: 'metricStatus',
          title: '指标状态',
          render: (h, params) => {
            const { metricStatus = null } = params.row
            const label = metricStatus ? (metricStatus === '1' ? '上线' : '灰度') : null
            return h('span', {}, label)
          }
        },
        {
          key: 'metricType',
          title: '指标类型',
          render: (h, params) => {
            const { metricType = null } = params.row
            const label = metricType ? (metricType === '1' ? '汇总' : '明细') : null
            return h('span', {}, label)
          }
        },
        {
          key: 'domainName',
          title: '业务域'
        },
        {
          key: 'subjectName',
          title: '主题'
        }
      ],
      header: [
        {
          prop: 'metricName',
          label: '指标名称',
          showOverflowTooltip: true,
          width: 220
        },
        {
          prop: 'metricCode',
          label: '指标编码',
          width: 190
        },
        {
          prop: 'metricStatus',
          label: '指标状态',
          cellRender: (h, metricStatus) => {
            const label = metricStatus ? (metricStatus === '1' ? '上线' : '灰度') : null
            return h('span', {}, label)
          }
        },
        {
          prop: 'metricType',
          label: '指标类型',
          cellRender: (h, metricType) => {
            const label = metricType ? (metricType === '1' ? '汇总' : '明细') : null
            return h('span', {}, label)
          }
        },
        {
          prop: 'domainName',
          label: '业务域'
        },
        {
          prop: 'subjectName',
          label: '主题'
        }
      ],
      selection: {
        status: true,
        width: '40px',
        reserveSelection: true,
        selectable: (row, index) => {
          if (this.metricsList.length) {
            const obj = this.metricsList.find(item => item.metricCode === row.metricCode)
            return !obj
          } else {
            return true
          }
        }
      },
      domainSubjectList: [] // 业务域与主题
    }
  },
  computed: {
    ...mapGetters(['metricsList']),
    defaultSelects() {
      console.log(this.selectList.map(v => v.metricCode))
      return this.selectList.map(v => v.metricCode)
    }
  },
  watch: {
    showAddMetrics(val) {
      if (!val) {
        this.$emit('close-add-metrics')
      }
    }
  },
  create() {
    // 已选取的指标
    this.selectList = JSON.parse(JSON.stringify(this.metricsList))
  },
  mounted() {
    console.log('---------------------')
    // 查询业务域与主题
    this.domainSubject()
    // 查询列表
    this.pagination.currentPage = 1
    this.searchList()
    this.showAddMetrics = true
  },
  methods: {
    // 添加多个指标
    addSeleMetrics() {
      // 过滤掉store中的指标
      const metricCodeList = []
      this.metricsList.forEach(item => {
        metricCodeList.push(item.metricCode)
      })
      let arr = JSON.parse(JSON.stringify(this.selectList))
      arr = arr.filter(item => !metricCodeList.includes(item.metricCode))
      const storeLen = this.metricsList.length
      const selectedLen = arr.length
      if (storeLen + selectedLen > 30) {
        this.$message.warning('最多添加30条指标！')
        return false
      }
      this.$store.dispatch('addMetrics', { select: arr })
      this.showAddMetrics = false
    },
    // 表格多选
    selectChange(selection) {
      console.log(selection)
      if (this.loading) {
        return
      }
      this.selectList = selection
      // selection.forEach(v=>{
      //   const isSelected = this.selectList.some(v=>v.metricCode === item.metricCode)
      // })
      // const selectList = [...this.selectList, ...selection]
      // this.selectList = Array.from(new Set(selectList))
      // console.log(this.selectList)
      // 当前表格的数据
      // const _current = this.tableData
      // // 已选中的数据
      // const _selected = this.selectList
      // _current.forEach(item => {
      //   const inCurrent = selection.find(v => v.metricCode === item.metricCode)
      //   const inSelected = _selected.find(v => v.metricCode === item.metricCode)
      //   if (inCurrent && !inSelected) {
      //     // 添加操作
      //     this.selectList.push(item)
      //   }
      //   if (!inCurrent && inSelected) {
      //     _selected.forEach((ele, index) => {
      //       if (ele.metricCode === item.metricCode) {
      //         this.selectList.splice(index, 1)
      //       }
      //     })
      //   }
      // })
    },
    getRowKey(row) {
      return row.metricCode
    },
    // 查询按钮
    searchBtn() {
      this.pagination.currentPage = 1
      this.searchList()
    },
    // 清空业务域,主题也清空
    clearDomain() {
      this.subject = ''
      this.subjectList = []
    },
    // 根据业务域查主题
    subjectByDomain(val) {
      const obj = this.domainSubjectList.find(item => {
        return item.busiDomain === val
      })
      this.subjectList = obj && obj.subjects ? obj.subjects : []
    },
    // 业务域与主题查询
    domainSubject() {
      this.$get(
        {
          api: 'rule/queryDataSet'
        },
        res => {
          this.domainSubjectList = res.data || []
          this.domainList = res.data || []
        }
      )
    },
    // 查询指标列表
    searchList() {
      const { pageSize = 10, currentPage: pageNo = 1 } = this.pagination
      const params = {
        metricStatus: this.metricStatus,
        metricType: this.metricType,
        domainCode: this.domain,
        subject: this.subject,
        metricInfo: this.searchKey,
        pageNo,
        pageSize
      }
      this.loading = true
      this.$post(
        {
          api: 'rule/queryMetrics',
          params
        },
        ({ data = {} }) => {
          const { rows = [], totalCount = 0 } = data
          this.tableData = rows
          this.pagination.total = totalCount
          this.loading = false
        },
        () => {
          this.loading = false
        }
      )
    },
    // 当前页码改变
    pageChange(page) {
      this.pagination.currentPage = page
      this.searchList()
    }
  }
}
</script>
