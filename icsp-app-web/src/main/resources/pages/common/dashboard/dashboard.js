define(['jsplumb', 'echarts', 'jquery', './custom/plugins/china.js'], function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    var reg = /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g;
    var vm = yufp.custom.vue({
      el: cite.el,
      data: function () {
        var me = this;
        return {
          date: [],
          timeList: [
            { key: 15, value: '最近15分钟' },
            { key: 60, value: '最近1小时' },
            { key: 4, value: '最近4小时' },
            { key: 24, value: '最近24小时' },
            { key: 7, value: '最近7天' }
          ],
          rotate: 0,
          loadChart: null,
          loadData: [],
          resTimeChart: null,
          resTimeData: [],
          errorsChart: null,
          errorsData: [],
          nodeInfoData: [],
          serviceInfo: [],
          scoreData: [],
          rankData: [],
          nodeDataList: [],
          nodeJsonData: [],
          connJsonData: [],
          apmData: [],
          totalUp: 0,
          totalDown: 0,
          totalWarn: 0,
          apmErrors: 0,
          transactions: 0,
          loadNum: 0,
          loadNumAvg: 0,
          resTime: 0,
          resTimeAvg: 0,
          errorsNum: 0,
          errorNumAvg: 0,
          intervalTime: 10,
          intervalType: 'm',
          timeUnit: 'min'
        };
      },
      methods: {
        // 鼠标移入，显示时间选择框
        mouseoverFn: function () {
          $('#yu-sysList').fadeIn('fast');
        },
        // 点击事件，不显示时间选择框
        seenFn: function () {
          $('#yu-sysList').fadeOut('fast');
        },
        // 时间选择
        timePickFn: function (a) {
          if (a != '' && a != undefined) {
            var me = this;
            me.intervalTime = a;
            me.date = [];
            var now = new Date();
            if (me.intervalTime == 4 || me.intervalTime == 24) {
              me.intervalType = 'h';
              me.timeUnit = 'hour';
              if (me.intervalTime == 4) {
                me.rotate = 30;
              } else {
                me.rotate = 0;
              }
              for (var n = 0; n < me.intervalTime; n++) {
                var lastDate = new Date(now - n * 3600000);
                var hours = lastDate.getHours();
                if (hours.toString().length == 1) {
                  hours = 0 + '' + hours;
                }
                var minutes = lastDate.getMinutes();
                if (minutes.toString().length == 1) {
                  minutes = 0 + '' + minutes;
                }
                me.date.unshift(hours + ':' + minutes);
              }
            } else if (me.intervalTime == 7) {
              me.rotate = 30;
              me.intervalType = 'd';
              me.timeUnit = 'day';
            } else {
              me.rotate = 0;
              me.intervalType = 'm';
              me.timeUnit = 'min';
              me.dateFn(me.intervalTime);
            }
            me.nodeDataFn();
          }
        },
        // 集群概况节点数据
        nodeDataFn: function () {
          var me = this;
          me.totalDown = 2;
          me.totalWarn = 2;
          me.totalUp = 40;
          me.apmErrors = 30;
          me.transactions = 2983;
          for (var i = 1; i < 6; i++) {
            me.rankData.push(
              {
                rank: i,
                service: 'abc/abc/abc' + i,
                count: this.randomData()
              }
            );
          }
          var flag_instance = false, flag_info = false, flag_APM1 = false, flag_APM2 = false;
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.systemService + '/dashboard/instance/',
          //   callback: function (code, message, response) {
          //     me.serviceInfo = [];
          //     flag_instance = true;
          //     if (code == '0' && response.code == 0) {
          //       var serviceInfoData = response.data;
          //       for (var s in serviceInfoData) {
          //         var instanceInfo = serviceInfoData[s].instances;
          //         var upCount = 0;
          //         var downCount = 0;
          //         var warnCount = 0;
          //         for (var f = 0; f < instanceInfo.length; f++) {
          //           if (instanceInfo[f].status == 'UP') {
          //             upCount++;
          //             me.totalUp++;
          //           } else if (instanceInfo[f].status == 'DOWN') {
          //             downCount++;
          //             me.totalDown++;
          //           } else {
          //             warnCount++;
          //             me.totalWarn++;
          //           }
          //         }
          //         me.serviceInfo.push(
          //           {
          //             service: serviceInfoData[s].name,
          //             insNum: instanceInfo.length,
          //             UP: upCount,
          //             DOWN: downCount,
          //             WARN: warnCount
          //           }
          //         );
          //       }
          //     }
          //   }
          // });
          // // 通过接口/api/service/basic/servicerels加载服务的依赖关系及拓扑结构
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.systemService + '/api/service/basic/info',
          //   callback: function (code, message, response) {
          //     flag_info = true;
          //     me.nodeInfoData = [];
          //     me.nodeJsonData = [];
          //     me.connJsonData = [];
          //     if (code == 0 && response.code == 0) {
          //       var nodeInfo = response.data;
          //       for (var t = 0; t < nodeInfo.length; t++) {
          //         me.nodeInfoData.push({
          //           'id': nodeInfo[t].id,
          //           'name': nodeInfo[t].name,
          //           'type': 'service',
          //           'dependService': nodeInfo[t].dependService,
          //           'offsetX': nodeInfo[t].offsetX,
          //           'offsetY': nodeInfo[t].offsetY
          //         });
          //         me.nodeJsonData.push(
          //           {
          //             nodeId: nodeInfo[t].id,
          //             nodeName: nodeInfo[t].name,
          //             offsetX: nodeInfo[t].offsetX,
          //             offsetY: nodeInfo[t].offsetY,
          //             type: 'service'
          //           }
          //         );
          //       }
          //       for (var i = 0; i < me.nodeInfoData.length; i++) {
          //         for (var m in me.nodeInfoData[i].dependService) {
          //           for (var n in me.nodeJsonData) {
          //             if (me.nodeInfoData[i].dependService[m] == me.nodeJsonData[n].nodeName) {
          //               me.connJsonData.push(
          //                 {
          //                   sourceId: me.nodeInfoData[i].id,
          //                   targetId: me.nodeJsonData[n].nodeId,
          //                   label: me.nodeInfoData[i].name
          //                 }
          //               );
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // });
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.systemService + 'api/elasticsearchMetrics/APMMetricsWithMinute?intervalType=' + me.intervalType + '&intervalMinutes=' + me.intervalTime,
          //   callback: function (code, message, response) {
          //     flag_APM1 = true;
          //     me.loadData = [];
          //     me.resTimeData = [];
          //     me.errorsData = [];
          //     me.loadNum = 0;
          //     me.resTime = 0;
          //     me.errorsNum = 0;
          //     var responseData = response.aggregations['date_histogram#apm-minute'].buckets;
          //     for (var r in responseData) {
          //       if (me.intervalType == 'd') {
          //         var _reg = /(\d{4})\-(\d{2})\-(\d{2})/;
          //         var day = responseData[r].key_as_string.replace(_reg, '$1/$2/$3');
          //         day = day.substr(5);
          //         me.date.push(day);
          //       }
          //       me.loadData.push(responseData[r]['value_count#transactions'].value);
          //       me.resTimeData.push(Math.ceil(responseData[r]['avg#rt'].value / 1000));
          //       me.errorsData.push(responseData[r]['value_count#errors'].value);
          //       me.loadNum = me.loadNum + responseData[r].doc_count;
          //       me.resTime = me.resTime + Math.ceil(responseData[r]['avg#rt'].value / 1000);
          //       me.errorsNum = me.errorsNum + responseData[r]['value_count#errors'].value;
          //     }
          //     me.loadNumAvg = (me.loadNum / me.intervalTime).toFixed(1).toString().replace(reg, '$&,');
          //     me.resTimeAvg = (me.resTime / me.intervalTime).toFixed(1).toString().replace(reg, '$&,');
          //     me.errorNumAvg = (me.errorsNum / me.intervalTime).toFixed(1).toString().replace(reg, '$&,');
          //     me.loadNum = me.loadNum.toString().replace(reg, '$&,');
          //     me.resTime = me.resTime.toString().replace(reg, '$&,');
          //     me.errorsNum = me.errorsNum.toString().replace(reg, '$&,');
          //     me.loadChartFn();
          //     me.resTimeChartFn();
          //     me.errorChartFn();
          //   }
          // });
          // yufp.service.request({
          //   method: 'GET',
          //   url: backend.systemService + '/api/elasticsearchMetrics/APMMetrics?intervalType=' + me.intervalType + '&intervalMinutes=' + me.intervalTime,
          //   callback: function (code, message, response) {
          //     flag_APM2 = true;
          //     me.apmData = [];
          //     me.rankData = [];
          //     if (code == '0') {
          //       // 调整es之后返回字段变化.
          //       var apmResponse = response.aggregations['sterms#apm-service'].buckets;
          //       me.apmErrors = response.aggregations['value_count#apm-cluster-errors'].value;
          //       me.transactions = response.aggregations['value_count#apm-cluster-transactions'].value;
          //       var num = 0;
          //       for (var m in apmResponse) {
          //         me.apmData.push(
          //           {
          //             service: apmResponse[m].key,
          //             count: apmResponse[m].doc_count.toString().replace(reg, '$&,'),
          //             errorsNum: apmResponse[m]['value_count#errors'].value.toString().replace(reg, '$&,'),
          //             resTime: Math.ceil(apmResponse[m]['extended_stats#rt_stats'].avg / 1000).toString().replace(reg, '$&,')
          //           }
          //         );
          //         num++;
          //         if (num <= 5) {
          //           me.rankData.push(
          //             {
          //               rank: num,
          //               service: apmResponse[m].key,
          //               count: apmResponse[m].doc_count.toString().replace(reg, '$&,')
          //             }
          //           );
          //         }
          //       }
          //     }
          //   }
          // });
          // 设置循环定时器检查所有请求是否都执行完成
          var timer = setInterval(function () {
            me.dataCountFn();
            clearInterval(timer);
          }, 100);
        },
        // 数据统计
        dataCountFn: function () {
          this.scoreData = [];
          this.nodeDataList = [];
          var instanceNum = this.totalDown + this.totalWarn + this.totalUp;
          var transNum = this.apmErrors + this.transactions;
          var errPer = ((this.apmErrors / transNum) * 100).toFixed(2) + '%';
          var transPer = ((this.transactions / transNum) * 100).toFixed(2) + '%';
          this.transactions = this.transactions.toString().replace(reg, '$&,');
          this.apmErrors = this.apmErrors.toString().replace(reg, '$&,');
          var scoreDataList = [
            { status: '正常', percentage: transPer, num: this.transactions },
            { status: '错误', percentage: errPer, num: this.apmErrors }
          ];
          this.scoreData = scoreDataList;

          this.nodeDataList.push(
            {
              title: '实例状态',
              criticalPer: (this.totalDown / instanceNum) * 100 + '%',
              warningPer: (this.totalWarn / instanceNum) * 100 + '%',
              normalPer: (this.totalUp / instanceNum) * 100 + '%',
              criticalNum: this.totalDown,
              warningNum: this.totalWarn,
              normalNum: this.totalUp
            },
            {
              title: '请求状态',
              criticalPer: errPer,
              warningPer: '0',
              normalPer: transPer,
              criticalNum: this.apmErrors,
              warningNum: 0,
              normalNum: this.transactions
            }
          );
        },
        // 时间横轴
        dateFn: function (timeRange) {
          var now = new Date();
          for (var n = 0; n < timeRange; n++) {
            var lastDate = new Date(now - n * 60000);
            var hours = lastDate.getHours();
            var minutes = lastDate.getMinutes();
            var timeStr;
            if (hours > 12) {
              hours -= 12;
              timeStr = 'PM';
            } else {
              timeStr = 'AM';
            }
            hours = hours < 10 ? hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var dates = hours + ':' + minutes + timeStr;
            this.date.unshift(dates);
          }
        },
        randomData: function () {
          return Math.round(Math.random() * 1000);
        },
        // 加载中国地图
        loadChinaMapFn: function () {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('china-map'));
          var data = [{
            name: '云南',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '辽宁',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '黑龙江',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '湖南',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '福建',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '贵州',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '广东',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '青海',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '西藏',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '四川',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '湖北',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '浙江',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '内蒙古',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '江苏',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '河北',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '河南',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '山东',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '山西',
            value1: this.randomData(),
            value2: this.randomData()
          }, {
            name: '新疆',
            value1: this.randomData(),
            value2: this.randomData()
          }];
          var resultdata0 = [];
          var sum0 = 0;
          var titledata = [];
          for (var i = 0; i < data.length; i++) {
            var d0 = {
              name: data[i].name,
              value: data[i].value1 + data[i].value2
            };
            titledata.push(data[i].name);
            resultdata0.push(d0);
            sum0 += data[i].value1 + data[i].value2;
          }
          function NumDescSort (a, b) {
            return a.value - b.value;
          }
          resultdata0.sort(NumDescSort);
          var resultdata1 = [];
          for (var j = 0; j < 5; j++) {
            resultdata1.push(resultdata0[j]);
          }
          var option = {
            title: [{ // 标题
              text: '业务量统计',
              subtext: '纯属虚构',
              left: 'left'
            }],
            tooltip: {
              trigger: 'item'
            },
            visualMap: { // 左下角拉条
              min: 0,
              max: 2500,
              left: '10%',
              top: '220',
              text: ['高', '低'],
              calculable: true,
              colorLightness: [0.2, 200],
              color: ['#ff1122', '#e5cf0d', '#5affef'],
              dimension: 0
            },
            series: [{ // 地图
              z: 1,
              name: '全部',
              type: 'map',
              map: 'china',
              left: '15%',
              right: '15%',
              top: 10,
              bottom: '4%',
              zoom: 1,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              // roam: true,
              data: resultdata0
            }]
          };
          myChart.setOption(option);
          window.addEventListener('resize', function () {
            myChart.resize();
          });
        },
        echarts4: function () {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('loadChart'));
          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#dddc6b'
                }
              }
            },
            legend: {
              top: '0%',
              data: ['http', 'socket'],
              textStyle: {
                color: 'rgba(100,100,100,.5)',
                fontSize: '12'
              }
            },
            grid: {
              left: '10',
              top: '30',
              right: '10',
              bottom: '-10',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                textStyle: {
                  color: 'rgba(100,100,100,.6)',
                  fontSize: 12
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(100,100,100,.2)'
                }
              },
              data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
            }, {
              axisPointer: { show: false },
              axisLine: { show: false },
              position: 'bottom',
              offset: 20
            }],
            yAxis: [{
              type: 'value',
              axisTick: { show: false },
              axisLine: {
                lineStyle: {
                  color: 'rgba(100,100,100,.1)'
                }
              },
              axisLabel: {
                textStyle: {
                  color: 'rgba(100,100,100,.6)',
                  fontSize: 12
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(100,100,100,.1)'
                }
              }
            }],
            series: [
              {
                name: 'http',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    color: '#006fcc',
                    width: 2
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(1, 132, 213, 0.4)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(1, 132, 213, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#0184d5',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                  }
                },
                data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4, 3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]
              },
              {
                name: 'socket',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    color: '#00d887',
                    width: 2
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(0, 216, 135, 0.4)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(0, 216, 135, 0.1)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)'
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#00d887',
                    borderColor: 'rgba(221, 220, 107, .1)',
                    borderWidth: 12
                  }
                },
                data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener('resize', function () {
            myChart.resize();
          });
        },
        echarts5: function () {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('resTimeChart'));
          option = {
            //  backgroundColor: '#00265f',
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '10px',
              top: '20px',
              right: '10px',
              bottom: '10px',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽', '四川'],
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(100,100,100,.1)',
                  width: 1,
                  type: 'solid'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
                  color: 'rgba(100,100,100,.6)',
                  fontSize: '12'
                }
              }
            }],
            yAxis: [{
              type: 'value',
              axisLabel: {
                // formatter: '{value} %'
                show: true,
                textStyle: {
                  color: 'rgba(100,100,100,.6)',
                  fontSize: '12'
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(100,100,100,.1	)',
                  width: 1,
                  type: 'solid'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(100,100,100,.1)'
                }
              }
            }],
            series: [{
              type: 'bar',
              data: [2, 3, 3, 9, 15, 12, 6, 4, 6, 7, 4, 10],
              barWidth: '35%', // 柱子宽度
              // barGap: 1, //柱子之间间距
              itemStyle: {
                normal: {
                  color: '#2f89cf',
                  opacity: 1,
                  barBorderRadius: 5
                }
              }
            }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener('resize', function () {
            myChart.resize();
          });
        },
        echarts6: function () {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('errorsChart'));

          var dataStyle = {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
              // shadowBlur: 40,
              // shadowColor: 'rgba(40, 40, 40, 1)',
            }
          };
          var placeHolderStyle = {
            normal: {
              color: 'rgba(100,100,100,.05)',
              label: { show: false },
              labelLine: { show: false }
            },
            emphasis: {
              color: 'rgba(0,0,0,0)'
            }
          };
          option = {
            color: ['#0f63d6', '#0f78d6', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
            tooltip: {
              show: true,
              formatter: '{a} : {c} '
            },
            legend: {
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 12,
              bottom: '3%',

              data: ['浙江', '上海', '广东', '北京', '深圳'],
              textStyle: {
                color: 'rgba(100,100,100,.6)'
              }
            },

            series: [
              {
                name: '浙江',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['59%', '70%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                  value: 80,
                  name: '01'
                }, {
                  value: 20,
                  name: 'invisible',
                  tooltip: { show: false },
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '上海',
                type: 'pie',
                clockWise: false,
                center: ['50%', '42%'],
                radius: ['49%', '60%'],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                  value: 70,
                  name: '02'
                }, {
                  value: 30,
                  name: 'invisible',
                  tooltip: { show: false },
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '广东',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['39%', '50%'],
                itemStyle: dataStyle,
                data: [{
                  value: 65,
                  name: '03'
                }, {
                  value: 35,
                  name: 'invisible',
                  tooltip: { show: false },
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '北京',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['29%', '40%'],
                itemStyle: dataStyle,
                data: [{
                  value: 60,
                  name: '04'
                }, {
                  value: 40,
                  name: 'invisible',
                  tooltip: { show: false },
                  itemStyle: placeHolderStyle
                }]
              },
              {
                name: '深圳',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                center: ['50%', '42%'],
                radius: ['20%', '30%'],
                itemStyle: dataStyle,
                data: [{
                  value: 50,
                  name: '05'
                }, {
                  value: 50,
                  name: 'invisible',
                  tooltip: { show: false },
                  itemStyle: placeHolderStyle
                }]
              }]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
          window.addEventListener('resize', function () {
            myChart.resize();
          });
        },
        showServiceList: function () {
          var html2 = $('.servicesort ul').html();
          $('.servicesort ul').append(html2);
          var ls2 = $('.servicesort li').length / 2 + 1;
          var a = 0;
          var ref = setInterval(function () {
            a++;
            if (a == ls2) {
              a = 1;
              $('.servicesort ul').css({ marginTop: 0 });
              $('.servicesort ul').animate({ marginTop: -'.5' * a + 'rem' }, 800);
            }
            $('.servicesort ul').animate({ marginTop: -'.5' * a + 'rem' }, 800);
          }, 4300);
        }
      },
      mounted: function () {
        this.$nextTick(function () {
          this.showServiceList();

          this.loadChinaMapFn();

          this.nodeDataFn();

          this.dateFn(10);

          this.echarts4();

          this.echarts5();

          this.echarts6();

          // this.loadChart = echarts.init(document.getElementById('loadChart'));
          // this.loadChartFn();

          // this.resTimeChart = echarts.init(document.getElementById('resTimeChart'));
          // this.resTimeChartFn();

          // this.errorsChart = echarts.init(document.getElementById('errorsChart'));
          // this.errorChartFn();
        });
      }

    });
  };
});