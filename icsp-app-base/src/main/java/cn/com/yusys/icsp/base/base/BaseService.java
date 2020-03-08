package cn.com.yusys.icsp.base.base;

import java.util.*;


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

    protected List<Map<String,Object>> changerList(List<Map<String,Object>> oldList){
        List<Map<String, Object>> newList = new ArrayList<Map<String, Object>>();
        for (Map<String, Object> map : oldList) {
            Map<String, Object> swMap = mapUnderscoreToCamelCase(map);
            newList.add(swMap);
        }
        return newList;
    }
    /**
     * 判断内容中是否包含指定的关键字
     *
     * @param content
     * @param key
     * @return
     */
    protected boolean containsKey(String content, String key) {
        if (content == null) {
            return false;
        }
        int index = content.indexOf(key);
        return (index != -1);
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