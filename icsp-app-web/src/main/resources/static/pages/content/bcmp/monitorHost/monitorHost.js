/**
 * @created by wangyang13 2019-03-18
 * @updated by
 * @description 主机监控
 */
define(['jsplumb', 'echarts', 'jquery'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var clusterHostMap = [];
    var hostOptions = [];
    var clusters = yufp.sessionStorage.get('currentCluster') ? '/' + yufp.sessionStorage.get('currentCluster') : '';
    yufp.service.request({
      url: backend.dashboardService + '/api/host/infos' + clusters,
      methods: 'get',
      async: false,
      callback: function (code, message, response) {
        if (response != null && response.data != null) {
          var data = response.data;
          for (var i = 0; i < data.length; i++) {
            if (clusterHostMap.indexOf(data[i].ip) == -1) {
              clusterHostMap.push(data[i].ip);
            }
          }
        }
      }
    });
    yufp.service.request({
      url: backend.bcmpService + '/bcmpSmHostinfo/index',
      method: 'get',
      async: false,
      callback: function (code, message, response) {
        if (response.data != null) {
          var data = response.data;
          var list = [];
          for (var i = 0, j = 0; i < data.length; i++) {
            if (list.indexOf(data[i].hostIp) == -1 && clusterHostMap.indexOf(data[i].hostIp) > -1) {
              list[j] = {
                key: data[i].hostIp,
                value: data[i].hostIp
              };
              j++;
            }
          }
          hostOptions = list;
        }
      }
    });
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          hostOptions: hostOptions,
          tableData: [],
          cpuLine: {
            echarts: null,
            echarts1: null,
            divId1: 'cpuLine1_' + new Date().getTime(),
            divId2: 'cpuLine2_' + new Date().getTime()
          },
          memoryLine: {
            echarts: null,
            echarts1: null,
            divId1: 'memoryLine1_' + new Date().getTime(),
            divId2: 'memoryLine2_' + new Date().getTime()
          },
          diskLine: {
            echarts: null,
            divId: 'diskLine1_' + new Date().getTime()
          },
          diskIoLine: {
            echarts: null,
            echarts1: null,
            echarts2: null,
            divId1: 'diskIoLine1_' + new Date().getTime(),
            divId2: 'diskIoLine2_' + new Date().getTime(),
            divId3: 'diskIoLine3_' + new Date().getTime()
          },
          netWorkLine: {
            echarts: null,
            echarts1: null,
            echarts2: null,
            echarts3: null,
            divId1: 'netWorkLine1_' + new Date().getTime(),
            divId2: 'netWorkLine2_' + new Date().getTime(),
            divId3: 'netWorkLine3_' + new Date().getTime(),
            divId4: 'netWorkLine4_' + new Date().getTime()
          },
          chartsWidth: yufp.custom.viewSize().width / 4,
          chartHeight: yufp.custom.viewSize().height / 3.5,
          cpuLineStyle: {
            width: yufp.frame.size().width / 2 - 30 + 'px',
            height: yufp.frame.size().height / 3 + 'px'
          },
          diskLineStyle: {
            width: yufp.frame.size().width / 3 - 30 + 'px',
            height: yufp.frame.size().height / 3 + 'px'
          },
          tableColumns: [
            {
              label: '文件系统',
              prop: 'type',
              sortable: true
            },
            {
              label: '分区',
              prop: 'mount_point',
              resizable: true
            },
            {
              label: '可用空间(MB)',
              prop: 'free'
            },
            {
              label: '使用率',
              prop: 'used.pct',
              formatter: function (row, column, cellValue) {
                return (cellValue * 100).toFixed(2) + '%';
              }
            }
          ],
          // Cpu使用率图表
          cpuOption: {
            title: {
              text: 'CPU使用率',
              x: 'center',
              y: 'bottom',
              padding: [0, 0, 20, 0],
              textStyle: {
                color: '#444',
                fontWeight: 'normal',
                fontSize: 16
              }
            },
            grid: {
              top: '10',
              left: '10',
              right: '10',
              bottom: '10',
              containLabel: !0
            },
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: '使用率',
                title: 'CPU使用率',
                type: 'gauge',
                radius: '85%',
                center: ['50%', '50%'], // 仪表位置
                pointer: { // 指针样式
                  length: '50%'
                },
                axisLine: {
                  show: true,
                  // 属性lineStyle控制线条样式
                  lineStyle: {
                    width: 15,
                    color: [[0.5, '#13CE66'], [0.8, '#F7BA2A'], [1, '#FF4949']]
                  }
                },
                detail: {
                  formatter: '{value}%',
                  textStyle: {
                    color: 'auto',
                    fontSize: 18
                  },
                  offsetCenter: [0, '60%']
                },
                data: [{ value: 0, name: 'CPU使用率' }]
              }
            ]
          },
          // 内存使用率图表
          memoryOption: {
            title: {
              text: '内存使用率',
              x: 'center',
              y: 'bottom',
              padding: [0, 0, 20, 0],
              textStyle: {
                color: '#444',
                fontWeight: 'normal',
                fontSize: 16
              }
            },
            grid: {
              top: '10',
              left: '10',
              right: '10',
              bottom: '10',
              containLabel: !0
            },
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: '使用率',
                title: '内存使用率',
                type: 'gauge',
                radius: '85%',
                center: ['50%', '50%'], // 仪表位置
                pointer: { // 指针样式
                  length: '50%'
                },
                axisLine: {
                  show: true,
                  // 属性lineStyle控制线条样式
                  lineStyle: {
                    width: 15,
                    color: [[0.5, '#13CE66'], [0.8, '#F7BA2A'], [1, '#FF4949']]
                  }
                },
                detail: {
                  formatter: '{value}%',
                  textStyle: {
                    color: 'auto',
                    fontSize: 18
                  },
                  offsetCenter: [0, '60%']
                },
                data: [{ value: 0, name: '内存使用率' }]
              }
            ]
          },
          // 磁盘使用率图表
          diskOption: {
            title: {
              text: '磁盘使用率',
              x: 'center',
              y: 'bottom',
              padding: [0, 0, 20, 0],
              textStyle: {
                color: '#444',
                fontWeight: 'normal',
                fontSize: 16
              }
            },
            grid: {
              top: '10',
              left: '10',
              right: '10',
              bottom: '10',
              containLabel: !0
            },
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%'
            },
            series: [
              {
                name: '使用率',
                title: '磁盘使用率',
                type: 'gauge',
                radius: '85%',
                center: ['50%', '50%'], // 仪表位置
                pointer: { // 指针样式
                  length: '50%'
                },
                axisLine: {
                  show: true,
                  // 属性lineStyle控制线条样式
                  lineStyle: {
                    width: 15,
                    color: [[0.5, '#13CE66'], [0.8, '#F7BA2A'], [1, '#FF4949']]
                  }
                },
                detail: {
                  formatter: '{value}%',
                  textStyle: {
                    color: 'auto',
                    fontSize: 18
                  },
                  offsetCenter: [0, '60%']
                },
                data: [{ value: 0, name: '磁盘使用率' }]
              }
            ]
          },
          cpuBusyChart: null,
          memoryBusyChart: null,
          diskBusyChart: null,
          // radio: '半小时',
          radio: '半小时',
          time: '',
          hostValue: '',
          pickerOptions: {
            shortcuts: [{
              text: '近3小时',
              onClick: function (picker) {
                var end = new Date();
                var start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 6);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近6小时',
              onClick: function (picker) {
                var end = new Date();
                var start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 6);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '近12小时',
              onClick: function (picker) {
                var end = new Date();
                var start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 12);
                picker.$emit('pick', [start, end]);
              }
            }],
            disabledDate: function (time) {
              return time.getTime() > new Date();
            }
          },
          queryTimeStr: yufp.util.dateFormat(new Date() - (30 * 60 * 1000)) + ' - ' + yufp.util.dateFormat(new Date()),
          ip: '',
          hostMetricPeriodUrl: '/api/elsearch/meticbeat/system/metricPeriod',
          cpuCores: '',
          memTotal: '',
          uptime: '',
          uptimeUnit: '',
          hostIp: ''
        };
      },
      created: function () {
      },
      mounted: function () {
        if (hostOptions.length != 0) {
          this.hostValue = hostOptions[0].key;
          this.ip = hostOptions[0].key;
        }
        if (!this.cpuBusyChart) {
          this.cpuBusyChart = echarts.init(document.getElementById('cpuBusy'));
        }
        if (!this.memoryBusyChart) {
          this.memoryBusyChart = echarts.init(document.getElementById('memoryBusy'));
        }
        if (!this.diskBusyChart) {
          this.diskBusyChart = echarts.init(document.getElementById('diskBusy'));
        }
        this.cpuBusyChart.setOption(this.cpuOption, true);
        this.memoryBusyChart.setOption(this.memoryOption, true);
        this.diskBusyChart.setOption(this.diskOption, true);
      },
      methods: {
        timer: function () {
          var _this = this;
          return setTimeout(function () {
            var end = new Date();
            var start = new Date();
            start.setTime(start.getTime() - 60 * 1000 * 30);
            var startTime = yufp.util.dateFormat(start);
            var endTime = yufp.util.dateFormat(end);
            _this.queryTimeStr = startTime + ' - ' + endTime;
            _this.loadHostMonitorLineFn();
          }, 300000);
        },
        // 格式化数据
        formatter: function (row, column, cellValue) {
          return (cellValue * 100).toFixed(2) + '%';
        },
        loadHostMonitorLineFn: function () {
          var me = this;
          me.loadDiskUsedLine();
          me.loadCPUInfo();
          me.loadMemoryInfo();
          me.loadDiskInfo();
          me.loadNetWorkInfo();
        },
        hostChange: function (val) {
          if (val) {
            this.ip = val;
            this.loadHostMonitorLineFn();
          }
        },
        freshTimeChange: function () {
          var val = this.radio;
          var end = new Date();
          var start = new Date();
          if (val == '1小时') {
            start.setTime(start.getTime() - 3600 * 1000);
          } else if (val == '5分钟') {
            start.setTime(start.getTime() - 60 * 1000 * 5);
          } else if (val == '15分钟') {
            start.setTime(start.getTime() - 60 * 1000 * 15);
          } else if (val == '半小时') {
            start.setTime(start.getTime() - 60 * 1000 * 30);
          } else if (val == '2小时') {
            start.setTime(start.getTime() - 3600 * 1000 * 2);
          }
          var startTime = yufp.util.dateFormat(start);
          var endTime = yufp.util.dateFormat(end);
          this.queryTimeStr = startTime + ' - ' + endTime;
        },
        radioTimeChange: function (val) {
          var end = new Date();
          var start = new Date();
          if (val == '1小时') {
            this.radio = '1小时';
            start.setTime(start.getTime() - 3600 * 1000);
          } else if (val == '5分钟') {
            this.radio = '5分钟';
            start.setTime(start.getTime() - 60 * 1000 * 5);
          } else if (val == '15分钟') {
            this.radio = '15分钟';
            start.setTime(start.getTime() - 60 * 1000 * 15);
          } else if (val == '半小时') {
            this.radio = '半小时';
            start.setTime(start.getTime() - 60 * 1000 * 30);
          } else if (val == '2小时') {
            this.radio = '2小时';
            start.setTime(start.getTime() - 3600 * 1000 * 2);
          }
          var startTime = yufp.util.dateFormat(start);
          var endTime = yufp.util.dateFormat(end);
          this.queryTimeStr = startTime + ' - ' + endTime;
          this.loadHostMonitorLineFn();
        },
        timeChange: function (val) {
          if (val != '') {
            this.radio = '';
            var time = val.split(' - ');
            var start = new Date(Date.parse(time[0].replace(/-/g, '/'))).getTime();
            var end = new Date(Date.parse(time[1].replace(/-/g, '/'))).getTime();
            var startTime = yufp.util.dateFormat(start);
            var endTime = yufp.util.dateFormat(end);
            this.queryTimeStr = startTime + ' - ' + endTime;
            this.loadHostMonitorLineFn();
          }
        },
        cpuUsage: function (callbackParam) {
          var _this = this;
          yufp.service.request({
            url: '/api/elsearch/meticbeat/system/metricPresent',
            method: 'POST',
            data: _this.ip,
            timeout: 60000,
            callback: function (code, message, response) {
              if (response.data) {
                response.data = JSON.parse(response.data);
                _this.hostIp = response.data.ip;
                _this.cpuCores = response.data.cpu_cores;
                _this.memTotal = response.data.mem_total;
                _this.uptime = response.data.uptime_duration_ms;
                _this.cpuOption.series[0].data[0].value = (response.data.cpu_total_pct / response.data.cpu_cores * 100).toFixed(2);
                _this.diskOption.series[0].data[0].value = (response.data.fs_used_pct * 100).toFixed(2);
                _this.memoryOption.series[0].data[0].value = (response.data.mem_used_pct * 100).toFixed(2);
                if (response.data.uptime_duration_ms / (365 * 24 * 3600 * 1000) >= 1) {
                  _this.uptime = (response.data.uptime_duration_ms / (365 * 24 * 3600 * 1000)).toFixed(2).toString();
                  _this.uptimeUnit = 'year';
                } else if (response.data.uptime_duration_ms / (30 * 24 * 3600 * 1000) >= 1) {
                  _this.uptime = (response.data.uptime_duration_ms / (30 * 24 * 3600 * 1000)).toFixed(2).toString();
                  _this.uptimeUnit = 'month';
                } else if (response.data.uptime_duration_ms / (24 * 3600 * 1000) >= 1) {
                  _this.uptime = (response.data.uptime_duration_ms / (24 * 3600 * 1000)).toFixed(2).toString();
                  _this.uptimeUnit = 'day';
                } else if (response.data.uptime_duration_ms / (3600 * 1000) >= 1) {
                  _this.uptime = (response.data.uptime_duration_ms / (3600 * 1000)).toFixed(2).toString();
                  _this.uptimeUnit = 'hour';
                } else {
                  _this.uptime = (response.data.uptime_duration_ms / (60 * 1000)).toFixed(2).toString();
                  _this.uptimeUnit = 'minute';
                }
                if (response.data.mem_total / (1024 * 1024 * 1024 * 1024) >= 1) {
                  _this.memTotal = (response.data.mem_total / (1024 * 1024 * 1024 * 1024)).toFixed(2).toString() + 'T';
                } else if (response.data.mem_total / (1024 * 1024 * 1024) >= 1) {
                  _this.memTotal = (response.data.mem_total / (1024 * 1024 * 1024)).toFixed(2).toString() + 'GB';
                } else if (response.data.mem_total / (1024 * 1024) >= 1) {
                  _this.memTotal = (response.data.mem_total / (1024 * 1024)).toFixed(2).toString() + 'MB';
                } else if (response.data.mem_total / 1024 >= 1) {
                  _this.memTotal = (response.data.mem_total / 1024).toFixed(2).toString() + 'KB';
                } else {
                  _this.memTotal = response.data.mem_total.toFixed(2).toString() + 'B';
                }
              } else {
                _this.cpuCores = 0;
                _this.memTotal = 0;
                _this.uptime = 0;
                _this.uptimeUnit = 'day';
              }
              if (!_this.cpuBusyChart) {
                _this.cpuBusyChart = echarts.init(document.getElementById('cpuBusy'));
              }
              if (!_this.memoryBusyChart) {
                _this.memoryBusyChart = echarts.init(document.getElementById('memoryBusy'));
              }
              if (!_this.diskBusyChart) {
                _this.diskBusyChart = echarts.init(document.getElementById('diskBusy'));
              }
              _this.cpuBusyChart.setOption(_this.cpuOption, true);
              _this.memoryBusyChart.setOption(_this.memoryOption, true);
              _this.diskBusyChart.setOption(_this.diskOption, true);
              // 执行回调
              typeof callbackParam === 'function' ? callbackParam.call(_this, response.data) : '';
            }
          });
        },
        // 磁盘使用情况饼图-构图
        loadDiskUsedLine: function () {
          var _this = this;
          _this.cpuUsage(function (lineData) {
            if (!_this.diskLine.echarts) {
              _this.diskLine.echarts = echarts.init(document.getElementById(_this.diskLine.divId));
            }
            var fileSystemList = [];
            if (lineData) {
              fileSystemList = lineData.filesystemList;
            }
            var option = {
              title: {
                text: '总空间',
                padding: [40, 0, 0, 0],
                left: 245,
                textStyle: {
                  fontSize: 14,
                  color: '#666'
                },
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}MB ({d}%)'
              },
              legend: {
                orient: 'vertical',
                itemGap: 20,
                top: 70,
                x: 'left',
                y: 'center',
                textStyle: {
                  color: '#666'
                },
                data: []
              },
              color: ['#20A0FF', '#13CE66', '#F7BA2A', '#b320ff', '#a2ed21', '#fe8544'],
              calculable: true,
              series: [
                {
                  name: '文件系统:分区',
                  type: 'pie',
                  center: ['60%', '60%'],
                  radius: ['50%', '65%'],
                  itemStyle: {
                    normal: {
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      }
                    },
                    emphasis: {
                      label: {
                        show: true,
                        position: 'outer'
                      },
                      labelLine: {
                        show: true,
                        lineStyle: {
                          color: 'red'
                        }
                      }
                    }
                  },
                  data: []
                }
              ]
            };
            for (var i = 0; i < fileSystemList.length; i++) {
              fileSystemList[i] = JSON.parse(fileSystemList[i]);
              option.legend.data.push(fileSystemList[i].type + ':' + fileSystemList[i].mount_point);
              var temp = {};
              temp.value = (fileSystemList[i].total / 1024 / 1024).toFixed(2);
              temp.name = fileSystemList[i].type + ':' + fileSystemList[i].mount_point;
              option.series[0].data.push(temp);
              fileSystemList[i].free = (fileSystemList[i].free / 1024 / 1024).toFixed(2);
            }
            _this.diskLine.echarts.setOption(option);
            _this.diskLine.echarts.resize();
            // _this.$refs.diskInfoTable.data = fileSystemList;
            _this.tableData = fileSystemList;
            _this.tableColumns = fileSystemList;
          });
        },
        // CPU使用率折线图-构图
        loadCPUUsedLine: function (lineData) {
          var _this = this;
          if (!_this.cpuLine.echarts) {
            _this.cpuLine.echarts = echarts.init(document.getElementById(_this.cpuLine.divId1));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var cpuCoresArray = [];
          var cpuCoresValue = '';
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.cpu.total.pct'];
            cpuCoresArray = lineData['system.cpu.cores'];
          }
          if (_this.cpuCores) {
            cpuCoresValue = _this.cpuCores;
          } else {
            cpuCoresValue = cpuCoresArray[cpuCoresArray.length - 1];
          }
          if (cpuCoresValue) {
            for (var i = 0; i < seriesData1.length; i++) {
              seriesData1[i] = (seriesData1[i] / cpuCoresValue * 100).toFixed(2);
            }
          }
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
              data: ['使用率'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            grid: {
              top: '60',
              left: '20',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            textStyle: {
              color: '#888'
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}%'
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              name: '使用率'
            }],
            series: [
              {
                name: '使用率',
                smooth: true,
                type: 'line',
                smooth: true,
                barWidth: '10',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }
            ]
          };
          _this.cpuLine.echarts.setOption(option);
          _this.cpuLine.echarts.resize();
        },
        // 系统平均负载率折线图-构图
        loadCPULoadLine: function (lineData) {
          var _this = this;
          if (!_this.cpuLine.echarts1) {
            _this.cpuLine.echarts1 = echarts.init(document.getElementById(_this.cpuLine.divId2));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          var seriesData3 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.load.1'];
            seriesData2 = lineData['system.load.5'];
            seriesData3 = lineData['system.load.15'];
          }
          var option = {
            title: {
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            textStyle: {
              color: '#888'
            },
            legend: {
              data: ['最近1分钟', '最近5分钟', '最近15分钟'],
              padding: [20, 0, 0, 0],
              itemGap: 5
            },
            grid: {
              top: '60',
              left: '20',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              nameTextStyle: {
                align: 'right',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto'
              },
              name: '负载',
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            }],
            series: [
              {
                name: '最近1分钟',
                smooth: true,
                type: 'line',
                barWidth: '10',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '最近5分钟',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }, {
                name: '最近15分钟',
                smooth: true,
                type: 'line',
                data: seriesData3,
                itemStyle: {
                  normal: {
                    color: '#F7BA2A'
                  }
                }
              }
            ]
          };
          _this.cpuLine.echarts1.setOption(option);
          _this.cpuLine.echarts1.resize();
        },
        // 内存使用情况折线图-构图
        loadMemoryUsedLine: function (lineData) {
          var _this = this;
          if (!_this.memoryLine.echarts) {
            _this.memoryLine.echarts = echarts.init(document.getElementById(_this.memoryLine.divId1));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          var seriesData3 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.memory.total'];
            seriesData2 = lineData['system.memory.used.bytes'];
            seriesData3 = lineData['system.memory.free'];
            for (var i = 0; i < seriesData1.length; i++) {
              seriesData1[i] = (seriesData1[i] / 1024 / 1024 / 1024).toFixed(2);
            }
            for (var i = 0; i < seriesData2.length; i++) {
              seriesData2[i] = (seriesData2[i] / 1024 / 1024 / 1024).toFixed(2);
            }
            for (var i = 0; i < seriesData3.length; i++) {
              seriesData3[i] = (seriesData3[i] / 1024 / 1024 / 1024).toFixed(2);
            }
          }
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
              data: ['总量', '占用', '空闲'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              nameTextStyle: {
                align: 'right',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}GB'
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              name: '内存'
            }],
            series: [
              {
                name: '总量',
                smooth: true,
                type: 'line',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '占用',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#F7BA2A'
                  }
                }
              }, {
                name: '空闲',
                smooth: true,
                type: 'line',
                data: seriesData3,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }
            ]
          };
          _this.memoryLine.echarts.setOption(option);
          _this.memoryLine.echarts.resize();
        },
        // swap使用情况折线图-构图
        loadSwapUsedLine: function (lineData) {
          var _this = this;
          if (!_this.memoryLine.echarts1) {
            _this.memoryLine.echarts1 = echarts.init(document.getElementById(_this.memoryLine.divId2));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          var seriesData3 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.memory.swap.total'];
            seriesData2 = lineData['system.memory.swap.used.bytes'];
            seriesData3 = lineData['system.memory.swap.free'];
            for (var i = 0; i < seriesData1.length; i++) {
              seriesData1[i] = (seriesData1[i] / 1024 / 1024 / 1024).toFixed(2);
            }
            for (var i = 0; i < seriesData2.length; i++) {
              seriesData2[i] = (seriesData2[i] / 1024 / 1024 / 1024).toFixed(2);
            }
            for (var i = 0; i < seriesData3.length; i++) {
              seriesData3[i] = (seriesData3[i] / 1024 / 1024 / 1024).toFixed(2);
            }
          }
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
              data: ['总量', '占用', '空闲'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              nameTextStyle: {
                align: 'right',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}GB'
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              name: 'swap内存'
            }],
            series: [
              {
                name: '总量',
                smooth: true,
                type: 'line',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '占用',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#F7BA2A'
                  }
                }
              }, {
                name: '空闲',
                smooth: true,
                type: 'line',
                data: seriesData3,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }
            ]
          };
          _this.memoryLine.echarts1.setOption(option);
          _this.memoryLine.echarts1.resize();
        },
        // 磁盘读写速率折线图-构图
        loadDiskReadWritePerSecLine: function (lineData) {
          var _this = this;
          if (!_this.diskIoLine.echarts) {
            _this.diskIoLine.echarts = echarts.init(document.getElementById(_this.diskIoLine.divId1));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.diskio.iostat.read.per_sec.bytes'];
            seriesData2 = lineData['system.diskio.iostat.write.per_sec.bytes'];
            for (var i = 0; i < seriesData1.length; i++) {
              seriesData1[i] = (seriesData1[i] / 1024).toFixed(2);
            }
            for (var i = 0; i < seriesData2.length; i++) {
              seriesData2[i] = (seriesData2[i] / 1024).toFixed(2);
            }
          }
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
              data: ['读速率', '写速率'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              nameTextStyle: {
                align: 'right',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}KB/s'
              },
              name: '速率',
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            }],
            series: [
              {
                name: '读速率',
                smooth: true,
                type: 'line',
                barWidth: '10',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '写速率',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }
            ]
          };
          _this.diskIoLine.echarts.setOption(option);
          _this.diskIoLine.echarts.resize();
        },
        // I/O请求处理平均时间折线图-构图
        loadIOServiceTimeLine: function (lineData) {
          var _this = this;
          if (!_this.diskIoLine.echarts2) {
            _this.diskIoLine.echarts2 = echarts.init(document.getElementById(_this.diskIoLine.divId2));
          }
          var xAxisData = [];
          var seriesData1 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.diskio.iostat.service_time'];
            for (var i = 0; i < seriesData1.length; i++) {
              if (seriesData1[i].indexOf('\.') > 0) {
                seriesData1[i] = (seriesData1[i] / 1).toFixed(2);
              }
            }
          }
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
              data: ['处理时间'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              nameTextStyle: {
                align: 'right',
                fontSize: 12
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}ms'
              },
              name: 'I/O请求',
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            }],
            series: [
              {
                name: '处理时间',
                smooth: true,
                type: 'line',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }
            ]
          };
          _this.diskIoLine.echarts2.setOption(option);
          _this.diskIoLine.echarts2.resize();
        },
        // 网卡出入口包数量折线图-构图
        loadNetWorkInPacketsLine: function (lineData) {
          var _this = this;
          if (!_this.netWorkLine.echarts) {
            _this.netWorkLine.echarts = echarts.init(document.getElementById(_this.netWorkLine.divId1));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.network.in.packets'];
            seriesData2 = lineData['system.network.out.packets'];
            for (var i = 0; i < seriesData1.length; i++) {
              seriesData1[i] = (seriesData1[i] / 1000 / 1000).toFixed(2);
            }
            for (var i = 0; i < seriesData2.length; i++) {
              seriesData2[i] = (seriesData2[i] / 1000 / 1000).toFixed(2);
            }
          }
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
              data: ['入口包', '出口包'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}Mp'
              },
              name: '包数量',
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              }
            }],
            series: [
              {
                name: '入口包',
                smooth: true,
                type: 'line',
                barWidth: '10',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '出口包',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }
            ]
          };
          _this.netWorkLine.echarts.setOption(option);
          _this.netWorkLine.echarts.resize();
        },
        // 网卡出入口包大小折线图-构图
        loadNetWorkInBytesLine: function (lineData) {
          var _this = this;
          if (!_this.netWorkLine.echarts1) {
            _this.netWorkLine.echarts1 = echarts.init(document.getElementById(_this.netWorkLine.divId2));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.network.in.bytes'];
            seriesData2 = lineData['system.network.out.bytes'];
            for (var i = 0; i < seriesData1.length; i++) {
              seriesData1[i] = (seriesData1[i] / 1024 / 1024 / 1024).toFixed(2);
            }
            for (var i = 0; i < seriesData2.length; i++) {
              seriesData2[i] = (seriesData2[i] / 1024 / 1024 / 1024).toFixed(2);
            }
          }
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
              data: ['入口包', '出口包'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto',
                formatter: '{value}GB'
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              name: '包大小'
            }],
            series: [
              {
                name: '入口包',
                smooth: true,
                type: 'line',
                barWidth: '10',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '出口包',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }
            ]
          };
          _this.netWorkLine.echarts1.setOption(option);
          _this.netWorkLine.echarts1.resize();
        },
        // 网卡出入口拒收包数量折线图-构图
        loadNetWorkInDroppedLine: function (lineData) {
          var _this = this;
          if (!_this.netWorkLine.echarts2) {
            _this.netWorkLine.echarts2 = echarts.init(document.getElementById(_this.netWorkLine.divId3));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.network.in.dropped'];
            seriesData2 = lineData['system.network.out.dropped'];
          }
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
              data: ['入口拒收包', '出口拒收包'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto'
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              name: '包数量'
            }],
            series: [
              {
                name: '入口拒收包',
                smooth: true,
                type: 'line',
                barWidth: '10',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '出口拒收包',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }
            ]
          };
          _this.netWorkLine.echarts2.setOption(option);
          _this.netWorkLine.echarts2.resize();
        },
        // 网卡出入口拒收包数量折线图-构图
        loadNetWorkInErrorLine: function (lineData) {
          var _this = this;
          if (!_this.netWorkLine.echarts3) {
            _this.netWorkLine.echarts3 = echarts.init(document.getElementById(_this.netWorkLine.divId4));
          }
          var xAxisData = [];
          var seriesData1 = [];
          var seriesData2 = [];
          if (lineData) {
            xAxisData = lineData.times;
            seriesData1 = lineData['system.network.in.errors'];
            seriesData2 = lineData['system.network.out.errors'];
          }
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
              data: ['入口错误包', '出口错误包'],
              padding: [20, 0, 0, 0],
              textStyle: {
                color: '#666'
              }
            },
            textStyle: {
              color: '#888'
            },
            grid: {
              top: '60',
              left: '10',
              right: '30',
              bottom: '25',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData,
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              axisLabel: {
                formatter: function (v, i) {
                  return v.split(' ')[1];
                }
              }
            },
            yAxis: [{
              type: 'value',
              splitLine: {
                show: false
              },
              min: 0,
              max: 'dataMax',
              minInterval: 1,
              nameTextStyle: {
                align: 'right',
                fontSize: 12,
                color: '#444'
              },
              axisLabel: {
                show: true,
                interval: 'auto'
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              name: '数量'
            }],
            series: [
              {
                name: '入口错误包',
                smooth: true,
                type: 'line',
                barWidth: '10',
                data: seriesData1,
                itemStyle: {
                  normal: {
                    color: '#20A0FF'
                  }
                }
              }, {
                name: '出口错误包',
                smooth: true,
                type: 'line',
                data: seriesData2,
                itemStyle: {
                  normal: {
                    color: '#13CE66'
                  }
                }
              }
            ]
          };
          _this.netWorkLine.echarts3.setOption(option);
          _this.netWorkLine.echarts3.resize();
        },
        // 数据请求公共方法
        requestChartData: function (params, callbackParam) {
          var _this = this;
          yufp.service.request({
            url: _this.hostMetricPeriodUrl,
            method: 'POST',
            data: params,
            timeout: 60000,
            callback: function (code, message, response) {
              // 执行回调
              typeof callbackParam === 'function' ? callbackParam.call(_this, response.data) : '';
            }
          });
        },
        // CPU信息图表块
        loadCPUInfo: function () {
          var _this = this;
          var params = {
            'ip': _this.ip,
            'queryTimeStr': _this.queryTimeStr,
            'metricNameList': [
              {
                'metricsetName': 'cpu',
                'queryKey': 'system.cpu.total.pct'
              },
              {
                'metricsetName': 'cpu',
                'queryKey': 'system.cpu.cores'
              },
              {
                'metricsetName': 'load',
                'queryKey': 'system.load.1'
              },
              {
                'metricsetName': 'load',
                'queryKey': 'system.load.5'
              },
              {
                'metricsetName': 'load',
                'queryKey': 'system.load.15'
              }
            ]
          };
          _this.requestChartData(params, function (lineData) {
            _this.loadCPUUsedLine(lineData);
            _this.loadCPULoadLine(lineData);
          });
        },
        // 内存信息图表块
        loadMemoryInfo: function () {
          var _this = this;
          var params = {
            'ip': _this.ip,
            'queryTimeStr': _this.queryTimeStr,
            'metricNameList': [
              {
                'metricsetName': 'memory',
                'queryKey': 'system.memory.total'
              },
              {
                'metricsetName': 'memory',
                'queryKey': 'system.memory.used.bytes'
              },
              {
                'metricsetName': 'memory',
                'queryKey': 'system.memory.free'
              },
              {
                'metricsetName': 'memory',
                'queryKey': 'system.memory.swap.total'
              },
              {
                'metricsetName': 'memory',
                'queryKey': 'system.memory.swap.used.bytes'
              },
              {
                'metricsetName': 'memory',
                'queryKey': 'system.memory.swap.free'
              }
            ]
          };
          _this.requestChartData(params, function (lineData) {
            _this.loadMemoryUsedLine(lineData);
            _this.loadSwapUsedLine(lineData);
          });
        },
        // 磁盘读写信息图表块
        loadDiskInfo: function () {
          var _this = this;
          var params = {
            'ip': _this.ip,
            'queryTimeStr': _this.queryTimeStr,
            'metricNameList': [
              {
                'metricsetName': 'diskio',
                'queryKey': 'system.diskio.iostat.read.per_sec.bytes'
              },
              {
                'metricsetName': 'diskio',
                'queryKey': 'system.diskio.iostat.write.per_sec.bytes'
              },
              {
                'metricsetName': 'diskio',
                'queryKey': 'system.diskio.iostat.service_time'
              }
            ]
          };
          _this.requestChartData(params, function (lineData) {
            _this.loadDiskReadWritePerSecLine(lineData);
            _this.loadIOServiceTimeLine(lineData);
          });
        },
        // 网卡信息图表块
        loadNetWorkInfo: function () {
          var _this = this;
          var params = {
            'ip': _this.ip,
            'queryTimeStr': _this.queryTimeStr,
            'metricNameList': [
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.in.packets'
              },
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.out.packets'
              },
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.in.bytes'
              },
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.out.bytes'
              },
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.in.dropped'
              },
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.out.dropped'
              },
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.in.errors'
              },
              {
                'metricsetName': 'network',
                'queryKey': 'system.network.out.errors'
              }
            ]
          };
          _this.requestChartData(params, function (lineData) {
            _this.loadNetWorkInPacketsLine(lineData);
            _this.loadNetWorkInBytesLine(lineData);
            _this.loadNetWorkInDroppedLine(lineData);
            _this.loadNetWorkInErrorLine(lineData);
          });
        },
        refreshBasic: function () {
          this.loadDiskUsedLine();
        },
        refreshCPULine: function () {
          this.freshTimeChange();
          this.loadCPUInfo();
        },
        refreshMemory: function () {
          this.freshTimeChange();
          this.loadMemoryInfo();
        },
        refreshDiskIO: function () {
          this.freshTimeChange();
          this.loadDiskInfo();
        },
        refreshNetWork: function () {
          this.freshTimeChange();
          this.loadNetWorkInfo();
        }
      },
      watch: {
        memTotal: function () {
          this.timer();
        }
      },
      destroyed: function () {
        clearTimeout(this.timer);
      }
    });
  };

  /**
   * 页面传递消息处理
   * @param type 消息类型
   * @param message 消息内容
   */
  exports.onmessage = function (type, message) {
  };

  /**
   * 页面销毁时触发destroy方法
   * @param id 路由ID
   * @param cite 页面站点信息
   */
  exports.destroy = function (id, cite) {
  };
});