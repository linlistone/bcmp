package cn.com.yusys.icsp.bcmp.bean;

import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;

import java.util.List;

public class DeployBean {
    private List<BcmpSmNodeinfo> nodes;
    private String userId;
    private String version;
    private String needRestart;
    private String nodeType;

    public List<BcmpSmNodeinfo> getNodes() {
        return nodes;
    }

    public void setNodes(List<BcmpSmNodeinfo> nodes) {
        this.nodes = nodes;
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
                "nodes=" + nodes +
                ", userId='" + userId + '\'' +
                ", version='" + version + '\'' +
                ", needRestart='" + needRestart + '\'' +
                ", nodeType='" + nodeType + '\'' +
                '}';
    }
}
