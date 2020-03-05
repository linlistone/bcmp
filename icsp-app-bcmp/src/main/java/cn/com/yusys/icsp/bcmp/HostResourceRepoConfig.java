package cn.com.yusys.icsp.bcmp;
import org.springframework.stereotype.Component;

@Component
public class HostResourceRepoConfig {
    private String ip;
    private int port;
    private String userName;
    private String password;
    private String path;
    private TransferTypeEnum transferType;
    private SystemTypeEnum systemType;
    private boolean locale;
    private String sep;

    public HostResourceRepoConfig() {
        this.port = 22;
        this.transferType = TransferTypeEnum.PULL;
        this.systemType = SystemTypeEnum.LINUX;
        this.sep = "/";
    }

    public String getIp() {
        return this.ip;
    }

    public void setIp(final String ip) {
        this.ip = ip;
    }

    public int getPort() {
        return this.port;
    }

    public void setPort(final int port) {
        this.port = port;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(final String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(final String path) {
        this.path = path;
    }

    public TransferTypeEnum getTransferType() {
        return this.transferType;
    }

    public void setTransferType(final TransferTypeEnum transferType) {
        this.transferType = transferType;
    }

    public SystemTypeEnum getSystemType() {
        return this.systemType;
    }

    public void setSystemType(final SystemTypeEnum systemType) {
        this.systemType = systemType;
        this.sep = "/";
        if (systemType.equals(SystemTypeEnum.WIN)) {
            this.sep = "\\";
        }
    }

    public boolean isLocale() {
        return this.locale;
    }

    public void setLocale(final boolean locale) {
        this.locale = locale;
    }

    public String getSep() {
        return this.sep;
    }

    public void setSep(final String sep) {
        this.sep = sep;
    }

    public HostDescriptor toHostDescriptor() {
        final HostDescriptor hostDescriptor = new HostDescriptor();
        hostDescriptor.setIp(this.getIp());
        hostDescriptor.setPort(this.getPort());
        hostDescriptor.setUserName(this.getUserName());
        hostDescriptor.setPassword(this.getPassword());
        return hostDescriptor;
    }
}