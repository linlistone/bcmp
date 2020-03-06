package cn.com.yusys.icsp.bcmp.constant;

public enum WebSocketProtocol {

    //节点状态
    NODESTATUS("nodestatus"),
    //部署进度
    DEPLOY("deploy");

    /**
     * 名称
     */
    private String name;

    /**
     * 构造函数
     *
     * @param name
     */
    private WebSocketProtocol(String name) {
        this.name = name;
    }

    /**
     * 获取名称
     *
     * @return
     */
    public String getName() {
        return this.name;
    }
}
