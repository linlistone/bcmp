package cn.com.yusys.icsp.util;

import org.apache.commons.lang3.*;
import java.util.regex.*;
import java.io.*;
import java.util.*;

public final class StringUtil {
	public static final char CHAR_ZERROR = '0';
	private static final String CHAR_SPACE = " ";
	public static final int LEFT = 0;
	public static final int CENTER = 1;
	public static final int RIGHT = 2;
	
	
	public static final boolean isNullOrEmpty(final String str) {
		return StringUtils.isEmpty(str);
	}

	public static final boolean isEmpty(final CharSequence cs) {
		return StringUtils.isEmpty(cs);
	}

	public static final boolean isNotEmpty(final CharSequence cs) {
		return StringUtils.isNotEmpty(cs);
	}

	public static final boolean isBlank(final CharSequence cs) {
		return StringUtils.isBlank(cs);
	}

	public static final boolean isNotBlank(final CharSequence cs) {
		return StringUtils.isNotBlank(cs);
	}

	public static final boolean isStrEmpty(final CharSequence cs) {
		return isEmpty(cs) || "null".equals(cs);
	}

	public static final boolean isStrNotEmpty(final CharSequence cs) {
		return isNotEmpty(cs) && !"null".equals(cs);
	}

	public static final String substring(final String str, final int len) {
		return substring(str, 0, len);
	}

	public static final String substring(final String str, final int startIdx, final int len) {
		if (len <= 0 || startIdx < 0 || isEmpty(str)) {
			return "";
		}
		if (len > str.length() || len - startIdx > str.length()) {
			return str;
		}
		return str.substring(startIdx, startIdx + len);
	}

	public static final String[] split(final String str, final String regex) {
		if (isEmpty(str)) {
			return new String[0];
		}
		return str.split(regex, -1);
	}

	public static final String replaceObjNull(final Object object) {
		return Objects.nonNull(object) ? object.toString() : "";
	}

	public static final String replaceNullByObj(final Object object) {
		return replaceObjNull(object);
	}

	public static final String concat(final String[] strArray, final String str) {
		return concat(strArray, str, false);
	}

	public static final String concat(final String[] strArray, String str, final boolean isReturnNull) {
		if (Objects.nonNull(strArray) && strArray.length > 0) {
			str = replaceObjNull(str);
			final StringBuffer sb = new StringBuffer(strArray.length * 8);
			for (int i = 0; i < strArray.length; ++i) {
				if (isEmpty(strArray[i])) {
					if (isReturnNull) {
						sb.append(replaceObjNull(strArray[i])).append(str);
					}
				} else {
					sb.append(strArray[i]).append(str);
				}
			}
			final String returnStr = sb.toString();
			return substring(returnStr, returnStr.length() - str.length());
		}
		return "";
	}

	public static final String concat(final Collection<String> collections, final String str) {
		return concat(collections, str, false);
	}

	public static final String concat(final Collection<String> collections, final String str,
			final boolean isReturnNull) {
		if (Objects.isNull(collections)) {
			return "";
		}
		final String[] strArray = collections.toArray(new String[collections.size()]);
		return concat(strArray, str, isReturnNull);
	}

	public static final String fill(final char c, final int length) {
		return fill(Character.toString(c), length);
	}

	public static final String fill(final CharSequence cs, final int length) {
		return fill(cs, length, true);
	}

