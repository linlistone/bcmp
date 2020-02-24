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
 * Copyright(C) 2011 Bankit Tech, All rights reserved.
 *
 */
package cn.com.yusys.icsp.common.util;

import java.util.List;
import java.util.Map;

/**
 * String工具类
 * 
 */
public class StringUtilEx {
	/**
	 * 将数组整合成字符串
	 * 
	 * @param strArr targetString数组
	 * @param split  分隔符
	 * @return 组合结果
	 */
	public static String join(String[] strArr, String split) {
		if (strArr == null)
			return "";
		String _str = "";
		for (int i = 0; i < strArr.length; i++) {
			if (_str.equals(""))
				_str = strArr[i];
			else
				_str = String.format("%s%s%s", _str, split, strArr[i]);
		}
		return _str;
	}

	/**
	 * 用特定字符填充字符串
	 * 
	 * @param sSrc  要填充的字符串
	 * @param ch    用于填充的特定字符
	 * @param nLen  要填充到的长度
	 * @param bLeft 要填充的方向：true:左边；false:右边
	 * @return 填充好的字符串
	 */
	public static String fill(String sSrc, char ch, int nLen, boolean bLeft) {
		byte[] bTmp = trimnull(sSrc.getBytes());
		sSrc = new String(bTmp);
		if (sSrc == null || sSrc.equals("")) {
			StringBuffer sbRet = new StringBuffer();
			for (int i = 0; i < nLen; i++)
				sbRet.append(ch);

			return sbRet.toString();
		}
		byte[] bySrc = sSrc.getBytes();
		int nSrcLen = bySrc.length;
		if (nSrcLen >= nLen) {
			return sSrc;
		}
		byte[] byRet = new byte[nLen];
		if (bLeft) {
			for (int i = 0, n = nLen - nSrcLen; i < n; i++)
				byRet[i] = (byte) ch;
			for (int i = nLen - nSrcLen, n = nLen; i < n; i++)
				byRet[i] = bySrc[i - nLen + nSrcLen];
		} else {
			for (int i = 0, n = nSrcLen; i < n; i++)
				byRet[i] = bySrc[i];
			for (int i = nSrcLen, n = nLen; i < n; i++)
				byRet[i] = (byte) ch;
		}
		return new String(byRet);
	}

	/**
	 * 去掉字符串两头的空值
	 * 
	 * @param byRet 要去除的字符串
	 * @return 去除好的字符串
	 */
	public static byte[] trimnull(byte[] byRet) {
		int startPos = 0;
		int endPos = byRet.length - 1;
		for (int i = 0; i < byRet.length; i++) {
			if (byRet[i] != 0) {
				startPos = i;
				break;
			}
			if (i == (byRet.length - 1) && byRet[i] == 0) {
				return null;
			}
		}
		for (int i = byRet.length - 1; i >= 0; i--) {
			if (byRet[i] != 0) {
				endPos = i;
				break;
			}
		}
		byte[] byTmp = new byte[endPos - startPos + 1];
		System.arraycopy(byRet, startPos, byTmp, 0, endPos - startPos + 1);
		return byTmp;
	}

	/**
	 * 如果字符串为null或者空格那么返回真
	 * 
	 * @param str 要判断的字符串
	 * @return 是否符合
	 */
	public static boolean isNullOrWhiteSpace(String str) {
		if (isNullOrEmpty(str))
			return true;

		if (str.trim().isEmpty())
			return true;

		return false;
	}

