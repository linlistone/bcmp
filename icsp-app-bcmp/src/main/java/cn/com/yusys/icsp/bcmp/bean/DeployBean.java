package cn.com.yusys.icsp.bcmp.bean;

public class DeployBean {
    private String ids;
    private String userId;
    private String version;
    private String needRestart;
    private String nodeType;

    public String getIds() {
        return ids;
    }

    public void setIds(String ids) {
        this.ids = ids;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getNeedRestart() {
        return needRestart;
    }

    public void setNeedRestart(String needRestart) {
        this.needRestart = needRestart;
    }

    public String getNodeType() {
        return nodeType;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }

    @Override
    public String toString() {
        return "DeployBean{" +
                "ids='" + ids + '\'' +
                ", userId='" + userId + '\'' +
                ", version='" + version + '\'' +
                ", needRestart='" + needRestart + '\'' +
                ", nodeType='" + nodeType + '\'' +
                '}';
    }
}
