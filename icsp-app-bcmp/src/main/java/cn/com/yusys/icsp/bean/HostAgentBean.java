package cn.com.yusys.icsp.bean;

import cn.com.yusys.icsp.domain.BcmpSmAgent;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;

/*
 *  @Description : 服务器集群主机详细信息Bean
 *  @Author : Mr_Jiang
 *  @Date : 2020/3/5 14:21
 */
public class HostAgentBean {
    //主机信息
    private BcmpSmHostinfo bcmpSmHostinfo;
    //节点信息
    private BcmpSmNodeinfo bcmpSmNodeinfo;
    //Agent代理信息
    private BcmpSmAgent bcmpSmAgent;

    public HostAgentBean() {
    }

    public HostAgentBean(BcmpSmHostinfo bcmpSmHostinfo, BcmpSmNodeinfo bcmpSmNodeinfo, BcmpSmAgent bcmpSmAgent) {
        this.bcmpSmHostinfo = bcmpSmHostinfo;
        this.bcmpSmNodeinfo = bcmpSmNodeinfo;
        this.bcmpSmAgent = bcmpSmAgent;
    }

    public BcmpSmNodeinfo getBcmpSmNodeinfo() {
        return bcmpSmNodeinfo;
    }

    public void setBcmpSmNodeinfo(BcmpSmNodeinfo bcmpSmNodeinfo) {
        this.bcmpSmNodeinfo = bcmpSmNodeinfo;
    }

    public BcmpSmHostinfo getBcmpSmHostinfo() {
        return bcmpSmHostinfo;
    }

    public void setBcmpSmHostinfo(BcmpSmHostinfo bcmpSmHostinfo) {
        this.bcmpSmHostinfo = bcmpSmHostinfo;
    }

    public BcmpSmAgent getBcmpSmAgent() {
        return bcmpSmAgent;
    }

    public void setBcmpSmAgent(final BcmpSmAgent bcmpSmAgent) {
        this.bcmpSmAgent = bcmpSmAgent;
    }

    @Override
    public String toString() {
        return "HostAgentBean{" +
                "bcmpSmNodeinfo=" + bcmpSmNodeinfo.toString() +
                ", bcmpSmHostinfo=" + bcmpSmHostinfo.toString() +
                ", bcmpSmAgent=" + bcmpSmAgent.toString() +
                '}';
    }


}
