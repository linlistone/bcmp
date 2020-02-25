package cn.com.yusys.icsp.common.util;

import org.springframework.core.env.*;

import java.net.*;
import java.util.*;
import java.text.*;

import org.slf4j.*;

public class AppStartMessageUtil {
    private static final Logger logger=  LoggerFactory.getLogger(AppStartMessageUtil.class);

    public static String updServiceStartMessage(final Environment env) {
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        final String serviceName = env.getProperty("spring.application.name");
        final String port = env.getProperty("server.port");
        String ip = "Unkown";
        try {
            ip = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            AppStartMessageUtil.logger.warn("获取绑定IP信息异常,将使用缺省IP配置[{}]", (Object) ip);
            e.printStackTrace();
        }
        final String[] profiles = env.getActiveProfiles();
        final String configServerStatus = env.getProperty("configserver.status");
        return updServiceStartMessage(serviceName, protocol, port, ip, profiles, configServerStatus);
    }

    public static String updServiceStartMessage(final String serviceName, final String protocol, final String port, final String ip, final String[] profiles, String configServerStatus) {
        String msg = "\n" +
                "----------------------------------------------------------\n" +
                "\tApplication [{0}] is running! Access URLs:\n" +
                "\tLocal:    \t{1}://localhost:{2}\n" +
                "\tExternal: \t{1}://{3}:{2}\n" +
                "\tProfile(s): \t{4}\n" +
                "----------------------------------------------------------\n" +
                "\tConfig Server: \t{5}\n" +
                "----------------------------------------------------------";
        configServerStatus = ((configServerStatus == null) ? "Not found or not setup for this application" : configServerStatus);
        msg = MessageFormat.format(msg, serviceName, protocol, port, ip, Arrays.toString(profiles), configServerStatus);
        return msg;
    }


}
