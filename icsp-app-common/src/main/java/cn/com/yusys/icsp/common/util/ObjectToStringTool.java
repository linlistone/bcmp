/**
 * Special Declaration: These technical material reserved as the technical 
 * secrets by Bankit TECHNOLOGY have been protected by the "Copyright Law" 
 * "ordinances on Protection of Computer Software" and other relevant 
 * administrative regulations and international treaties. Without the written 
 * permission of the Company, no person may use (including but not limited to 
 * the illegal copy, distribute, display, image, upload, and download) and 
 * disclose the above technical documents to any third party. Otherwise, any 
 * infringer shall afford the legal liability to the company.
 *
 * 特别声明：本技术材料受《中华人民共和国著作权法》、《计算机软件保护条例》
 * 等法律、法规、行政规章以及有关国际条约的保护，浙江宇信班克信息技术有限公
 * 司享有知识产权、保留一切权利并视其为技术秘密。未经本公司书面许可，任何人
 * 不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使
 * 用，不得向第三方泄露、透露、披露。否则，本公司将依法追究侵权者的法律责任。
 * 特此声明！
 *
 * Copyright(C) 2012 Bankit Tech, All rights reserved.
 */
package cn.com.yusys.icsp.common.util;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author T
 * @author 浙江宇信班克信息技术有限公司
 * @version 1.0.0
 */
public class ObjectToStringTool {

	public static final String config_appendType = "config_appendType";
	public static final String config_maxOneLineSize = "config_maxOneLineSize";

	public static final ThreadLocal<Map<String, Object>> config = new ThreadLocal<Map<String, Object>>() {
		@Override
		protected Map<String, Object> initialValue() {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put(config_appendType, false);
			map.put(config_maxOneLineSize, 1);
			return map;
		}
	};

	private static final ThreadLocal<Integer> level = new ThreadLocal<Integer>() {
		@Override
		protected Integer initialValue() {
			return null;
		}
	};

	public static String toString(Object obj) {
		boolean appendType = (Boolean) config.get().get(config_appendType);
		level.set(-1);
		StringBuilder sb = new StringBuilder();
		sb.append("\n");
		appendObject(sb, obj, appendType);
		if (level.get() != -1) {
			throw new RuntimeException("Illegal level=" + level.get());
		}
		level.remove();
		return sb.toString();
	}

	private static void upLevel() {
		level.set(level.get() + 1);
	}

	private static void downLevel() {
		level.set(level.get() - 1);
	}

	private static void appendTab(StringBuilder sb) {
		for (int i = 0, n = level.get(); i < n; i++) {
			sb.append("\t");
		}
	}

	private static void appendRN(StringBuilder sb) {
		sb.append("\r\n");
	}

	private static void appendObject(StringBuilder sb, Object obj,
			boolean appendType) {
		upLevel();
		if (obj instanceof Map) {
			appendMap(sb, (Map<?, ?>) obj, appendType);
		} else if (obj instanceof List) {
			appendList(sb, (List<?>) obj, appendType);
		} else if (obj instanceof Object[]) {
			appendArray(sb, (Object[]) obj, appendType);
		} else if (obj == null) {
			appendTab(sb);
			sb.append("null");
			appendRN(sb);
		} else {
			appendTab(sb);
			sb.append(obj);
			if (appendType) {
				sb.append("@[").append(obj.getClass()).append("]");
			}
			appendRN(sb);
		}
		downLevel();
	}

	public static void main(String[] args) throws Exception {
		Map<String, Object> commMap = new HashMap<String, Object>();
		commMap.put("ABC", "123");
		Map<String, Object> subMap = new HashMap<String, Object>();
		subMap.put("DDD", "111");
		commMap.put("dDD", subMap);
		System.out.println(toString(commMap));
	}

	private static void appendMap(StringBuilder sb, Map<?, ?> map,
			boolean appendType) {
		appendTab(sb);
		sb.append("Map:{").append("@[size=").append(map.size()).append("]");
		if (appendType) {
			sb.append("@[class=").append(map.getClass()).append("]");
		}
		appendRN(sb);
		int maxOneLineSize = (Integer) config.get().get(config_maxOneLineSize);
		int oneLineSize = 0;
		for (Object key : map.keySet()) {
			Object value = map.get(key);
			if (isBaseType(key) && isBaseType(value)) {
				if (oneLineSize == 0) {
					upLevel();
					appendTab(sb);
					downLevel();
				}
				sb.append(key);
				if (appendType) {
					sb.append("@[").append(key.getClass()).append("]");
				}
				sb.append("=");
				if (value!=null&&value.toString().length() > 100)
					sb.append(value.toString().substring(0, 100) + "...");
				else
					sb.append(value);
				if (appendType) {
					sb.append("@[").append(value.getClass()).append("]");
				}
				sb.append(", ");
				oneLineSize++;
				if (oneLineSize == maxOneLineSize) {
					appendRN(sb);
					oneLineSize = 0;
				}
			} else {
				if (oneLineSize != 0) {
					sb.setLength(sb.length() - 2);
					appendRN(sb);
				}
				appendObject(sb, key, appendType);
				if (isBaseType(key)) {
					sb.setLength(sb.length() - 2);
				}
				sb.append("=");
				appendRN(sb);
				appendObject(sb, value, appendType);
				oneLineSize = 0;
			}
		}
		if (oneLineSize != 0) {
			sb.setLength(sb.length() - 2);
			appendRN(sb);
		}
		appendTab(sb);
		sb.append("}");
		appendRN(sb);
	}

