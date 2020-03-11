/**
 * 全局后台服务映射表
 * created by helin3 2017-12-04
 */
(function (window) {
  window.backend = {
    // bcmp统一管理端
    appOcaService: '/api',
    adminService: '/api',
    uaaService: '/api',
    bcmpService: '/api',
    generatorService: '/api', // 代码生成
    sysId: 'bcmp'// 默认系统ID
  };
  window.msbackend = {
    // 微服务
    uaaService: '/yusp-uaa', // 用户认证微服务
    appOcaService: '/sp-app-oca' // 组织机构、菜单权限微服务
    // gatewayService: '/zuul', // 网关
    // appCommonService: '/yusp-app-common', // 基础服务
    // appOcaService: '/sp-app-common-yu', // 组织机构、菜单权限微服务
    // appPubService: '/sp-app-common', // 门户共公服务
    // noticeService: '/yusp-app-notice', // 公告微服务
    // messageService: '/yusp-app-message', // 消息中心微服务
    // jobService: '/yusp-job-admin', // 分布式调度管理端
    // fileService: '/yusp-file', // 文件微服务
    // seqService: '/yusp-sequence', // 全局序列号微服务
    // echainService: '/yusp-echain', // 工作流微服务
    // example: '/sp-app-task', // 示例微服务
    // actService: '/ms-tcc-service1', // TCC-示例原子微服务
    // scoreService: '/ms-tcc-service2', // TCC-示例原子微服务
    // compositeService: '/ms-tcc-composite', // TCC-示例聚合微服务
    // mycatService: '/ms-example-mycat', // 示例分布式数据库 缓存
    // // appQueueService: '/sp-app-queue-starter-jxz', //排队机微服务
    // appQueueService: '/sp-intelligent-branch', //排队机微服务
    // // appQueueIndexService: '/sp-app-queue-ml',//排队机首页服务
    // // appQueueIndexService2: '/sp-app-queue-xcl',//排队机首页服务
    // loanreport: '/loanreport', //排队机微服
    // isSingleServer: false, // 服务端是否单机运行
    // sysId: '1cab27def8fb4c0f9486dcf844b783c0',//系统ID
    // creditLmtService: '/credit-lmt',
    // creditLoanService: '/credit-loan',
    // creditGrtService: '/credit-grt',
    // creditRepayService: '/credit-repay',
    // creditChennalApplyService: '/credit-channelapply',
    // creditDayBatService: '/credit-daybat',
    // superOrgId: "000000",//最高树节点
  };
}(window));
