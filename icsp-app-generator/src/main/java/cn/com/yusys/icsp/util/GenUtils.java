package cn.com.yusys.icsp.util;

import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.FreemarkerUtil;
import cn.com.yusys.icsp.domain.ColumnEntity;
import cn.com.yusys.icsp.domain.TableEntity;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.WordUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;


/**
 * 代码生成器 工具类
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年12月19日 下午11:40:24
 */
public class GenUtils {

    private final Logger logger = LoggerFactory.getLogger(GenUtils.class);

    public static List<String> getTemplates() {
        List<String> templates = new ArrayList<String>();
        templates.add("Domain.java.vm");
        templates.add("Mapper.java.vm");
        templates.add("Mapper.xml.vm");
        templates.add("Service.java.vm");
//		templates.add("ServiceImpl.java.vm");
        templates.add("Resource.java.vm");
//		templates.add("menu.sql.vm");
        templates.add("index.html.vm");
        templates.add("index.js.vm");
        templates.add("Service.xml.vm");
        return templates;
    }

    /**
     * 生成代码
     *
     * @throws Exception
     */
    public static void generatorCode(String createType, String moduleName,
                                     Map<String, String> table, List<Map<String, String>> columns,
                                     ZipOutputStream zip) throws Exception {
        // 配置信息
        Properties config = getConfig();
        boolean hasBigDecimal = false;
        // 表信息
        TableEntity tableEntity = new TableEntity();
        tableEntity.setTableName(table.get("tableName"));
        tableEntity.setComments(table.get("tableComment"));
        // 表名转换成Java类名
        String className = tableToJava(tableEntity.getTableName(),
                config.getProperty("tablePrefix"));
        tableEntity.setClassName(className);
        tableEntity.setClassname(StringUtils.uncapitalize(className));

        // 列信息
        List<ColumnEntity> columsList = new ArrayList<>();
        for (Map<String, String> column : columns) {
            ColumnEntity columnEntity = new ColumnEntity();
            columnEntity.setColumnName(column.get("columnName"));
            columnEntity.setDataType(column.get("dataType").toUpperCase());
            columnEntity.setComments(column.get("columnComment"));
            columnEntity.setExtra(column.get("extra"));
            // 列名转换成Java属性名
            String attrName = columnToJava(columnEntity.getColumnName());
            columnEntity.setAttrName(attrName);
            columnEntity.setAttrname(StringUtils.uncapitalize(attrName));
            // 列的数据类型，转换成Java类型
            String attrType = config.getProperty(columnEntity.getDataType(),
                    "unknowType");
            columnEntity.setAttrType(attrType);
            if (!hasBigDecimal && attrType.equals("BigDecimal")) {
                hasBigDecimal = true;
            }
            // 是否主键
            if ("PRI".equalsIgnoreCase(column.get("columnKey"))
                    && tableEntity.getPk() == null) {
                tableEntity.setPk(columnEntity);
            }
            columsList.add(columnEntity);
        }
        tableEntity.setColumns(columsList);
        // 没主键，则第一个字段为主键
        if (tableEntity.getPk() == null) {
            tableEntity.setPk(tableEntity.getColumns().get(0));
        }
        String mainPath = config.getProperty("mainPath");
        mainPath = StringUtils.isBlank(mainPath) ? "io.renren" : mainPath;
        // 封装模板数据
        Map<String, Object> map = new HashMap<>();
        map.put("tableName", tableEntity.getTableName());
        map.put("comments", tableEntity.getComments());
        map.put("pk", tableEntity.getPk());
        map.put("className", tableEntity.getClassName());
        map.put("classname", tableEntity.getClassname());
        map.put("pathName", tableEntity.getClassname().toLowerCase());
        map.put("columns", tableEntity.getColumns());
        map.put("hasBigDecimal", hasBigDecimal);
        map.put("mainPath", mainPath);
        map.put("package", config.getProperty("package"));
        map.put("moduleName", moduleName);
        map.put("author", config.getProperty("author"));
        map.put("email", config.getProperty("email"));
        map.put("datetime", formatDate());
        map.put("QueryModel", QueryModel.class.getName());
        // 获取模板列表
        List<String> templates = getTemplates();
        for (String template : templates) {
            // 渲染模板
            String content = FreemarkerUtil.generate(createType + File.separator + template, map);
            try {
                // 添加到zip
                String fileName = getFileName(template,
                        tableEntity.getClassName(),
                        config.getProperty("package"),
                        moduleName);
                if (fileName == null)
                    continue;
                zip.putNextEntry(new ZipEntry(fileName));
                IOUtils.write(content, zip, "UTF-8");
                zip.closeEntry();
            } catch (IOException e) {
                throw new Exception("渲染模板失败，表名：" + tableEntity.getTableName(),
                        e);
            }
        }
    }

