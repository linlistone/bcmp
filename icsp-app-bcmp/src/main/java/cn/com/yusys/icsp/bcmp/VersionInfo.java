package cn.com.yusys.icsp.bcmp;

public class VersionInfo {
    private String name;
    private String version;
    private String fileName;
    private String srcPath;
    private String deployPath;
    private String created;

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getVersion() {
        return this.version;
    }

    public void setVersion(final String version) {
        this.version = version;
    }

    public String getFileName() {
        return this.fileName;
    }

    public void setFileName(final String fileName) {
        this.fileName = fileName;
    }

    public String getSrcPath() {
        return this.srcPath;
    }

    public void setSrcPath(final String srcPath) {
        this.srcPath = srcPath;
    }

    public String getDeployPath() {
        return this.deployPath;
    }

    public void setDeployPath(final String deployPath) {
        this.deployPath = deployPath;
    }

    public String getCreated() {
        return this.created;
    }

    public void setCreated(final String created) {
        this.created = created;
    }
}
