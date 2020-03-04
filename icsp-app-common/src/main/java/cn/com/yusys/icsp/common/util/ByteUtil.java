package cn.com.yusys.icsp.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Byte工具
 * 
 * @author 江成
 * 
 */
public class ByteUtil {

	/**
	 * 日志
	 */
	private static Logger logger = LoggerFactory.getLogger(ByteUtil.class);

	/**
	 * 编码格式
	 */
	private static String CHARSET_NAME = "UTF-8";
	

	/**
	 * 长整型转化为byte数组
	 *
	 * @param logVal
	 * @return
	 */
	public static byte[] long2byteArray(long logVal) {
		byte[] res = new byte[8];
		res[0] = (byte)(logVal >> 56 & 0xFF);
		res[1] = (byte)(logVal >> 48 & 0xFF);
		res[2] = (byte)(logVal >> 40 & 0xFF);
		res[3] = (byte)(logVal >> 32 & 0xFF);
		res[4] = (byte)(logVal >> 24 & 0xFF);
		res[5] = (byte)(logVal >> 16 & 0xFF);
		res[6] = (byte)(logVal >> 8 & 0xFF);
		res[7] = (byte)(logVal & 0xFF);
		return res;
	}

	/**
	 * byte数组转化成长整数
	 *
	 * @param buffer
	 * @param offset
	 * @return
	 */
	public static long byteArray2Long(byte[] buffer, int offset) {
		long n = 0;

		long m=0;
		m=buffer[offset];
		m&=0xFF;
		m<<=56;
		n|=m;

		m=buffer[offset+1];
		m&=0xFF;
		m<<=48;
		n|=m;

		m=buffer[offset+2];
		m&=0xFF;
		m<<=40;
		n|=m;

		m=buffer[offset+3];
		m&=0xFF;
		m<<=32;
		n|=m;

		m=buffer[offset+4];
		m&=0xFF;
		m<<=24;
		n|=m;

		m=buffer[offset+5];
		m&=0xFF;
		m<<=16;
		n|=m;

		m=buffer[offset+6];
		m&=0xFF;
		m<<=8;
		n|=m;

		m=buffer[offset+7];
		m&=0xFF;
		n|=m;

		return n;
	}


	/**
	 * 整型转化为byte数组
	 * 
	 * @param intVal
	 * @return
	 */
	public static byte[] int2byteArray(int intVal) {
		byte[] res = new byte[4];
		res[0] = (byte) (intVal >> 24 & 0xFF);
		res[1] = (byte) (intVal >> 16 & 0xFF);
		res[2] = (byte) (intVal >> 8 & 0xFF);
		res[3] = (byte) (intVal & 0xFF);
		return res;
	}

	/**
	 * byte数组转化成整数
	 * 
	 * @param buffer
	 * @param offset
	 * @return
	 */
	public static int byteArray2Int(byte[] buffer, int offset) {
		int n = 0;
		n |= (buffer[offset] << 24) & 0xFF000000;
		n |= (buffer[offset + 1] << 16) & 0xFF0000;
		n |= (buffer[offset + 2] << 8) & 0xFF00;
		n |= buffer[offset + 3] & 0xFF;
		return n;
	}

	/**
	 * short转化为byte数组
	 * 
	 * @param intVal
	 * @return
	 */
	public static byte[] short2byteArray(short shortVal) {
		byte[] res = new byte[2];
		res[0] = (byte) (shortVal >> 8 & 0xFF);
		res[1] = (byte) (shortVal & 0xFF);
		return res;
	}

	/**
	 * byte数组转化成short
	 * 
	 * @param buffer
	 * @param offset
	 * @return
	 */
	public static short byteArray2Short(byte[] buffer, int offset) {
		short n = 0;
		n |= (buffer[offset + 0] << 8) & 0xFF00;
		n |= buffer[offset + 1] & 0xFF;
		return n;
	}