	private static void appendList(StringBuilder sb, List<?> list,
			boolean appendType) {
		appendTab(sb);
		sb.append("List:[").append("@[size=").append(list.size()).append("]");
		if (appendType) {
			sb.append("@[class=").append(list.getClass()).append("]");
		}
		appendRN(sb);
		int maxOneLineSize = (Integer) config.get().get(config_maxOneLineSize);
		int oneLineSize = 0;
		for (Object obj : list) {
			if (isBaseType(obj)) {
				if (oneLineSize == 0) {
					upLevel();
					appendTab(sb);
					downLevel();
				}
				sb.append(obj);
				if (appendType) {
					sb.append("@[").append(obj.getClass()).append("]");
				}
				sb.append(", ");
				oneLineSize++;
				if (oneLineSize == maxOneLineSize) {
					appendRN(sb);
					oneLineSize = 0;
				}
			} else {
				if (oneLineSize != 0) {
					sb.setLength(sb.length() - 2);
					appendRN(sb);
				}
				appendObject(sb, obj, appendType);
				oneLineSize = 0;
			}
		}
		if (oneLineSize != 0) {
			sb.setLength(sb.length() - 2);
			appendRN(sb);
		}
		appendTab(sb);
		sb.append("]");
		appendRN(sb);
	}

	private static void appendArray(StringBuilder sb, Object[] list,
			boolean appendType) {
		appendTab(sb);
		sb.append("Array:[").append("@[size=").append(list.length).append("]");
		if (appendType) {
			sb.append("@[class=").append(list.getClass()).append("]");
		}
		appendRN(sb);
		int maxOneLineSize = (Integer) config.get().get(config_maxOneLineSize);
		int oneLineSize = 0;
		for (Object obj : list) {
			if (isBaseType(obj)) {
				if (oneLineSize == 0) {
					upLevel();
					appendTab(sb);
					downLevel();
				}
				sb.append(obj);
				if (appendType) {
					sb.append("@[").append(obj.getClass()).append("]");
				}
				sb.append(", ");
				oneLineSize++;
				if (oneLineSize == maxOneLineSize) {
					appendRN(sb);
					oneLineSize = 0;
				}
			} else {
				if (oneLineSize != 0) {
					sb.setLength(sb.length() - 2);
					appendRN(sb);
				}
				appendObject(sb, obj, appendType);
				oneLineSize = 0;
			}
		}
		if (oneLineSize != 0) {
			sb.setLength(sb.length() - 2);
			appendRN(sb);
		}
		appendTab(sb);
		sb.append("]");
		appendRN(sb);
	}

	public static boolean isBaseType(Object obj) {
		if (obj == null) {
			return true;
		}
		Class<?> clazz = obj.getClass();
		if (clazz == String.class) {
			return true;
		}
		if (clazz.isPrimitive()) {
			return true;
		}
		if (clazz == Byte.class) {
			return true;
		} else if (clazz == Short.class) {
			return true;
		} else if (clazz == Integer.class) {
			return true;
		} else if (clazz == Long.class) {
			return true;
		} else if (clazz == Float.class) {
			return true;
		} else if (clazz == Double.class) {
			return true;
		} else if (clazz == Character.class) {
			return true;
		} else if (clazz == Boolean.class) {
			return true;
		} else if (CharSequence.class.isAssignableFrom(clazz)) {
			return true;
		} else if (java.util.Date.class.isAssignableFrom(clazz)) {
			return true;
		}
		return false;
	}

	public static Object replaceAll(Object src, Object match) {
		return replaceAll(src, match, null);
	}

	@SuppressWarnings("unchecked")
	private static Object replaceAll(Object src, Object match,
			Object replacement) {
		if (src instanceof Map) {
			Map<Object, Object> srcMap = (Map<Object, Object>) src;
			if (match instanceof Map) {
				Map<Object, Object> matchMap = (Map<Object, Object>) match;
				return replaceAll_map(srcMap, matchMap, replacement);
			}
		} else if (src instanceof List) {
			List<Object> srcList = (List<Object>) src;
			if (match instanceof List) {
				List<Object> matchList = (List<Object>) match;
				return replaceAll_list(srcList, matchList, replacement);
			}
		} else if (isBaseType(src)) {
			return match;
		}
		throw new RuntimeException("replaceAll FAIL ! src=" + src + " match="
				+ match + " replacement=" + replacement);
	}

	private static Map<Object, Object> replaceAll_map(
			Map<Object, Object> srcMap, Map<Object, Object> matchMap,
			Object replacement) {
		srcMap = new HashMap<Object, Object>(srcMap);
		for (Object matchKey : matchMap.keySet()) {
			if (srcMap.containsKey(matchKey)) {
				Object match = matchMap.get(matchKey);
				if (match == null) {
					continue;
				}
				Object src = srcMap.get(matchKey);
				srcMap.put(matchKey, replaceAll(src, match, replacement));
			}
		}
		return srcMap;
	}

	private static Object replaceAll_list(List<Object> srcList,
			List<Object> matchList, Object replacement) {
		srcList = new ArrayList<Object>(srcList);
		for (int i = 0, n = matchList.size(); i < n; i++) {
			Object match = matchList.get(i);
			if (match == null) {
				continue;
			}
			Object src = srcList.get(i);
			srcList.set(i, replaceAll(src, match, replacement));
		}
		return srcList;
	}

	public static String exceptionToString(Throwable t) {
		try {
			if (t == null) {
				return "null";
			}
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			PrintWriter pw = new PrintWriter(baos, true);
			t.printStackTrace(pw);
			return baos.toString("UTF-8");
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static String exceptionToShortString(Throwable t) {
		if (t == null) {
			return "null";
		}
		StringBuilder sb = new StringBuilder();
		sb.append(t.toString());
		if (t.getCause() != null) {
			sb.append("_@_");
			sb.append(t.getCause().toString());
		}
		return sb.toString();
	}

}
