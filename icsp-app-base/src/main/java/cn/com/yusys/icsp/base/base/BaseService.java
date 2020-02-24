package cn.com.yusys.icsp.base.base;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


public abstract class BaseService {

    private static final char UNDERLINE = '_';

    /**
     *
     */
    public BaseService() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * 获取用户信息
     *
     * @return
     * @throws Exception
     */
    protected String createUUId() throws Exception {

        return UUID.randomUUID().toString().replace("-", "");
    }

    /**
     * ava字符串下划线转驼峰
     *
     * @param map
     * @return
     */
    protected Map<String, Object> mapUnderscoreToCamelCase(Map<String, Object> map) {
        Map<String, Object> retMap = new HashMap<String, Object>();
        for (String key : map.keySet()) {
            retMap.put(underlineToCamel(key), map.get(key));
        }
        return retMap;
    }

    /**
     * 下划线 转 驼峰
     *
     * @param param
     * @return
     */
    private String underlineToCamel(String param) {
        if (param == null || "".equals(param.trim())) {
            return "";
        }
        int len = param.length();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            char c = Character.toLowerCase(param.charAt(i));
            if (c == UNDERLINE) {
                if (++i < len) {
                    sb.append(Character.toUpperCase(param.charAt(i)));
                }
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }


}