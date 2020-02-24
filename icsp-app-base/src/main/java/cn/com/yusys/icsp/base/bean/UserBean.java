package cn.com.yusys.icsp.base.bean;

public class UserBean {
    private String userId;

    private String userName;

    private String userCode;

    private String orgId;

    private String userPassword;

    private String userSts;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }


    public String getUserSts() {
        return userSts;
    }

    public void setUserSts(String userSts) {
        this.userSts = userSts;
    }

    public String toString() {
        return "UserBean [userId:" + this.userId + " userName:" + this.userName + " userCode:" + this.userCode +
                " orgId:" + this.orgId + " userPassword:" + this.userPassword + " userSts:" + this.userSts+"]";
    }
}
