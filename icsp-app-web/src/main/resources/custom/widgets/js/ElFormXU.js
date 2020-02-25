(function (vue, $, name) {
  //注册el-form-x-u组件
  vue.component(name, {
      template: '<div class="el-form-x">\
  <el-form :model="formModel" :rules="formRules" :style="{height: height,overflow: \'auto\',overflowX: \'hidden\'}"\
    :inline="inline" :label-position="labelPosition" :label-width="labelWidth"\
    :label-suffix="labelSuffix" :showMessage="showMessage">\
      <el-row v-for="(row, index) in rows" :key="index" :gutter="20">\
        <el-col v-for="(i, index) in row.field" v-show="i.hidden !== true" :key="index" :span="i.span || 24/row.columnCount" >\
        <el-row>\
          <el-col :span="i.uFlag ? 23 : 24">\
            <el-form-item :prop="i.field" :label="i.label" :label-width="i.width">\
                    <el-input :ref="i.field"\
                      v-if="!i.type || i.type==\'input\'||i.type==\'password\'||i.type==\'textarea\'" \
                      :type="i.type" v-model="formModel[i.field]" \
                      :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
                      :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
                      :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
                  :step="i.step" :resize="i.resize" :limit-char="i.limitChar"\
                      :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
                      :validateEvent="i.validateEvent"\
                      @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
                      @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
                      @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
                      @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                    </el-input>\
                    <el-input :ref="i.field"\
                  v-else-if="!i.type || i.type==\'num\'" :type="i.type" :data-type="i.dataType"  :formatter="i.formatter" :digit="i.digit"\
                  v-model="formModel[i.field]" \
                  :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
                  :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
                  :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
                  :step="i.step" :resize="i.resize"\
                  :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
                  :validateEvent="i.validateEvent"\
                  @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
                  @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
                  @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
                  @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                </el-input>\
                <el-color-picker :ref="i.field" v-else-if="i.type==\'colorpicker\'" v-model="formModel[i.field]" :show-alpha="i.showAlpha"\
                  :color-format="i.colorFormat" @change="i.change&&i.change(formModel[i.field],formModel,arguments)"\
                  @active-change=i.activeChange&&i.activeChange(formModel[i.field])></el-color-picker>\
                    <el-date-picker :ref="i.field"\
                      v-else-if="i.type==\'date\'||i.type==\'week\'||i.type==\'year\'||i.type==\'month\'\
                        ||i.type==\'datetime\'||i.type==\'datetimerange\'||i.type==\'daterange\'" \
                      :type="i.type" v-model="formModel[i.field]" :readonly="i.readonly" :disabled="i.calcDisabled"\
                      :editable="i.editable" :clearable="i.clearable" :size="i.size" :placeholder="i.placeholder" \
                      :format="i.format" :align="i.align" :popperClass="i.popperClass" :picker-options="i.pickerOptions"\
                      :range-separator="i.rangeSeparator" \
                      @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                    </el-date-picker>\
                    <el-time-select :ref="i.field"\
                      v-else-if="i.type==\'time\'"\
                      v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                      :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                      :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                      @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                    </el-time-select>\
                    <el-time-picker :ref="i.field"\
                      v-else-if="i.type==\'timePicker\'" \
                      v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                      :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                      :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                      @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                    </el-time-picker>\
                    <el-select-x :ref="i.field"\
                      v-else-if="i.type==\'select\'" :request-type="i.requestType" :data-params="i.dataParams"  :clearable="i.clearable"\
                      v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl"\
                      :data-code="i.dataCode" :disabled="i.calcDisabled" :multiple="i.multiple" :placeholder="i.placeholder" :filterable="i.filterable" :filter-method="i.filterMethod"\
                      :datacode-filter="i.datacodeFilter" @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                    </el-select-x>\
                    <el-linkage :ref="i.field" \
                        v-else-if="i.type==\'linkage\'" v-model="formModel[i.field]" :request-type="i.requestType" :pre-ref-name="i.preRefName" :linked-ref-name="i.linkedRefName" :value-field="i.valueField" :text-field="i.textField" \
                      :data-code="i.dataCode" :data-url="i.dataUrl" :options="i.options" :clearable="i.clearable" :disabled="i.calcDisabled"  :placeholder="i.placeholder"\
                      :filterable="i.filterable" :filter-method="i.filterMethod" :datacode-filter="i.datacodeFilter" :data-param-key="i.dataParamKey"\
                      @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                    </el-linkage>\
                    <el-radio-x :ref="i.field"\
                      v-else-if="i.type==\'radio\'" \
                      v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :disabled="i.calcDisabled"\
                      :data-code="i.dataCode"\
                  :option-button="i.optionButton" @change="i.change&&i.change(formModel[i.field],formModel,arguments)"">\
                    </el-radio-x>\
                    <el-checkbox-x :ref="i.field"\
                      v-else-if="i.type==\'checkbox\'"\
                      v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :min=i.min :max=i.max \
                      :data-code="i.dataCode"\
                      :option-button="i.optionButton" :disabled="i.calcDisabled" @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                    </el-checkbox-x>\
                    <el-switch :ref="i.field"\
                      v-else-if="i.type==\'switch\'"\
                      v-model="formModel[i.field]" :on-text="i.onText" :off-text="i.offText"\
                      :disabled="i.calcDisabled" \
                      @change="i.change && i.change(formModel[i.field],formModel,arguments)">\
                    </el-switch>\
                    <component :ref="i.ref||i.field"\
                      v-else-if="i.type==\'custom\'"\
                  v-model="formModel[i.field]" :params="i.params" :placeholder="i.placeholder"\
                      :disabled="i.calcDisabled" :readonly="i.readonly" :size="i.size" :raw-value="i.rawValue" \
                      @click-fn="i.clickFn && i.clickFn(formModel[i.field],formModel,arguments)"\
                      @change="i.change && i.change(formModel[i.field],formModel,arguments)"\
                      :is="i.is" @select-fn="i.selectFn && i.selectFn(formModel[i.field],formModel,arguments)">\
                    </component>\
                    <templates v-else-if="i.type==\'slot\'">\
                      <slot :name="i.slotName" :ref="i.ref||i.field"></slot>\
                    </templates>\
                  </el-form-item>\
                </el-col>\
                <el-col :span="1" v-if="i.uFlag">\
                    <a :title="i.message" @click="uClick(i.field,formModel,arguments)"><label style="font-size: 14px;display: block;padding: 11px 12px 11px 6px;cursor:pointer;color:red">U</label></a>\
                </el-col>\
              </el-row>\
        </el-col>\
      </el-row>\
  </el-form>\
  <el-row :gutter="20" class="el-form-x-footer">\
      <el-button v-for="(i,idx) in buttons" :key="idx" v-show="!i.hidden" :type="i.type" :size="i.size" :plain="i.plain" :round="i.round"\
        :loading="i.loading" :disabled="i.disabled" :icon="i.icon" :autofocus="i.autofocus" :native-type="i.nativeType"\
        @click="(i.click||i.op==\'reset\')&&click(i.click,i.op)" >{{i.label}}</el-button>\
  </el-row>\
  <el-dialog-x title="修改痕迹信息" :visible.sync="dialogVisible_mTrace" height="360px" width="700px">\
    <el-table-x ref="mTraceList" :data-url="urls.mTraceListUrl" :base-params="mTraceParams" :default-load="false" :table-columns="mTraceTableColumns" >\
    </el-table-x>\
    <div slot="footer" align="center">\
      <el-button type="primary" @click="dialogVisible_mTrace=false">关闭</el-button>\
    </div>\
</el-dialog-x>\
 </div>',
      props: {
          // 是否使用小U留痕
          uTrace: {
              type: Boolean,
              default: true
          },
          // 小U留痕数据主键
          uPkValue: String,
          TraceServerName: {
              type: String,
              default: '/ncmis-app-common-service'
          },
          groupFields: {
              type: Array,
              default: function() {
                  return [];
              }
          },
          buttons: {
              type: Array,
              default: function() {
                  return [];
              }
          },
          // 是否采用分组表单
          collapse: {
              type: Boolean,
              default: false
          },
          // 分组表单默认展开项
          expand: {
              type: Array,
              default: function() {
                  return [];
              }
          },
          hasLabel: {
              type: Boolean,
              default: true
          },
          disabled: Boolean,
          height: {
              type: String,
              default: 'auto'
          },

          // ElForm自带属性
          model: Object,
          rules: Object,
          labelPosition: {
              type: String,
              default: 'right'
          },
          labelWidth: String,
          labelSuffix: {
              type: String,
              default: ''
          },
          inline: Boolean,
          showMessage: {
              type: Boolean,
              default: true
          }
      },
      data: function() {
          return {
              groupField: this.groupFields,
              expandCollapseName: this.expand,
              rows: [],
              formModel: {},
              formRules: [],
              // 修改痕迹信息列表框
              dialogVisible_mTrace: false,
              // 修改痕迹信息列表URL
              urls: {
                  mTraceListUrl: this.TraceServerName + '/api/utrace/selectSModifyTraceWithPage'
              },
              mTraceParams: {},
              mTraceTableColumns: [
                  { label: '被修改的域', prop: 'mFieldNm', resizable: true },
                  { label: '修改前', prop: 'mOldDispV', resizable: true},
                  { label: '修改后', prop: 'mNewDispV', resizable: true },
                  { label: '修改人', prop: 'usrId', resizable: true},
                  { label: '修改时间', prop: 'mDatetime', resizable: true }
              ]
          };
      },
      created: function() {
          var pt = this.collapse ? this.preGroupTreat() : this.preTreat();
          pt.formRules = yufp.extend(this.rules || {}, pt.formRules);
          this.rows = pt.rows;
          this.formModel = pt.formModel;
          this.formRules = pt.formRules;
          if (this.collapse) {
              this.$options.template = '<div class="el-form-x" :collapse="collapse">\
         <el-collapse v-model="expandCollapseName" @change="change">\
         <el-collapse-item v-for="(item, index) in rows" :key="index" :title="item.title" :name="item.name">\
         <el-form :model="formModel" :rules="formRules" :style="{height: height,overflow: \'auto\',overflowX: \'hidden\'}"\
           :inline="inline" :label-position="labelPosition" :label-width="labelWidth"\
           :label-suffix="labelSuffix" :showMessage="showMessage">\
             <el-row v-for="(row, index) in item.rows" :key="index" :gutter="20">\
               <el-col v-for="(i, idx) in row.field" v-show="i.hidden !== true" :key="idx" :span="i.span || 24/row.columnCount" >\
       <el-form-item :prop="i.field" :label="i.label" :label-width="i.width">\
                        <el-input :ref="i.field" \
                          v-if="!i.type || i.type==\'input\'||i.type==\'password\'||i.type==\'textarea\'" \
                          :type="i.type" v-model="formModel[i.field]" \
                          :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
                          :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
                          :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
            :step="i.step" :resize="i.resize" :limit-char="i.limitChar"\
                          :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
                          :validateEvent="i.validateEvent"\
                          @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
                          @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
                          @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-input>\
                        <el-input :ref="i.field"\
                   v-else-if="!i.type || i.type==\'num\'" :type="i.type" :data-type="i.dataType"  :formatter="i.formatter" :digit="i.digit"\
                   v-model="formModel[i.field]" \
                   :maxlength="i.maxlength" :minlength="i.minlength" :placeholder="i.placeholder"\
                   :disabled="i.calcDisabled" :size="i.size" :icon="i.icon" :rows="i.rows" :autosize="i.autosize" \
                   :autoComplete="i.autoComplete" :name="i.name" :readonly="i.readonly" :max="i.max" :min="i.min" \
                   :step="i.step" :resize="i.resize"\
                   :autofocus="i.autofocus" :form="i.form" :on-icon-click="i.onIconClick"\
                   :validateEvent="i.validateEvent"\
                   @click="i.click&&i.click(formModel[i.field],formModel,arguments)"\
                   @blur="i.blur&&i.blur(formModel[i.field],formModel,arguments)"\
                   @focus="i.focus&&i.focus(formModel[i.field],formModel,arguments)"\
                   @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                 </el-input>\
           <el-color-picker :ref="i.field" v-else-if="i.type==\'colorpicker\'" v-model="formModel[i.field]" :show-alpha="i.showAlpha"\
              :color-format="i.colorFormat" @change="i.change&&i.change(formModel[i.field],formModel,arguments)"\
              @active-change=i.activeChange&&i.activeChange(formModel[i.field])></el-color-picker>\
                        <el-date-picker :ref="i.field" \
                          v-else-if="i.type==\'date\'||i.type==\'week\'||i.type==\'year\'||i.type==\'month\'\
                            ||i.type==\'datetime\'||i.type==\'datetimerange\'||i.type==\'daterange\'" \
                          :type="i.type" v-model="formModel[i.field]" :readonly="i.readonly" :disabled="i.calcDisabled"\
                          :editable="i.editable" :clearable="i.clearable" :size="i.size" :placeholder="i.placeholder" \
                          :format="i.format" :align="i.align" :popperClass="i.popperClass" :picker-options="i.pickerOptions"\
                          :range-separator="i.rangeSeparator" \
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-date-picker>\
                        <el-time-select :ref="i.field" \
                          v-else-if="i.type==\'time\'"\
                          v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                          :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                          :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-time-select>\
                        <el-time-picker :ref="i.field" \
                          v-else-if="i.type==\'timePicker\'" \
                          v-model="formModel[i.field]" :isRange="i.isRange" :placeholder="i.placeholder" :size="i.size" :format="i.format"\
                          :readonly="i.readonly" :disabled="i.calcDisabled" :clearable="i.clearable" :popperClass="i.popperClass"\
                          :editable="i.editable" :align="i.align" :range-separator="i.rangeSeparator" :picker-options="i.pickerOptions"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-time-picker>\
                        <el-select-x :ref="i.field" \
            v-else-if="i.type==\'select\'" :filterable="i.filterable" :filter-method="i.filterMethod"\
                          v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl"\
            :data-code="i.dataCode" :disabled="i.calcDisabled" :multiple="i.multiple" :datacode-filter="i.datacodeFilter"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-select-x>\
                        <el-linkage :ref="i.field" \
                          v-else-if="i.type==\'linkage\'" v-model="formModel[i.field]" :request-type="i.requestType" :pre-ref-name="i.preRefName" :linked-ref-name="i.linkedRefName" :value-field="i.valueField" :text-field="i.textField" \
                          :data-code="i.dataCode" :data-url="i.dataUrl" :options="i.options" :clearable="i.clearable" :disabled="i.calcDisabled"  :placeholder="i.placeholder"\
                          :filterable="i.filterable" :filter-method="i.filterMethod" :datacode-filter="i.datacodeFilter" :data-param-key="i.dataParamKey"\
                          @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-linkage>\
                        <el-radio-x :ref="i.field" \
                          v-else-if="i.type==\'radio\'" \
                          v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :disabled="i.calcDisabled"\
                          :data-code="i.dataCode"\
            @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-radio-x>\
                        <el-checkbox-x :ref="i.field" \
                          v-else-if="i.type==\'checkbox\'"\
                          v-model="formModel[i.field]" :options="i.options" :props="i.props" :data-url="i.dataUrl" :min=i.min :max=i.max \
                          :data-code="i.dataCode"\
            :disabled="i.calcDisabled" @change="i.change&&i.change(formModel[i.field],formModel,arguments)">\
                        </el-checkbox-x>\
                        <component :ref="i.ref||i.field" v-else-if="i.type==\'custom\'"\
                         v-model="formModel[i.field]" :params="i.params"\
                         :disabled="i.calcDisabled" :readonly="i.readonly" :size="i.size" :raw-value="i.rawValue" \
                         @click-fn="i.clickFn && i.clickFn(formModel[i.field],formModel,arguments)"\
                         @change="i.change && i.change(formModel[i.field],formModel,arguments)"\
                         :is="i.is" @select-fn="i.selectFn && i.selectFn(formModel[i.field],formModel,arguments)">\
                        </component>\
                        <templates v-else-if="i.type==\'slot\'">\
                        <slot :name="i.slotName" :ref="i.ref||i.field"></slot>\
                       </templates>\
                     </el-form-item>\
               </el-col>\
             </el-row>\
         </el-form>\
         </el-collapse-item> \
         </el-collapse>\
         <el-row :gutter="20" class="el-form-x-footer">\
             <el-button v-for="(i,idx) in buttons" :key="idx" v-show="!i.hidden" :type="i.type" :size="i.size" :plain="i.plain" :round="i.round"\
               :loading="i.loading" :disabled="i.disabled" :icon="i.icon" :autofocus="i.autofocus" :native-type="i.nativeType"\
               @click="(i.click||i.op==\'reset\')&&click(i.click,i.op)" >{{i.label}}</el-button>\
         </el-row>\
        </div>';
          }
      },
      methods: {
          // 点击小U
          uClick: function(val) {
              var me = this;
              var pkv = me.uPkValue;
              var field = val;
              var mPkV = [];
              mPkV.push(pkv);
              var params = {
                  condition: JSON.stringify({
                      mPkV: mPkV,
                      mFieldId: field
                  })
              };
              me.dialogVisible_mTrace = true;
              me.$nextTick(function() {
                  me.$refs.mTraceList.remoteData(params);
              });
          },
          rebuildFn: function() {
              var pt = this.collapse ? this.preGroupTreat() : this.preTreat();
              pt.formRules = yufp.extend(this.rules || {}, pt.formRules);
              this.formRules = pt.formRules;
              this.rows = pt.rows;
          },
          resetFn: function() {
              var pt = this.collapse ? this.preGroupTreat() : this.preTreat();
              pt.formRules = yufp.extend(this.rules || {}, pt.formRules);
              this.formRules = pt.formRules;
              this.formModel = pt.formModel;
              this.rows = pt.rows;
          },
          change: function(group) {
              this.$emit('change', group);
          },
          preTreat: function() {
              var _this = this;
              var formModel = {};
              var formRules = {};
              var rows = [];
              var cols = [];
              for (var i = 0, iLen = _this.groupField.length; i < iLen; i++) {
                  var gf = _this.groupField[i];
                  var columnCount = gf.columnCount ? gf.columnCount : 1;
                  var fields = gf.fields;
                  for (var j = 0, jLen = fields.length; j < jLen; j++) {
                      var f = fields[j];
                      f.calcDisabled = f.disabled ? f.disabled : _this.disabled;
                      if (!_this.hasLabel) {
                          f.placeholder = f.placeholder ? f.placeholder : f.label;
                          delete f.label;
                          delete f.labelWidth;
                      } else {
                          f.width = f.width ? f.width : _this.labelWidth;
                      }
                      if (f.type === 'checkbox') {
                          formModel[f.field] = f.value || [];
                      } else if (f.type === 'select' && f.multiple) {
                          formModel[f.field] = f.value || [];
                      } else {
                          formModel[f.field] = f.value || '';
                      }
                      if (f.rules) {
                          formRules[f.field] = f.rules;
                      }
                      if (f.hidden !== true) {
                          cols.push(f);
                          if (cols.length === columnCount) {
                              rows.push({
                                  field: cols,
                                  columnCount: columnCount
                              });
                              cols = [];
                          }
                      }
                  }
                  if (cols.length > 0) {
                      rows.push({
                          field: cols,
                          columnCount: columnCount
                      });
                      cols = [];
                  }
              }
              if (_this.uTrace) {
                  if (!_this.uPkValue) {
                      throw new Error('小U留痕 uPkValue参数未配置');
                  }
                  var ufield = [];
                  var mPkV = [];
                  var option = _this.uPkValue;
                  mPkV.push(option);
                  // 查询修改痕迹历史
                  var params = {
                      condition: JSON.stringify({
                          mPkV: mPkV
                      })
                  };
                  yufp.service.request({
                      url: _this.TraceServerName + '/api/utrace/selectSModifyTrace',
                      data: params,
                      async: false,
                      method: 'GET',
                      callback: function(code, message, response) {
                          if (response.data != null) {
                              for (var t = 0;t < rows.length;t++) {
                                  var updateFields = rows[t].field;
                                  for (var i = 0; i < updateFields.length; i++) {
                                      var field = updateFields[i].field;
                                      for (var j = 0; j < response.data.length; j++) {
                                          var mFieldId = response.data[j].mFieldId;
                                          if (field === mFieldId) {
                                              if (ufield.indexOf(mFieldId) < 0) {
                                                  updateFields[i].uFlag = true;
                                                  ufield.push(mFieldId);
                                                  var msg = response.data[j].mDatetime + ': 被用户' + response.data[j].usrId + '从[' +
                                                      response.data[j].mOldDispV + ']修改为[' + response.data[j].mNewDispV + ']';
                                                  updateFields[i].message = msg;
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  });
                  return {
                      rows: rows,
                      formModel: formModel,
                      formRules: formRules
                  };
              } else {
                  return {
                      rows: rows,
                      formModel: formModel,
                      formRules: formRules
                  };
              }
          },
          preGroupTreat: function() {
              var formModel = {};
              var formRules = {};
              var rows = [];
              var cols = [];
              var formArray = [];
              var formdata = {};
              for (var i = 0, iLen = this.groupField.length; i < iLen; i++) {
                  var gf = this.groupField[i];
                  var title = gf.title;
                  var name = gf.name;
                  var columnCount = gf.columnCount ? gf.columnCount : 1;
                  var fields = gf.fields;
                  for (var j = 0, jLen = fields.length; j < jLen; j++) {
                      var f = fields[j];
                      f.calcDisabled = f.disabled ? f.disabled : this.disabled;
                      if (!this.hasLabel) {
                          f.placeholder = f.placeholder ? f.placeholder : f.label;
                          delete f.label;
                          delete f.labelWidth;
                      } else {
                          f.width = f.width ? f.width : this.labelWidth;
                      }
                      if (f.type === 'checkbox') {
                          formModel[f.field] = f.value || [];
                      } else if (f.type === 'select' && f.multiple) {
                          formModel[f.field] = f.value || [];
                      } else {
                          formModel[f.field] = f.value || '';
                      }
                      if (f.rules) {
                          formRules[f.field] = f.rules;
                      }
                      if (f.hidden !== true) {
                          cols.push(f);
                          if (cols.length === columnCount) {
                              rows.push({
                                  field: cols,
                                  columnCount: columnCount
                              });
                              cols = [];
                          }
                      }
                  }
                  if (cols.length > 0) {
                      rows.push({
                          field: cols,
                          columnCount: columnCount
                      });
                      cols = [];
                      rows = [];
                  }
                  formdata.title = title;
                  formdata.name = name;
                  formdata.rows = rows;
                  formArray.push(formdata);
                  rows = [];
                  formdata = {};
              }
              return {
                  rows: formArray,
                  formModel: formModel,
                  formRules: formRules
              };
          },
          // 保存修改记录
          saveUTrace: function(oldFormModel) {
              var me = this;
              var updateFields = this.rows;
              var newForm = this.formModel;
              var temp = [];
              for (var i = 0;i < updateFields.length;i++) {
                  var fields = updateFields[i].field;
                  for (var k = 0;k < fields.length;k++) {
                      var field = fields[k].field;
                      var label = fields[k].label;
                      if (oldFormModel[field] !== newForm[field]) {
                          var option = {};
                          option['usrId'] = yufp.session.userCode;
                          option['mMenuId'] = yufp.frame.currentMenuId;
                          option['mPkV'] = this.uPkValue;
                          option['orgId'] = yufp.session.org.code;
                          option['mFieldId'] = field;
                          option['mFieldNm'] = label;
                          if (fields[k].dataCode) {
                              if(newForm[field] instanceof Array){//新表单数据为数组
                                  option['mNewV'] = newForm[field].join(',');
                                  var option1 = [];
                                  var option2 = [];
                                  var option3 = [];
                                  for(var m = 0; m < newForm[field].length; m++){
                                      var value = yufp.lookup.convertKey(fields[k].dataCode, newForm[field][m]);
                                      option1.push(value);
                                  }
                                  option['mNewDispV'] = option1.join(',');
                                  if(oldFormModel[field] instanceof Array){//旧表单数据为数组
                                      option['mOldV'] = oldFormModel[field].join(',');
                                      for(var n = 0; n < oldFormModel[field].length; n++){
                                          var value = yufp.lookup.convertKey(fields[k].dataCode, oldFormModel[field][n]);
                                          option2.push(value);
                                      }
                                      option['mOldDispV'] = option2.join(',');
                                  }else{
                                      option['mOldV'] = oldFormModel[field];
                                      var arrayFields = oldFormModel[field].split(',');
                                      for(var h = 0; h < arrayFields.length; h++){
                                          var value = yufp.lookup.convertKey(fields[k].dataCode, arrayFields[h]);
                                          option3.push(value);
                                      }
                                      option['mOldDispV'] = option3.join(',');
                                  }
                              }else{
                                  option['mNewV'] = newForm[field];
                                  option['mOldV'] = oldFormModel[field];
                                  option['mNewDispV'] = yufp.lookup.convertKey(fields[k].dataCode, newForm[field]);
                                  option['mOldDispV'] = yufp.lookup.convertKey(fields[k].dataCode, oldFormModel[field]);
                              }
                          } else {
                              option['mNewDispV'] = newForm[field];
                              option['mOldDispV'] = oldFormModel[field];
                              option['mNewV'] = newForm[field];
                              option['mOldV'] = oldFormModel[field];
                          }
                          temp.push(option);
                      }
                  }
              }
              yufp.service.request({
                  url: me.TraceServerName + '/api/utrace/addSModifyTrace',
                  data: JSON.stringify(temp),
                  method: 'POST',
                  callback: function(code, message, response) {
                      me.$emit('aftersaveu');
                  }
              });
          },
          validate: function(callback) {
              return this.collapse ? this.$children[0].$children[0].$children[0].validate(callback) : this.$children[0].validate(callback);
          },
          resetFields: function() {
              this.collapse ? this.$children[0].$children[0].$children[0].resetFields() : this.$children[0].resetFields();
          },
          switch: function(field, params, value) {
              var dataArr = this.groupField;
              this.groupField = [];
              dataArr.filter(function(cur, index, arr) {
                  var fields = cur.fields;
                  fields.filter(function(cur, index, arr) {
                      if (cur.field === field) {
                          cur[params] = value;
                      }
                  });
              });
              this.groupField = dataArr;
          },
          click: function(fn, op) {
              var me = this;
              if (op === 'reset') {
                  me.$children[0].resetFields();
                  fn && fn(me.formModel);
              } else if (op === 'submit') {
                  me.$children[0].validate(function(valid) {
                      fn(me.formModel, valid);
                  });
              } else {
                  fn(this.formModel);
              }
          },
          subRefs: function(field) {
              var ref = this.$refs[field];
              if (ref && ref.length > 0) {
                  ref = ref[0];
              }
              return ref;
          },
          renderHiddenFields: function(fields, isHiddden) {
              if (fields && typeof fields === 'string') {
                  var hasFind = false;
                  for (var i = 0, iLen = this.groupField.length; i < iLen; i++) {
                      var gf = this.groupField[i];
                      var gpfields = gf.fields;
                      for (var j = 0, jLen = gpfields.length; j < jLen; j++) {
                          if (fields === gpfields[j].field) {
                              gpfields[j].hidden = isHiddden;
                              hasFind = true;
                              break;
                          }
                      }
                      if (hasFind) {
                          break;
                      }
                  }
              } else if (fields && Object.prototype.toString.call(fields).toLowerCase() === '[object array]') {
                  for (var i = 0, iLen = this.groupField.length; i < iLen; i++) {
                      var gf = this.groupField[i];
                      var gpfields = gf.fields;
                      for (var j = 0, jLen = gpfields.length; j < jLen; j++) {
                          for (var n = 0, length = fields.length; n < length; n++) {
                              if (fields[n] === gpfields[j].field) {
                                  gpfields[j].hidden = isHiddden;
                                  break;
                              }
                          }
                      }
                  }
              }
              this.rebuildFn();
          },
          renderDisabledFields: function(fields, isDisabled) {
              if (fields && typeof fields === 'string') {
                  var hasFind = false;
                  for (var i = 0, iLen = this.groupField.length; i < iLen; i++) {
                      var gf = this.groupField[i];
                      var gpfields = gf.fields;
                      for (var j = 0, jLen = gpfields.length; j < jLen; j++) {
                          if (fields === gpfields[j].field) {
                              gpfields[j].disabled = isDisabled;
                              hasFind = true;
                              break;
                          }
                      }
                      if (hasFind) {
                          break;
                      }
                  }
              } else if (fields && Object.prototype.toString.call(fields).toLowerCase() === '[object array]') {
                  for (var i = 0, iLen = this.groupField.length; i < iLen; i++) {
                      var gf = this.groupField[i];
                      var gpfields = gf.fields;
                      for (var j = 0, jLen = gpfields.length; j < jLen; j++) {
                          for (var n = 0, length = fields.length; n < length; n++) {
                              if (fields[n] === gpfields[j].field) {
                                  gpfields[j].disabled = isDisabled;
                                  break;
                              }
                          }
                      }
                  }
              }
              this.rebuildFn();
          },
          renderRequiredFields: function(fields, isRequired) {
              if (fields && typeof fields === 'string') {
                  if (this.formRules.hasOwnProperty(fields)) {
                      var fieldRules = this.formRules[fields];
                      for (var i = 0, iLen = fieldRules.length; i < iLen; i++) {
                          if (fieldRules[i].hasOwnProperty('required')) {
                              fieldRules[i].required = isRequired;
                          }
                      }
                  }
              } else if (fields && Object.prototype.toString.call(fields).toLowerCase() === '[object array]') {
                  for (var n = 0, length = fields.length; n < length; n++) {
                      var field = fields[n];
                      if (this.formRules.hasOwnProperty(field)) {
                          var fieldRules = this.formRules[field];
                          for (var i = 0, iLen = fieldRules.length; i < iLen; i++) {
                              if (fieldRules[i].hasOwnProperty('required')) {
                                  fieldRules[i].required = isRequired;
                              }
                          }
                      }
                  }
              }
          }
      },
      watch: {
          groupField: function(val) {
              this.rebuildFn();
          },
          disabled: function(val) {
              this.rebuildFn();
          }
      }
    })
})(Vue, yufp.$, "el-form-x-u");
