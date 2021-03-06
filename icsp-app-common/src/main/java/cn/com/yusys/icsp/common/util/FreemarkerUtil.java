package cn.com.yusys.icsp.common.util;

import freemarker.template.Configuration;
import freemarker.template.ObjectWrapper;
import freemarker.template.Template;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;

import java.io.BufferedWriter;
import java.io.File;
import java.io.StringWriter;
import java.util.Map;


public class FreemarkerUtil {
    private static Logger logger = LoggerFactory.getLogger(FreemarkerUtil.class);
    /**
     * Generate html string.
     *
     * @param templateName  the name of freemarker teamlate.
     * @param variables the data of teamlate.
     * @return htmlStr
     * @throws Exception
     */
    public static String generate(String templateName, Map<String, Object> variables)
            throws Exception {
        //创建一个Configuration对象
        Configuration configuration = new Configuration(Configuration.getVersion());
        //File file = ResourceUtils.getFile("templates");
        //Resource resouce=new ClassPathResource("templates");
        //File file=resouce.getFile();
        //logger.debug(file.getAbsolutePath());
        //设置模板文件所在的路径
        configuration.setClassForTemplateLoading(FreemarkerUtil.class, "/templates");
        //设置模板文件所使用的字符集，一般是utf-8
        configuration.setDefaultEncoding("utf-8");
        //加载一个模板，创建一个模板对象
        Template template = configuration.getTemplate(templateName);
        StringWriter stringWriter = new StringWriter();
        BufferedWriter writer = null;
        try {
            writer = new BufferedWriter(stringWriter);
            template.process(variables, writer);
            writer.flush();
        } finally {
            if (writer != null)
                writer.close();
        }
        return stringWriter.toString();
    }

}