	public static final String fill(final CharSequence cs, final int length, final boolean isCutout) {
		if (length < 0) {
			return "";
		}
		final int actLength = (int) Math.ceil(length / cs.length());
		final StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < actLength; ++i) {
			sb.append(cs);
		}
		return isCutout ? substring(sb.toString(), length) : sb.toString();
	}

	public static final String fill(final String source, final char c, final int len) {
		return fill(source, c, len, 2);
	}

	public static final String fill(final String source, final char c, final int len, final int align) {
		return fill(source, Character.toString(c), len, align);
	}

	public static final String fill(final String source, final int len) {
		return fill(source, len, 2);
	}

	public static final String fill(final String source, final int len, final int align) {
		return fill(source, " ", len, align);
	}

	public static final String fill(final String source, final String str, final int length, final int align) {
		if (source == null || str == null) {
			return source;
		}
		if (source.length() > length) {
			return source;
		}
		final StringBuffer buffer = new StringBuffer();
		final String fillStr = fill(str, length - source.getBytes().length);
		switch (align) {
		case 0: {
			buffer.append(fillStr).append(source);
			break;
		}
		case 1: {
			final int centerIdx = source.length() / 2;
			buffer.append(substring(source, centerIdx)).append(fillStr)
					.append(substring(source, centerIdx, source.length() - centerIdx));
			break;
		}
		case 2: {
			buffer.append(source).append(fillStr);
			break;
		}
		default: {
			buffer.append(source);
			break;
		}
		}
		return buffer.toString();
	}

	public static final boolean equals(final String str1, final String str2) {
		return equals(str1, str2, false);
	}

	public static final boolean equals(final String str1, final String str2, final boolean ignoreCase) {
		return (str1 == null && str2 == null)
				|| (str1 != null && (ignoreCase ? str1.equalsIgnoreCase(str2) : str1.equals(str2)));
	}

	public static final boolean contains(final String[] strArray, final String str) {
		return contains(strArray, str, false);
	}

	public static final boolean contains(final String[] strArray, final String str, final boolean ignoreCase) {
		if (Objects.nonNull(strArray) && strArray.length > 0) {
			return Arrays.stream(strArray).anyMatch(s -> equals(s, str, ignoreCase));
		}
		return Objects.isNull(str);
	}

	public static final boolean contains(final Collection<String> collections, final String str) {
		return collections.contains(str);
	}

	public static final boolean contains(final Collection<String> collections, final String str,
			final boolean ignoreCase) {
		if (Objects.isNull(collections)) {
			return false;
		}
		if (ignoreCase) {
			final String[] strArray = collections.toArray(new String[collections.size()]);
			return contains(strArray, str, true);
		}
		return collections.contains(str);
	}

	public static final boolean isDoubleByte(final char c) {
		return c >>> 8 != '\0';
	}

	public static final boolean isChinese(final String str) {
		final Pattern pattern = Pattern.compile("[\u0391-\uffe5]+$");
		return pattern.matcher(str).matches();
	}

	public static boolean isNumeric(final CharSequence cs) {
		if (isEmpty(cs)) {
			return false;
		}
		for (int sz = cs.length(), i = 0; i < sz; ++i) {
			if (!Character.isDigit(cs.charAt(i))) {
				return false;
			}
		}
		return true;
	}

	public static final String toFixLength(final String str, int length) {
		if (str == null || length <= 0) {
			return "";
		}
		if (str.getBytes().length <= length) {
			return str;
		}
		final StringBuffer buff = new StringBuffer();
		int index = 0;
		length -= 3;
		while (length > 0) {
			final char c = str.charAt(index);
			length -= ((c < '\u0080') ? 1 : 2);
			buff.append(c);
			++index;
		}
		buff.append("...");
		return buff.toString();
	}

	public static final boolean isLetter(final String str) {
		if (str == null || str.length() < 0) {
			return false;
		}
		final Pattern pattern = Pattern.compile("[\\w\\.-_]*");
		return pattern.matcher(str).matches();
	}

	public static final boolean isEmail(final String email) {
		if (email == null || email.length() < 1 || email.length() > 256) {
			return false;
		}
		final Pattern pattern = Pattern.compile("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
		return pattern.matcher(email).matches();
	}

	public static final String trim(final String str) {
		return isEmpty(str) ? str : str.trim();
	}

	public static final String upperCase(final String str) {
		return StringUtils.upperCase(str);
	}

	public static final String lowerCase(final String str) {
		return StringUtils.lowerCase(str);
	}

	public static final String byte2String(final byte[] data) {
		return byte2String(data, false);
	}

	public static final String byte2String(final byte[] data, final boolean lowerCase) {
		if (data == null) {
			return null;
		}
		final StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < data.length; ++i) {
			String tmpStr = Integer.toHexString(data[i] & 0xFF);
			tmpStr = StringUtils.leftPad(tmpStr, 2, '0');
			buffer.append(tmpStr);
		}
		return lowerCase ? buffer.toString() : upperCase(buffer.toString());
	}

	public static final byte[] escString2Byte(final String strData) throws NumberFormatException {
		final byte[] srcData = strData.getBytes();
		final ByteArrayOutputStream baos = new ByteArrayOutputStream();
		for (int dataLength = srcData.length, i = 0; i < dataLength; ++i) {
			if (srcData[i] == 48 && dataLength >= i + 4 && (srcData[i + 1] == 120 || srcData[i + 1] == 88)) {
				baos.write((byte) Integer.parseInt(new String(srcData, i + 2, 2), 16));
				i += 3;
			} else if (srcData[i] == 92) {
				if (i + 1 >= dataLength) {
					throw new IllegalArgumentException("\u5b57\u7b26\u4e32\u4e0d\u5408\u6cd5\uff1a[" + strData + "]");
				}
				switch (srcData[i + 1]) {
				case 114: {
					baos.write(13);
					break;
				}
				case 116: {
					baos.write(9);
					break;
				}
				case 110: {
					baos.write(10);
					break;
				}
				case 98: {
					baos.write(8);
					break;
				}
				case 102: {
					baos.write(12);
					break;
				}
				case 39: {
					baos.write(39);
					break;
				}
				case 34: {
					baos.write(34);
					break;
				}
				case 92: {
					baos.write(92);
					break;
				}
				case 48: {
					baos.write(0);
					break;
				}
				default: {
					throw new IllegalArgumentException("\u5b57\u7b26\u4e32\u4e0d\u5408\u6cd5\uff1a[" + strData + "]");
				}
				}
				++i;
			} else {
				baos.write(srcData[i]);
			}
		}
		return baos.toByteArray();
	}

	public static final String exception2String(final Exception e) {
		if (e == null) {
			return null;
		}
		final ByteArrayOutputStream os = new ByteArrayOutputStream();
		e.printStackTrace(new PrintStream(os));
		final byte[] msg = os.toByteArray();
		try {
			os.close();
		} catch (IOException ex) {
		}
		return new String(msg);
	}

	public static final String getBlankStr(final char c, final int length) {
		return getBlankStr(Character.toString(c), length);
	}

	public static final String getBlankStr(final int length) {
		return getBlankStr(" ", length);
	}

	public static final String getBlankStr(final String str, final int length) {
		return getBlankStr(str, length, false);
	}

	public static final String getBlankStr(String str, final int length, final boolean isCutout) {
		if (isEmpty(str)) {
			str = " ";
		}
		return fill((CharSequence) str, length, isCutout);
	}

	public static final String toString(final Object obj) {
		return (String) (Objects.isNull(obj) ? obj
				: (obj.getClass().isArray()
						? ((obj instanceof byte[]) ? new String((byte[]) obj) : Arrays.toString((Object[]) obj))
						: obj.toString()));
	}

	public static final String getUUID() {
		return UUID.randomUUID().toString().replace("-", "").toUpperCase();
	}

	public static final String replaceNRT(final String str) {
		return isNotEmpty(str) ? Pattern.compile("\n*|\t|\r").matcher(str.replaceAll("  ", "")).replaceAll("") : null;
	}

	public static final String hump2Underline(final String str) {
		if (isEmpty(str)) {
			return str;
		}
		final StringBuffer buffer = new StringBuffer();
		for (int i = 0; i < str.length(); ++i) {
			if (Character.isUpperCase(str.charAt(i))) {
				buffer.append("_");
			}
			buffer.append((Object) str.charAt(i));
		}
		final String rtnStr = lowerCase(buffer.toString());
		return rtnStr.startsWith("_") ? rtnStr.substring(1) : rtnStr;
	}

	public static final String underline2Hump(String str) {
		if (isEmpty(str)) {
			return str;
		}
		final StringBuffer tmpStr = new StringBuffer("");
		tmpStr.append(str.substring(0, 1));
		str = str.substring(1);
		while (str.indexOf("_") > 0) {
			tmpStr.append(str.substring(0, str.indexOf("_")));
			if (str.substring(str.indexOf("_")).equals("_")) {
				str = "";
			} else {
				str = str.substring(str.indexOf("_") + 1, str.indexOf("_") + 2).toUpperCase()
						+ str.substring(str.indexOf("_") + 2);
			}
		}
		tmpStr.append(str);
		return tmpStr.toString();
	}

	public static final String rightFillZero(final int sz) {
		return (sz < 10) ? ("0" + String.valueOf(sz)) : String.valueOf(sz);
	}

	public static final String stringEncode(final String str, final String srcCharset, final String targetCharset) {
		if (isEmpty(str)) {
			return str;
		}
		try {
			return new String(str.getBytes(srcCharset), targetCharset);
		} catch (Exception ex) {
			return str;
		}
	}

	public static final Map<String, String> string2Map(final String mapStr) {
		final Map<String, String> map = new HashMap<String, String>();
		final String[] split;
		final String[] entrys = split = split(mapStr, ",");
		for (final String entry : split) {
			final String[] strs = split(trim(entry), "=");
			if (strs.length > 1) {
				map.put(strs[0].trim(), strs[1].trim());
			}
		}
		return map;
	}

	public static final byte[] escapeStringToCharArray(final byte[] str) {
		final ByteArrayOutputStream bout = new ByteArrayOutputStream();
		for (int i = 0; i < str.length; ++i) {
			switch (str[i]) {
			case 10: {
				bout.write(92);
				bout.write(110);
				break;
			}
			case 9: {
				bout.write(92);
				bout.write(116);
				break;
			}
			case 13: {
				bout.write(92);
				bout.write(114);
				break;
			}
			case 12: {
				bout.write(92);
				bout.write(102);
				break;
			}
			case 0: {
				bout.write(92);
				bout.write(48);
				break;
			}
			case 34: {
				bout.write(92);
				bout.write(34);
				break;
			}
			case 8: {
				bout.write(92);
				bout.write(98);
				break;
			}
			case 92: {
				bout.write(92);
				bout.write(92);
				break;
			}
			default: {
				bout.write(str[i]);
				break;
			}
			}
		}
		return bout.toByteArray();
	}

	public static boolean isUppercaseAlpha(final char c) {
		return c >= 'A' && c <= 'Z';
	}

	public static boolean isLowercaseAlpha(final char c) {
		return c >= 'a' && c <= 'z';
	}

	public static char toLowerAscii(char c) {
		if (isUppercaseAlpha(c)) {
			c += ' ';
		}
		return c;
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
}
