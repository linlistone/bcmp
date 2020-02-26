package cn.com.yusys.icsp.framework.starter;

import cn.com.yusys.icsp.common.util.AppStartMessageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import org.springframework.core.env.Environment;
import tk.mybatis.spring.annotation.MapperScan;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication(scanBasePackages = {"cn.com.yusys.icsp"},
        exclude = {JmxAutoConfiguration.class, ThymeleafAutoConfiguration.class,
                SecurityAutoConfiguration.class})
@MapperScan({"cn.com.yusys.icsp.repository.mapper"})
public class IcspAppFrameworkStarterApplication {
    private static final Logger logger = LoggerFactory.getLogger(IcspAppFrameworkStarterApplication.class);

    public static void main(String[] args) {
        String ip="Unkown";
        try {
             ip = InetAddress.getLocalHost().getHostAddress();
        } catch (UnknownHostException e) {
            logger.warn("获取绑定IP信息异常,将使用缺省IP配置[{}]", (Object) ip);
        }
        MDC.put("ip",ip);
        // SpringApplication.run(IcspAppFrameworkStarterApplication.class, args);
        Environment env = SpringApplication.run(IcspAppFrameworkStarterApplication.class, args).getEnvironment();
        logger.info(AppStartMessageUtil.updServiceStartMessage(env));
    }

}
