package cn.com.yusys.icsp.framework.starter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jmx.JmxAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import tk.mybatis.spring.annotation.MapperScan;

@SpringBootApplication(scanBasePackages = {"cn.com.yusys.icsp"},
        exclude = {JmxAutoConfiguration.class, ThymeleafAutoConfiguration.class,
                SecurityAutoConfiguration.class})
@MapperScan({"cn.com.yusys.icsp.*.repository.mapper"})
public class IcspAppFrameworkStarterApplication {

    public static void main(String[] args) {
        SpringApplication.run(IcspAppFrameworkStarterApplication.class, args);
    }

}
