package cn.com.yusys.icsp.bcmp.shell;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 结果提取器
 * 
 * @author 江成
 * 
 */
public class ResultExtractor {

	private static Logger logger = LoggerFactory.getLogger(ResultExtractor.class);


	/**
	 * 抽取两个命令之间的结果
	 * 
	 * @param result
	 * @param prompt
	 * @param before
	 * @param end
	 * @return
	 */
	public static String subExtract(String result, String prompt,
			String before, String end) {
		if (result == null || result.length() == 0) {
			return null;
		}

		// 开始标志
		String beforeMark = prompt + before;
		// 结束标志
		String endMark = prompt + end;

		StringBuilder sb = new StringBuilder();

		// 标记是否开始读取结果
		boolean flag = false;

		String[] lines = result.split("\n");
		for (String line : lines) {
			int len = line.length();
			char lastChar = line.charAt(len - 1);
			if (lastChar == '\r') {
				line = line.substring(0, len - 1);
			}

			// 判断是否开始
			if (!flag) {
				flag = line.startsWith(beforeMark);
				continue;
			}

			// 判断是否结束
			if (line.startsWith(endMark)) {
				break;
			}

			// 提示符开头，不是结果
			if (line.startsWith(prompt)) {
				continue;
			}
			sb.append(line);
			sb.append("\n");
		}

		if (sb.length() == 0) {
			logger.debug("返回结果:");
			return "";
		} else {
			String res = sb.substring(0, sb.length() - 1);
			logger.debug("返回结果:" + res);
			return res;
		}

	}

	/**
	 * 抽取两个命令之后的结果
	 * 
	 * @param result
	 * @param prompt
	 * @param before
	 * @return
	 */
	public static String subExtract(String result, String prompt, String before) {
		if (result == null || result.length() == 0) {
			return null;
		}

		// 开始标志
		String beforeMark = prompt + before;
		// 定位开始标志位置
		int index = -1;
		String mark = prompt + before;
		String[] lines = result.split("\n");
		for (int i = 0; i < lines.length; i++) {
			String line = lines[i];
			int len = line.length();
			char lastChar = line.charAt(len - 1);
			if (lastChar == '\r') {
				lines[i] = line.substring(0, len - 1);
			}

			// 查找开始标志
			if (mark.equalsIgnoreCase(lines[i].trim())) {
				index = i;
			}
		}

		if (index == -1) {
			// 再次定位开始标志
			for (int i = 0; i < lines.length; i++) {
				String line = lines[i];
				// 查找开始标志
				if (line.indexOf(beforeMark) != -1) {
					index = i;
					break;
				}
			}
		}

		index++;

		StringBuilder sb = new StringBuilder();
		// 标记是否读取到结果
		boolean find = false;

		for (int i = index; i < lines.length; i++) {
			String line = lines[i];
			if (!isResult(line, prompt, "exit")) {
				if (find) {
					break;
				} else {
					continue;
				}
			}
			sb.append(line);
			sb.append("\n");
			find = true;
		}

		if (sb.length() == 0) {
			logger.debug("返回结果:");
			return "";
		} else {
			String res = sb.substring(0, sb.length() - 1);
			logger.debug("返回结果:" + res);
			return res;
		}

	}

	/**
	 * 抽取结果
	 * 
	 * @param result
	 * @param prompt
	 * @param exitMark
	 * @return
	 */
	public static String extract(String result, String prompt, String exitMark) {
		if (result == null || result.length() == 0) {
			return null;
		}
		StringBuilder sb = new StringBuilder();
		int index = -1;
		String mark = prompt + exitMark;
		String[] lines = result.split("\n");
		for (int i = lines.length - 1; i >= 0; i--) {
			String line = lines[i];
			int len = line.length();
			char lastChar = line.charAt(len - 1);
			if (lastChar == '\r') {
				lines[i] = line.substring(0, len - 1);
			}
			// 查找退出标志
			if (mark.equalsIgnoreCase(lines[i].trim())) {
				index = i;
			}
		}
		if (index == -1) {
			index = lines.length - 1;
		} else {
			index--;
		}
		boolean find = false;
		for (int i = index; i >= 0; i--) {
			String line = lines[i];
			if (!isResult(line, prompt, exitMark)) {
				if (find) {
					break;
				} else {
					continue;
				}
			}
			sb.insert(0,"\n");
			sb.insert(0,line);
	
			find = true;
		}

		if (sb.length() == 0) {
			logger.debug("返回结果:");
			return "";
		} else {
			String res = sb.substring(0, sb.length() - 1);
			logger.debug("返回结果:" + res);
			return res;
		}
	}

	/**
	 * 是否为结果
	 * 
	 * @param s
	 * @param prompt
	 * @param exitMark
	 * @return
	 */
	private static boolean isResult(String s, String prompt, String exitMark) {
		// 提示符开头，不是结果
		if (s.startsWith(prompt)) {
			int len = prompt.length();
			if (s.length() > len) {
				String str = s.substring(len);
				if (str.startsWith(prompt)) {
					return true;
				}
			}
			return false;
		}

		// 脚本开始符号
		if (s.startsWith(">")) {
			return false;
		}

		// 输入命令
		if (s.indexOf("echo") != -1) {
			return false;
		}

		// 是否为退出标志
		if (s.indexOf(exitMark) != -1) {
			return false;
		}

		return true;
	}
}
