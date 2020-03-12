/**
 * Created by yourEmail on 2017/11/17.
 */
define(function (require, exports) {
  // page加载完成后调用ready方法
  exports.ready = function (hashCode, data, cite) {
    // 创建virtual model
    yufp.custom.vue({
      el: '#el_table_x_doc',
      data: {
        grid: {
          data1: [
            {name: 'default-load', remark: '默认触发查询', type: 'boolean', option: '—', default: 'true'},
            {name: 'pageable', remark: '是否分页', type: 'boolean', option: '—', default: 'true'},
            {name: 'data-url', remark: '查询URL', type: 'String', option: '—', default: '-'},
            {name: 'base-params', remark: '固定参数（不会随着动态参数变化而变化）', type: 'object', option: '—', default: '{}'},
            {name: 'checkbox', remark: '是否显示复选框', type: 'boolean', option: '—', default: 'true'},
            {name: 'table-columns', remark: '属性列配置(详见下表描述)', type: 'Array', option: '—', default: '[]'},
            {name: 'table-filters', remark: '过滤器配置，用于像表格内部传递过滤器', type: 'Object', option: '—', default: '[]'},
            {name: '-'},
            {name: 'height', remark: 'Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则 Table 的高度受控于外部样式。', type: 'string/number', option: '—', default: '—'},
            {name: 'max-height', remark: 'Table 的最大高度', type: 'string/number', option: '—', default: '—'},
            {name: 'stripe', remark: '是否为斑马纹 table', type: 'boolean', option: '—', default: 'true'},
            {name: 'border', remark: '是否带有纵向边框', type: 'boolean', option: '—', default: 'true'},
            {name: 'fit', remark: '列的宽度是否自撑开', type: 'boolean', option: '—', default: 'true'},
            {name: 'show-header', remark: '是否显示表头', type: 'boolean', option: '—', default: 'true'},
            {name: 'highlight-current-row', remark: '是否要高亮当前行', type: 'boolean', option: '—', default: 'true'},
            {name: 'row-class-name', remark: '行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。', type: 'Function(row, index)/String', option: '—', default: '-'},
            {name: 'row-style', remark: '行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。', type: 'Function(row, index)/Object', option: '—', default: '-'},
            {name: 'row-key', remark: '行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的', type: 'Function(row)/String', option: '—', default: '-'},
            {name: 'show-summary', remark: '是否在表尾显示合计行', type: 'boolean', option: '—', default: 'false'},
            {name: 'sum-text', remark: '合计行第一列的文本', type: 'string', option: '—', default: '—'},
            {name: 'summary-method', remark: '自定义的合计计算方法', type: 'Function({ columns, data })', option: '—', default: '—'},
            {name: 'current-row-key', remark: '当前行的 key，只写属性', type: 'String,Number', option: '—', default: '—'},
            {name: 'empty-text', remark: '空数据时显示的文本内容', type: 'string', option: '—', default: '—'},
            {name: 'expand-row-keys', remark: '可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。', type: 'string', option: '—', default: '—'},
            {name: 'default-expand-all', remark: '是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效', type: 'string', option: '—', default: '—'},
            {name: 'default-sort', remark: '默认的排序列的prop和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序', type: 'string', option: 'order: ascending, descending', default: '如果只指定了prop, 没有指定order, 则默认顺序是ascending'},
            {name: 'tooltip-effect', remark: 'tooltip effect 属性', type: 'dark/light', option: '—', default: '—'}
          ],
          data2: [
            {name: 'clearSelection', remark: '用于多选表格，清空用户的选择，当使用 reserve-selection 功能的时候，可能会需要使用此方法', param: 'selection'},
            {name: 'toggleRowSelection', remark: '用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）', param: 'row, selected'},
            {name: 'setCurrentRow', remark: '用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。', param: 'row'}
          ],
          data3: [
            {name: 'select', remark: '当用户手动勾选数据行的 Checkbox 时触发的事件', param: 'selection, row'},
            {name: 'select-all', remark: '当用户手动勾选全选 Checkbox 时触发的事件', param: 'selection'},
            {name: 'selection-change', remark: '当选择项发生变化时会触发该事件', param: 'selection'},
            {name: 'cell-mouse-enter', remark: '当单元格 hover 进入时会触发该事件', param: 'row, column, cell, event'},
            {name: 'cell-mouse-leave', remark: '当单元格 hover 退出时会触发该事件', param: 'row, column, cell, event'},
            {name: 'cell-click', remark: '当某个单元格被点击时会触发该事件', param: 'row, column, cell, event'},
            {name: 'cell-dblclick', remark: '当某个单元格被双击击时会触发该事件', param: 'row, column, cell, event'},
            {name: 'row-click', remark: '当某一行被点击时会触发该事件', param: 'row, event, column'},
            {name: 'row-contextmenu', remark: '当某一行被鼠标右键点击时会触发该事件', param: 'row, event'},
            {name: 'row-dblclick', remark: '当某一行被双击时会触发该事件', param: 'row, event'},
            {name: 'header-click', remark: '当某一列的表头被点击时会触发该事件', param: 'column, event'},
            {name: 'sort-change', remark: '当表格的排序条件发生变化的时候会触发该事件', param: '{ column, prop, order }'},
            {name: 'current-change', remark: '当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性', param: 'currentRow, oldCurrentRow'}
          ],
          data4: [
            {name: 'columnKey', remark: 'column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件', type: 'string', option: '—', default: '—'},
            {name: 'label', remark: '显示的标题', type: 'string', option: '—', default: '—'},
            {name: 'prop', remark: '对应列内容的字段名，也可以使用 property 属性', type: 'string', option: '—', default: '—'},
            {name: 'width', remark: '对应列的宽度', type: 'string', option: '—', default: '—'},
            {name: 'minWidth', remark: '对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列', type: 'string', option: '—', default: '—'},
            {name: 'fixed', remark: '列是否固定在左侧或者右侧，true 表示固定在左侧', type: 'string, boolean', option: '—', default: '—'},
            {name: 'renderHeader', remark: '列标题 Label 区域渲染使用的 Function', type: 'Function(h, { column, $index })', option: '—', default: '—'},
            {name: 'sortable', remark: '对应列是否可以排序，如果设置为 \'custom\'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件', type: 'boolean, string', option: '—', default: '—'},
            {name: 'sortMethod', remark: '对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个布尔值', type: 'Function(a, b)', option: '—', default: '—'},
            {name: 'resizable', remark: '对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）', type: 'Boolean', option: '—', default: '—'},
            {name: 'formatter', remark: '用来格式化内容', type: 'Function(row, column)', option: '—', default: '—'},
            {name: 'showOverflowTooltip', remark: '当内容过长被隐藏时显示 tooltip', type: 'Boolean', option: '—', default: '—'},
            {name: 'align', remark: '对齐方式', type: 'string', option: '—', default: '—'},
            {name: 'headerAlign', remark: '表头对齐方式，若不设置该项，则使用表格的对齐方式', type: 'string', option: '—', default: '—'},
            {name: 'className', remark: '列的 className', type: 'string', option: '—', default: '—'},
            {name: 'labelClassName', remark: '当前列标题的自定义类名', type: 'string', option: '—', default: '—'},
            {name: 'selectable', remark: '仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选', type: 'Function(row, index)', option: '—', default: '—'},
            {name: 'reserveSelection', remark: '仅对 type=selection 的列有效，类型为 Boolean，为 true 则代表会保留之前数据的选项，需要配合 Table 的 clearSelection 方法使用。', type: 'Boolean', option: '—', default: '—'},
            {name: 'filters', remark: '数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。', type: 'Array[{ text, value }]', option: '—', default: '—'},
            {name: 'filterPlacement', remark: '过滤弹出框的定位', type: 'string', option: '—', default: '—'},
            {name: 'filterMultiple', remark: '数据过滤的选项是否多选', type: 'Boolean', option: '—', default: '—'},
            {name: 'filterMethod', remark: '数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。', type: 'Function(value, row)', option: '—', default: '—'},
            {name: 'filteredValue', remark: '选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。', type: 'Array', option: '—', default: '—'}
          ]
        }
      },
      mounted: function () {

      },
      methods: {

      }
    });
  };

  // 消息处理
  exports.onmessage = function (type, message) {

  };

  // page销毁时触发destroy方法
  exports.destroy = function (id, cite) {

  };
});