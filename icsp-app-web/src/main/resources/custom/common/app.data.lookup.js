/**
 * 本地数据字典
 * created by helin3 2017-12-04
 */
define(function (require, exports) {
  exports.localLookup = {
    CRUD_TYPE: [// 操作类型
      { key: 'ADD', value: '新增' },
      { key: 'EDIT', value: '修改' },
      { key: 'DETAIL', value: '详情' }
    ],
    DATA_STS: [// 数据状态
      { key: 'W', value: '待生效' },
      { key: 'I', value: '失效' },
      { key: 'A', value: '生效' }
    ],
    YESNO: [// 是否
      { key: 'Y', value: '是' },
      { key: 'N', value: '否' }
    ],
    AUTHOBJ_TYPE: [
      { key: 'R', value: '角色' }
    ],
    NODE_TYPE: [// 数据状态
      { key: 'FOX_PC', value: 'PC服务器' },
      { key: 'FOX_PAD', value: 'PAD服务器' },
      { key: 'BSP', value: 'BSP服务器' }
    ],
    APP_MOD_TYPE: [// 应用节点类型
      { key: 'M', value: '主应用' },
      { key: 'C', value: '子应用' }
    ],
    VERSION_TYPE: [// 版本类型
      { key: 'APP', value: '服务应用包' },
      { key: 'APK', value: 'APK安装包' },
      { key: 'FOX', value: '平台升级包' },
      { key: 'BSP', value: 'BSP升级包' }
    ],
    DEVICE_STS: [// 设备状态
      { key: '0', value: '未启用' },
      { key: '1', value: '启用' },
      { key: '2', value: '停用' },
      { key: '3', value: '注销' }
    ],
    TRANS_TREATY: [// 传输协议
      { key: '01', value: 'FTP' },
      { key: '02', value: 'SFTP' },
      { key: '03', value: 'AGENT' }
    ],
    LOGIN_TREATY: [// 登录协议
      { key: '01', value: 'TELNET' },
      { key: '02', value: 'SSH' },
      { key: '03', value: 'AGENT' }
    ],
    TRADE_TYPE: [// 交易类型
      { key: 'tree', value: '树表' },
      { key: 'single', value: '单表' },
      { key: 'maintable', value: '主表' },
      { key: 'detail', value: '明细表' }
    ],
    CREATE_TYPE: [// 生成类型
      { key: 'spring', value: 'SPRING' },
      { key: 'fox', value: 'FOX' }
    ]


  };
});