<!--
 * @Author: wenhao.huang
 * @UserId: 18073766
 * @Create: 2019-08-30 19:35:47
 -->
<script>
import cell from './cell';

export default {
  name: 'CellRow',
  components: {
    cell
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: () => 0
    },
    scope: {
      type: Object,
      default: () => {}
    }
  },
  render(h) {
    let template = '';
    const { render, click, key = '' } = this.item;
    const { row } = this.scope;
    if (render) {
      template = h(cell, {
        props: {
          render,
          row,
          index: this.index
        }
      });
    } else if (click) {
      template = h(
        'span',
        {
          class: 'text-primary is-btn',
          on: {
            click: () => {
              click(row);
            }
          }
        },
        row[key]
      );
    } else {
      template = h('span', row[key]);
    }
    return template;
  }
};
</script>
