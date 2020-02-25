/**
 * @created by helin3 2018-01-23
 * @updated by
 * @description 拆线、柱状、饼图
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   *  @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          lineId: 'line_' + new Date().getTime(),
          barId: 'bar_' + new Date().getTime(),
          pieId: 'pie_' + new Date().getTime()
        };
      },
      methods: {
        loadLine: function () {
          var _this = this;
          var chart = echarts.init(document.getElementById(_this.lineId));
          var option = {
            title: {
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['2015年', '2016年'],
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
              boundaryGap: false,
              data: ['3月', '4月', '5月', '6月', ' 7月', '8月'],
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
                name: '2016年',
                type: 'line',
                barWidth: '10',
                data: [2688, 3771, 4129, 5233, 4341, 4122],
                itemStyle: {
                  normal: {
                    color: '#0065d2'
                  }
                }
              },
              {
                name: '2015年',
                type: 'line',
                barWidth: '10',
                data: [4188, 2671, 2800, 3200, 3800, 2695],
                itemStyle: {
                  normal: {
                    color: '#fab130'
                  }
                }
              }
            ]
          };
          chart.setOption(option);
        },
        loadBar: function () {
          var _this = this;
          var chart = echarts.init(document.getElementById(_this.barId));
          var option = {
            title: {
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['2015年', '2016年'],
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
              boundaryGap: false,
              data: ['3月', '4月', '5月', '6月', ' 7月', '8月'],
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
                name: '2016年',
                type: 'bar',
                barWidth: '10',
                data: [2688, 3771, 4129, 5233, 4341, 4122],
                itemStyle: {
                  normal: {
                    color: '#0065d2'
                  }
                }
              },
              {
                name: '2015年',
                type: 'bar',
                barWidth: '10',
                data: [4188, 2671, 2800, 3200, 3800, 2695],
                itemStyle: {
                  normal: {
                    color: '#fab130'
                  }
                }
              }
            ]
          };
          chart.setOption(option);
        },
        loadPie: function () {
          var _this = this;
          var chart = echarts.init(document.getElementById(_this.pieId));
          var option = {
            title: {
              text: '某站点用户访问来源',
              subtext: '纯属虚构',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 335, name: '直接访问'},
                  {value: 310, name: '邮件营销'},
                  {value: 234, name: '联盟广告'},
                  {value: 135, name: '视频广告'},
                  {value: 1548, name: '搜索引擎'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          chart.setOption(option);
        }
      },
      mounted: function () {
        this.loadLine();
        this.loadBar();
        this.loadPie();
      }
    });
  };
});