    public static String formatDate() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return df.format(new Date());
    }

    /**
     * 列名转换成Java属性名
     */
    public static String columnToJava(String columnName) {
        return WordUtils.capitalizeFully(columnName, new char[]{'_'})
                .replace("_", "");
    }

    /**
     * 表名转换成Java类名
     */
    public static String tableToJava(String tableName, String tablePrefix) {
        if (StringUtils.isNotBlank(tablePrefix)) {
            tableName = tableName.replaceFirst(tablePrefix, "");
        }
        return columnToJava(tableName);
    }


    /**
     * 获取配置信息
     */
    public static Properties getConfig() {
        try {
            //File file = ResourceUtils.getFile("generator.properties");
            Resource resource = new ClassPathResource("generator.properties");
            Properties properties = new Properties();
            properties.load(resource.getInputStream());
            return properties;
        } catch (Exception e) {
            throw new ICSPException("获取配置文件失败，", e);
        }
    }

    /**
     * 获取文件名
     */
    public static String getFileName(String template, String className,
                                     String packageName, String moduleName) {
        String packagePath = "main" + File.separator + "java" + File.separator;
        if (StringUtils.isNotBlank(packageName)) {
            packagePath += packageName.replace(".", File.separator)
                    + File.separator + moduleName + File.separator;
        }
        if (template.contains("Domain.java.vm")) {
            return packagePath + "domain" + File.separator + className
                    + ".java";
        }
        if (template.contains("Mapper.java.vm")) {
            return packagePath + "repository" + File.separator + "mapper" + File.separator + className
                    + "Mapper.java";
        }
        if (template.contains("Service.java.vm")) {
            return packagePath + "service" + File.separator + className
                    + "Service.java";
        }
        // if (templates.contains("ServiceImpl.java.vm")) {
        // return packagePath + "service" + File.separator + "impl"
        // + File.separator + className + "ServiceImpl.java";
        // }
        if (template.contains("Resource.java.vm")) {
            return packagePath + "rest" + File.separator + "web" + File.separator + className
                    + "Resource.java";
        }
        if (template.contains("Mapper.xml.vm")) {
            return "main" + File.separator + "resources" + File.separator
                    + "mapper" + File.separator + moduleName + File.separator
                    + className + "Mapper.xml";
        }
        if (template.contains("Service.xml.vm")) {
            return "main" + File.separator + "java" + File.separator
                    + "service" + File.separator + "adminsm-service.xml";
        }
        if (template.contains("menu.sql.vm")) {
            return className.toLowerCase() + "_menu.sql";
        }
        String fileName = className.toLowerCase().substring(moduleName.length() + 1);
        if (template.contains("index.html.vm")) {
            return "main" + File.separator + "resources" + File.separator
                    + "src" + File.separator + "views" + File.separator
                    + "modules" + File.separator + fileName + File.separator
                    + fileName + ".html";
        }
        if (template.contains("index.js.vm")) {
            return "main" + File.separator + "resources" + File.separator
                    + "src" + File.separator + "views" + File.separator
                    + "modules" + File.separator + fileName + File.separator
                    + fileName + ".js";
        }
        return null;
    }
}