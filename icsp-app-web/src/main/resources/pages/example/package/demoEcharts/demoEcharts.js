/**
@created by  taoting1 2018-08-23
@description yu-echarts组件使用示例
 */
define(['echarts'], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var optionPie = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['同业存款', '个人存款', '对公存款']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 20, name: '同业存款' },
                { value: 20, name: '个人存款' },
                { value: 60, name: '对公存款' }
              ]
            }
          ],
          color: ['#f7ba2a', '#20a0ff', '#ff4949']
        };
        var optionBar = {
          title: {
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['正常', '关注', '不良'],
            padding: [15, 0, 0, 10],
            textStyle: {
              color: '#666'
            }
          },
          grid: {
            top: '40',
            left: '0',
            right: '30',
            bottom: '15',
            containLabel: true
          },
          textStyle: {
            color: '#888'
          },
          xAxis: {
            type: 'category',
            data: ['线下小计', '线上小计'],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          yAxis: {
            show: false,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          series: [
            {
              name: '正常',
              type: 'bar',
              data: [3400, 2275],
              itemStyle: {
                normal: {
                  color: '#20a0ff'
                }
              },
              stack: 'one'
            },
            {
              name: '关注',
              type: 'bar',
              data: [840, 315],
              itemStyle: {
                normal: {
                  color: '#ff4949'
                }
              },
              stack: 'one'
            },
            {
              name: '不良',
              type: 'bar',
              barWidth: '80',
              data: [560, 210],
              itemStyle: {
                normal: {
                  color: '#13ce66'
                }
              },
              stack: 'one'
            }

          ]
        };
        // 下钻后数据
        var optionDown = {
          title: {
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['正常', '关注', '不良'],
            padding: [15, 0, 0, 10],
            textStyle: {
              color: '#666'
            }
          },
          grid: {
            top: '40',
            left: '0',
            right: '30',
            bottom: '15',
            containLabel: true
          },
          textStyle: {
            color: '#888'
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: ['北京', '上海', '深圳', '成都'],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          yAxis: {
            show: false,
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          series: [
            {
              name: '正常',
              type: 'bar',
              data: [400, 275, 700, 500],
              itemStyle: {
                normal: {
                  color: '#20a0ff'
                }
              },
              stack: 'one'
            },
            {
              name: '关注',
              type: 'bar',
              data: [40, 115, 120, 180],
              itemStyle: {
                normal: {
                  color: '#ff4949'
                }
              },
              stack: 'one'
            },
            {
              name: '不良',
              type: 'bar',
              barWidth: '50',
              data: [60, 210, 80, 120],
              itemStyle: {
                normal: {
                  color: '#13ce66'
                }
              },
              stack: 'one'
            }

          ]
        };
        var optionLine = {
          title: {
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false
          },
          grid: {
            top: '10',
            left: '-20',
            right: '20',
            bottom: '10',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['3月', '4月', '5月', '6月', '7月', '8月'],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          textStyle: {
            color: '#888'
          },
          yAxis: {
            show: false,
            type: 'value',
            min: 'dataMin'
          },
          series: [
            {
              name: '余额',
              type: 'line',
              barWidth: '10',
              smooth: true,
              data: [128.08, 83.71, 129, 190.01, 113.01, 169.15],
              itemStyle: {
                normal: {
                  color: '#c3191d'
                }
              }
            }
          ]
        };
        var optionGauge = {
          title: {
            text: '资金充足率',
            left: 'center',
            top: 'bottom',
            padding: [0, 0, 20, 0],
            textStyle: {
              color: '#666',
              fontWeight: 'normal',
              fontSize: 14
            }
          },
          tooltip: {
            formatter: '{a}<br/>资金充足率: {c}%'
          },
          grid: {
            top: '10',
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
          },
          series: [
            {
              name: '2016年9月',
              type: 'gauge',
              radius: '85%',
              detail: {
                formatter: '{value}%',
                offsetCenter: [0, '55%'],
                textStyle: {
                  fontSize: 22
                }
              },
              data: [{ value: 48 }],
              axisLine: {
                lineStyle: {
                  width: 12,
                  color: [[0.2, '#17d5af'], [0.8, '#2293de'], [1, '#c3191d']]
                }
              },
              pointer: {
                length: '80%',
                width: 6
              }
            }
          ]
        };
        return {
          option1: optionPie,
          option2: optionBar,
          option3: optionLine,
          option4: optionGauge,
          option5: optionDown
        };
      },
      mounted: function () {
        var _this = this;
        _this.$refs.echarts.echartsInstance.on('click', function (params) {
          if (params.name === '线下小计') {
            _this.option2 = _this.option5;
          }
        });
      },
      methods: {
        /**
         * 修改"存款结构分析"表的数据
         */
        changeFn: function () {
          var data = [
            { value: 40, name: '同业存款' },
            { value: 15, name: '个人存款' },
            { value: 40, name: '对公存款' }
          ];
          this.option1.series[0].data = data;
        }
      }
    });
  };
});