	/**
	 * 如果字符串为null或者空字符串那么返回真
	 * 
	 * @param str 要判断的字符串
	 * @return 是否符合
	 */
	public static boolean isNullOrEmpty(String str) {
		if (str == null)
			return true;

		if (str.isEmpty())
			return true;

		return false;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> boolean isNullOrEmpty(T obj) {
		if (obj == null)
			return true;
		if (obj.getClass().getComponentType().isArray()) {
			T[] array = (T[]) obj;
			if (array.length == 0)
				return true;
			return false;
		}
		if (String.class.equals(obj.getClass())) {
			return isNullOrEmpty((String) obj);
		} else if (List.class.equals(obj.getClass())) {
			List list = (List) obj;
			if (list.isEmpty())
				return true;
			return false;
		} else if (Map.class.equals(obj.getClass())) {
			Map map = (Map) obj;
			if (map.isEmpty())
				return true;
			return false;
		}
		return false;
	}

	public static boolean isArrayContainsString(String[] array, String str) {
		for (String comparedStr : array) {
			if (comparedStr.equals(str))
				return true;
		}
		return false;
	}

	/**
	 * 不区分大小写比较字符串
	 * 
	 * @param str1 字符串1
	 * @param str2 字符串2
	 * @return true-相同；false-不同
	 */
	public static boolean equalsNotCL(String str1, String str2) {
		if (str1.regionMatches(true, 0, str2, 0, str2.length())) {
			return true;
		} else {
			return false;
		}

	}

	/**
	 * 比较字符串A出现key的index是否在字符串B的index同位置也出现
	 * 如字符串A为"0001001";字符串B为"1101001";key为'1'返回true；key为'0'返回false
	 * 
	 * @param stringA 字符串A
	 * @param stringB 字符串B
	 * @param key   分隔符
	 * @return true-有相同；false-无相同
	 */
	public static boolean Check2SKeyAtSameIndex(String stringA, String stringB, char key) {
		boolean flag = false;
		char[] typesA = stringA.toCharArray();
		char[] typesB = stringB.toCharArray();
		int count = 0;
		for (int i = 0; i < typesA.length; i++) {
			if (typesA[i] == key) {
				flag = true;
				flag = flag && (typesB[i] == key);
				count++;
			}
		}
		if (count == 0) {
			flag = true;
		}
		return flag;
	}

	/**
	 * 检查字符串A按照split切分后的字符串是否包含在字符串B被split切分后的数组中
	 * 
	 * @param stringA 字符串A
	 * @param stringB 字符串B
	 * @param split   分隔符
	 * @return true-包含；false-不包含
	 */
	public static boolean CheckBcontentA(String stringA, String stringB, String split) {
		boolean flag = false;

		String[] typesA = stringA.split(split);
		String[] typesB = stringB.split(split);
		int count = 0;
		for (int i = 0; i < typesA.length; i++) {
			for (int j = 0; j < typesB.length; j++) {
				if (typesA[i].equals(typesB[j])) {
					flag = true;
					flag = flag && (typesA[i].equals(typesB[j]));
					count++;
				}
			}
		}
		if (count == 0) {
			flag = true;
		}
		return flag;
	}

	/**
	 * 
	 * @param s
	 * @param beginindex
	 * @param length
	 * @param enconding
	 * @return
	 * @throws Exception
	 */
	public static String getSubstringBybyte(String s, int beginindex, int length, String enconding) throws Exception {
		if (isNullOrEmpty(enconding))
			enconding = "GBK";
		String retStr = "";
		byte[] srcbyte = s.getBytes(enconding);
		byte[] dest = new byte[length];
		System.arraycopy(srcbyte, beginindex, dest, 0, length);
		retStr = new String(dest, enconding);
		return retStr;
	}

	/**
	 * @author cn
	 * @param s      要截取的字符串
	 * @param length 要截取字符串的长度->是字节一个汉字2个字节 return 返回length长度的字符串（含汉字）
	 */
	public static String chineseSubstring(String s, int length) {
		try {
			byte[] bytes = s.getBytes("GBK");
			int n = 0; // 表示当前的字节数
			int i = 2; // 要截取的字节数，从第3个字节开始
			for (; i < bytes.length && n < length; i++) {
				// 奇数位置，如3、5、7等，为UCS2编码中两个字节的第二个字节
				if (i % 2 == 1) {
					n++; // 在UCS2第二个字节时n加1
				} else {
					// 当UCS2编码的第一个字节不等于0时，该UCS2字符为汉字，一个汉字算两个字节
					if (bytes[i] != 0) {
						n++;
					}
				}

			}
			// 如果i为奇数时，处理成偶数
			/*
			 * if (i % 2 == 1){ // 该UCS2字符是汉字时，去掉这个截一半的汉字 if (bytes[i - 1] != 0) i = i - 1;
			 * // 该UCS2字符是字母或数字，则保留该字符 else i = i + 1; }
			 */
			// 将截一半的汉字要保留
			if (i % 2 == 1) {
				i = i + 1;
			}
			return new String(bytes, 0, i, "GBK");
		} catch (Exception e) {
			// TODO: handle exception
			return s;
		}
	}

	/**
	 * @author cn
	 * @param s      要截取的字符串
	 * @param length 要截取字符串的长度->是字节一个汉字2个字节 return 返回length长度的字符串（含汉字）
	 */
	public static String[] chineseSubstring2args(String s, int length) {
		try {
			byte[] bytes = s.getBytes("GBK");
			if (bytes.length < length)
				return new String[] { s };
			int n = 0; // 表示当前的字节数
			int i = 2; // 要截取的字节数，从第3个字节开始
			for (; i < bytes.length && n < length; i++) {
				// 奇数位置，如3、5、7等，为UCS2编码中两个字节的第二个字节
				if (i % 2 == 1) {
					n++; // 在UCS2第二个字节时n加1
				} else {
					// 当UCS2编码的第一个字节不等于0时，该UCS2字符为汉字，一个汉字算两个字节
					if (bytes[i] != 0) {
						n++;
					}
				}

			}
			// 将截一半的汉字要保留
			if (i % 2 == 1) {
				i = i + 1;
			}
			String a1 = new String(bytes, 0, i, "GBK");
			return new String[] { a1, new String(bytes, i, bytes.length - i, "GBK") };

		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	/**
	 * 转换String值为int，如果为null，返回-1
	 * 
	 * @param vlaue
	 * @return
	 */
	public static int getInteger(String vlaue) {
		if (isNullOrEmpty(vlaue)) {
			return -1;
		}
		return Integer.parseInt(vlaue);
	}

	/**
	 * str是否存在于array数组中
	 * 
	 * @param str
	 * @param array
	 * @return
	 */
	public static boolean isArrayequle(String str, String[] array) {

		if (!(array.length > 0) || array == null) {
			return false;
		}

		for (String isstr : array) {
			if (str.equals(isstr)) {
				return true;
			}
		}

		return false;

	}

	public static String toHexTable(byte byteSrc[]) {
		return toHexTable(byteSrc, 16, 7);
	}

	public static String toHexTable(byte byteSrc[], int lengthOfLine) {
		return toHexTable(byteSrc, lengthOfLine, 7);
	}

	public static String toHexTable(byte byteSrc[], int lengthOfLine, int column) {
		StringBuffer hexTableBuffer = new StringBuffer(256);
		int lineCount = byteSrc.length / lengthOfLine;
		int totalLen = byteSrc.length;
		if (byteSrc.length % lengthOfLine != 0)
			lineCount++;
		for (int lineNumber = 0; lineNumber < lineCount; lineNumber++) {
			int startPos = lineNumber * lengthOfLine;
			byte lineByte[] = new byte[Math.min(lengthOfLine, totalLen - startPos)];
			System.arraycopy(byteSrc, startPos, lineByte, 0, lineByte.length);
			int columnA = column & 4;
			if (4 == columnA) {
				int count = 10 * lineNumber;
				String addrStr = Integer.toString(count);
				int len = addrStr.length();
				for (int i = 0; i < 8 - len; i++)
					hexTableBuffer.append('0');

				hexTableBuffer.append(addrStr);
				hexTableBuffer.append("h: ");
			}
			int columnB = column & 2;
			if (2 == columnB) {
				StringBuffer byteStrBuf = new StringBuffer();
				for (int i = 0; i < lineByte.length; i++) {
					String num = Integer.toHexString(lineByte[i] & 0xff);
					if (num.length() < 2)
						byteStrBuf.append('0');
					byteStrBuf.append(num);
					byteStrBuf.append(' ');
				}

				hexTableBuffer.append(fill(byteStrBuf.toString(), ' ', 48, false));
				hexTableBuffer.append("; ");
			}
			int columnC = column & 1;
			if (1 == columnC) {
				for (int i = 0; i < lineByte.length; i++) {
					char c = (char) lineByte[i];
					if (c < '!')
						c = '.';
					try {
						if (c >= '\240' && i < lineByte.length - 1) {
							char c2 = (char) lineByte[i + 1];
							if (c2 >= '\240') {
								String str = new String(lineByte, i, 2);
								hexTableBuffer.append(str);
								i++;
								continue;
							}
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
					hexTableBuffer.append("");
					hexTableBuffer.append(c);
				}

			}
			if (lineNumber >= lineCount - 1)
				break;
			hexTableBuffer.append('\n');
		}

		return hexTableBuffer.toString();
	}

	/**
	 * 将null转化为""，如果不是null，返回object.toString()
	 * 
	 * @param object
	 * @return
	 */
	public static String convertNullToEmpty(Object object) {
		if (object == null)
			return "";
		else {
			return String.valueOf(object);
		}
	}

	/**
	 * 驼峰转大写字母和下划线
	 * 
	 * @param param
	 * @return
	 */
	public static String humpToLine(String param) {
		if (param == null || "".equals(param.trim())) {
			return "";
		}
		int len = param.length();
		StringBuilder sb = new StringBuilder(len);
		for (int i = 0; i < len; i++) {
			char c = param.charAt(i);
			if (Character.isUpperCase(c)) {
				sb.append("_");
			}
			sb.append(Character.toUpperCase(c));
		}
		return sb.toString();
	}

	private static final char UNDERLINE = '_';

	/**
	 * 下划线 转 驼峰
	 * 
	 * @param param
	 * @return
	 */
	public static String underlineToCamel(String param) {
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

	/**
	 * 首字母转小写
	 * 
	 * @param s
	 * @return
	 */
	public static String toLowerCaseFirstOne(String s) {
		char[] cs = s.toCharArray();
		cs[0] += 32;
		return String.valueOf(cs);
	}

	/**
	 * 首字母转大写
	 * 
	 * @param s
	 * @return
	 */
	public static String toUpperCaseFirstOne(String s) {
		char[] cs = s.toCharArray();
		cs[0] -= 32;
		return String.valueOf(cs);
	}

	public static void main(String[] args) {
		System.out.println(isArrayequle("5", new String[] { "1", "2" }));
	}
}