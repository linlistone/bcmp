package cn.com.yusys.icsp.bcmp.constant;

/*
 *  @Description : 部署步骤枚举
 *  @Author : Mr_Jiang
 *  @Date : 2020/3/9 11:35
 */
public enum DeployStep {
    UNKNOWN("UNKNOWN"),

    正在准备环境("START"),

    准备环境完成("STEP_1"),

    开始上传文件("STEP_2"),

    文件上传成功("STEP_3"),

    开始解压文件("STEP_4"),

    解压文件完成("STEP_5"),

    开始重启服务("STEP_6"),

    重启服务完成("STEP_7"),

    开始写入版本("STEP_8"),

    版本写入完成("STEP_9"),

    文件部署结束("END");


    //当前部署的步骤
    private String step;

    DeployStep(String step) {
        this.step = step;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }
}
