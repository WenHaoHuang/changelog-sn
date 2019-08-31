/**
 * 函数式组件,渲染cell内容
 * @author chengbin 2019.08.21
 */
export default {
  name: 'TableCell',
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    };
    return ctx.props.render(h, params);
  }
};
