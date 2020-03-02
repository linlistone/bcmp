package cn.com.yusys.icsp.util;

import java.lang.reflect.Field;
import java.net.InetAddress;
import java.util.Arrays;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class AgentUtil {
	private static final Logger logger = LoggerFactory.getLogger(AgentUtil.class);

	public static String getHostAddress() throws RuntimeException {
		try {
			return InetAddress.getLocalHost().getHostAddress();
		} catch (Exception e) {
			logger.error("\u83b7\u53d6\u5f53\u524d\u5730\u5740\u51fa\u73b0\u5f02\u5e38!");
			throw new RuntimeException("\u83b7\u53d6\u5f53\u524d\u5730\u5740\u51fa\u73b0\u5f02\u5e38!");
		}
	}

	public static String getHostName() throws RuntimeException {
		try {
			return InetAddress.getLocalHost().getHostName();
		} catch (Exception e) {
			logger.error("\u83b7\u53d6\u5f53\u524d\u4e3b\u673a\u540d\u51fa\u73b0\u5f02\u5e38!");
			throw new RuntimeException("\u83b7\u53d6\u5f53\u524d\u4e3b\u673a\u540d\u51fa\u73b0\u5f02\u5e38!");
		}
	}

	public static final Field getField(final Object object, final String name) {
		try {
			if (Objects.nonNull(object)) {
				return object.getClass().getDeclaredField(name);
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return null;
	}

	public static final void setObjectFieldValue(final Object object, final Field field, final Object value) {
		if (Objects.isNull(object) || Objects.isNull(field)) {
			return;
		}
		final boolean isAccessible = field.isAccessible();
		try {
			if (!isAccessible) {
				field.setAccessible(true);
			}
			field.set(object, value);
		} catch (Exception e) {
			logger.error(e.getMessage());
		} finally {
			if (!isAccessible) {
				field.setAccessible(false);
			}
		}
	}

	public static String builder(final int capacity, final Object... objects) {
		final StringBuilder builder = new StringBuilder((capacity > 0) ? capacity : 100);
		if (Objects.nonNull(objects)) {
			Arrays.stream(objects).forEach(s -> builder.append(s));
		}
		return builder.toString();
	}

	public static String buffer(final int capacity, final Object... objects) {
		final StringBuffer buffer = new StringBuffer((capacity > 0) ? capacity : 100);
		if (Objects.nonNull(objects)) {
			Arrays.stream(objects).forEach(s -> buffer.append(s));
		}
		return buffer.toString();
	}

	public static String rmDir(final String dir) {
		return "rm -rf " + dir;
	}

	public static String[] rmFiles(final String[] fileNames) {
		final String[] shells = new String[fileNames.length];
		for (int i = 0; i < fileNames.length; ++i) {
			shells[i] = "rm -f " + fileNames[i];
		}
		return shells;
	}

	public static String leftPad(final String str, final int length, final char ch) {
		if (str.length() >= length) {
			return str;
		}
		final char[] chs = new char[length];
		Arrays.fill(chs, ch);
		final char[] src = str.toCharArray();
		System.arraycopy(src, 0, chs, length - src.length, src.length);
		return new String(chs);
	}

}
