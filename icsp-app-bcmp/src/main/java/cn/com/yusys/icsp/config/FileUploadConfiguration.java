package cn.com.yusys.icsp.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

//Configuration
public class FileUploadConfiguration
{
//    @Value("${spring.servlet.multipart.max-file-size:300mb}")
//    private long allSize;
//    @Value("${spring.servlet.multipart.max-request-size:300mb}")
//    private long maxSize;

//    @Bean
//    public MultipartConfigElement multipartConfigElement() {
//        final MultipartConfigFactory factory = new MultipartConfigFactory();
//        factory.setMaxFileSize(DataSize.ofMegabytes(allSize));
//        factory.setMaxRequestSize(DataSize.ofMegabytes(maxSize));
//        return factory.createMultipartConfig();
//    }
}
