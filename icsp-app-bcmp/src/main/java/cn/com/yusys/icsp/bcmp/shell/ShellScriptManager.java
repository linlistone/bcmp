package cn.com.yusys.icsp.bcmp.shell;

import cn.com.yusys.icsp.common.exception.ICSPException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

/**
 * shell管理器
 *
 * @author 江成
 * @author 林立
 */
public class ShellScriptManager {

    private static Logger logger = LoggerFactory.getLogger(ShellScriptManager.class);


    /**
     * 编码
     */
    private static String ENCODING = "UTF-8";

    /**
     * 获取脚本
     *
     * @param os
     * @param name
     * @return
     */
    public static String getScript(String os, String name, String... args) throws Exception {
        String dir = "scripts/linux/";
        if ("AIX".equalsIgnoreCase(os)) {
            dir = "scripts/aix/";
        }
        StringBuilder sb = new StringBuilder();
        // 输入流
        BufferedReader reader = null;
        try {
            //File file = ResourceUtils.getFile(dir + name);
            Resource scripts = new ClassPathResource(dir + name);
            //File file = scripts.getFile();
            //logger.debug("======>" + file.getAbsolutePath());
            reader = new BufferedReader(new InputStreamReader(scripts.getInputStream(), ENCODING));
            // 读取内容
            String line = null;
            while ((line = reader.readLine()) != null) {
                // 去掉空格
                String item = line.trim();
                if (item.length() > 0) {
                    char preChar = item.charAt(0);
                    if (preChar == '#') {
                        continue;
                    }
                }
                sb.append(line);
                sb.append("\n");
            }
        } catch (Exception e) {
            throw new ICSPException("脚本读取失败" + name + " " + e.getMessage(), e);
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (Exception e) {
                    // do nothing
                }
            }
        }
        String script = sb.toString();
        if (args != null && args.length > 0) {
            // 替换参数
            for (int i = 0; i < args.length; i++) {
                script = script.replace("=$" + (i + 1),"="+ args[i]);
            }
        }
        return script;
    }

    /**
     * 获取命令
     *
     * @param os
     * @param name
     * @return
     */
    public static String[] getCommands(String os, String name, String... args) throws Exception {
        String script = getScript(os, name, args);
        String[] commands = script.split("\n");
        return commands;
    }
}
