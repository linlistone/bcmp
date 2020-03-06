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
    HOST_TYPE: [// 数据状态
      { key: 'FOX_PC', value: 'PC服务器' },
      { key: 'FOX_PAD', value: 'PAD服务器' }
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