	/**
	 * 转化字符串为字节数组
	 * 
	 * @param s
	 * @return
	 */
	public static byte[] str2Bytes(String s) {
		if (s != null) {
			try {
				byte[] bytes = s.getBytes(CHARSET_NAME);
				return bytes;
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
		}
		return new byte[0];
	}

	/**
	 * 字节数组转换为字符串
	 * 
	 * @param bytes
	 * @param offset
	 * @param len
	 * @return
	 */
	public static String bytes2Str(byte[] bytes, int offset, int len) {
		if (bytes == null) {
			return null;
		}

		try {
			return new String(bytes, offset, len, CHARSET_NAME);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return null;
	}

	/**
	 * 字节数组转换为字符串
	 * 
	 * @param bytes
	 * @return
	 */
	public static String bytes2Str(byte[] bytes) {
		if (bytes == null) {
			return null;
		}
		String s = bytes2Str(bytes, 0, bytes.length);
		return s;
	}

	/**
	 * 从输入流中读取内容
	 * 
	 * @param in
	 * @param buffer
	 */
	public static int readBytes(InputStream in, byte[] buffer, int offset,
			int len) throws IOException {
		int expectCount = len;
		do {
			int count = in.read(buffer, offset, expectCount);
			if (count == -1) {
				break;
			}
			expectCount -= count;
			offset += count;
		} while (expectCount > 0);
		// 返回结果
		int readLen = len - expectCount;
		return readLen;
	}
	
	/**
	 * map to bytes
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public static byte[] map2Bytes(Map<String, String> map) throws Exception {
		if (map == null) {
			return new byte[0];
		}

		ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		// 编码MAP
		for (String key : map.keySet()) {
			// 编码key
			byte[] bytes = ByteUtil.str2Bytes(key);
			byte[] lenBytes = ByteUtil.int2byteArray(bytes.length);
			byteOut.write(lenBytes);
			byteOut.write(bytes);

			// 获取value
			String value = map.get(key);
			// 编码value
			bytes = ByteUtil.str2Bytes(value);
			lenBytes = ByteUtil.int2byteArray(bytes.length);
			byteOut.write(lenBytes);
			byteOut.write(bytes);
		}
		byte[] bytes = byteOut.toByteArray();
		return bytes;
	}

	/**
	 * bytes to map
	 * 
	 * @param bytes
	 * @return
	 */
	public static Map<String, String> bytes2Map(byte[] bytes) {
		Map<String, String> map = bytes2Map(bytes, 0, bytes.length);
		return map;
	}

	/**
	 * bytes to map
	 * 
	 * @param bytes
	 * @param offset
	 * @param length
	 * @return
	 */
	public static Map<String, String> bytes2Map(byte[] bytes, int offset,
			int length) {
		// 修正offset
		if (offset == -1) {
			offset = 0;
		}

		// 修正limit
		int limit = 0;
		if (length == -1) {
			limit = bytes.length;
		} else {
			limit = offset + length;
		}

		// 定义参数Map
		Map<String, String> params = new HashMap<String, String>();

		while (offset < limit) {
			// 获取key
			int len = ByteUtil.byteArray2Int(bytes, offset);
			offset += 4;
			String key = ByteUtil.bytes2Str(bytes, offset, len);
			// 获取value
			offset += len;
			len = ByteUtil.byteArray2Int(bytes, offset);
			offset += 4;
			String value = ByteUtil.bytes2Str(bytes, offset, len);
			offset += len;
			// 加入Map
			params.put(key, value);
		}
		return params;
	}
	
	/**
	 * 字节数组转化成十六进制字符串
	 */
	public static String bytes2Hex(byte[] bytes) {
		StringBuilder sb = new StringBuilder(bytes.length * 2);
		for (int i = 0; i < bytes.length; i++) {
			String s = Integer.toHexString(bytes[i] & 0xFF);
			if (s.length() < 2) {
				sb.append("0");
			}
			sb.append(s);
		}
		return sb.toString().toUpperCase();
	}
	
	/**
	 * 十六进制字符串转化成字节数组
	 */
	public static byte[] hex2Bytes(String src) {
        byte[] b2 = new byte[src.length()/2];
        for (int i = 0; i < b2.length; i++) {
            b2[i] = (byte)Integer.parseInt(src.substring(i*2,i*2+2),16);
        }
        return b2;
    }
}
