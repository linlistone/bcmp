package cn.com.yusys.icsp.bcmp;

import cn.com.yusys.icsp.agent.AgentClient;
import cn.com.yusys.icsp.exception.BcmpException;

public class BcmpOptionsFactory {
    final static String defaultType = "agent";

    public static BcmpOptions getBcmpOptions(HostDescriptor hostDescriptor) throws BcmpException {
        BcmpOptions bcmpOptions = null;
        if ("agent".equals(defaultType)) {
            bcmpOptions = new AgentClient(hostDescriptor);
        }
        return bcmpOptions;
    }
}
