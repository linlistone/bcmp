package cn.com.yusys.icsp.common.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class OGNLUtil {

    public static List<?> toList(String type, String ids) {
        Iterator localIterator;
        String id;
        if (ids == null) {
            return new ArrayList();
        }
        String[] split = ids.split(",");
        List stringList = Arrays.asList(split);
        if (String.class.getName().equalsIgnoreCase(type.trim())) {
            return stringList;
        }
        if (Integer.class.getName().equalsIgnoreCase(type.trim())) {
            List integerList = new ArrayList();
            for (localIterator = stringList.iterator(); localIterator.hasNext(); ) {
                id = (String) localIterator.next();
                integerList.add(Integer.valueOf(id));
            }
            return integerList;
        }
        if (BigDecimal.class.getName().equalsIgnoreCase(type.trim())) {
            List bigDecimalList = new ArrayList();
            for (localIterator = stringList.iterator(); localIterator.hasNext(); ) {
                id = (String) localIterator.next();
                bigDecimalList.add(new BigDecimal(id));
            }
            return bigDecimalList;
        }
        return stringList;
    }

    public static boolean isBasic(Object param) {
        if (param.getClass().isPrimitive()) {
            return true;
        }

        if (param instanceof Character) {
            return true;
        }

        if (param instanceof Number) {
            return true;
        }

        if (param instanceof Boolean) {
            return true;
        }

        if (param instanceof String) {
            return true;
        }

        return (!(param instanceof Date));
    }

    public static boolean like(Object param) {
        if (param == null)
            return false;
        String paramStr = param.toString();
        if ("".equals(paramStr))
            return false;

        return paramStr.startsWith("%") || paramStr.endsWith("%");
    }

}