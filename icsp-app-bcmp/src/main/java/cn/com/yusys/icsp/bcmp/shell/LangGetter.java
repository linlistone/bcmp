package cn.com.yusys.icsp.bcmp.shell;

import java.io.ByteArrayOutputStream;
import java.util.concurrent.TimeoutException;


import cn.com.yusys.icsp.bcmp.constant.Command;
import cn.com.yusys.icsp.bcmp.constant.OS;
import cn.com.yusys.icsp.bcmp.constant.Protocol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 系统语言获取器
 * 
 * @author 江成
 * 
 */
public class LangGetter {

	private static Logger logger = LoggerFactory.getLogger(LangGetter.class);


	/**
	 * 脚本文件名称
	 */
	private static String scriptName = "lang.sh";

	/**
	 * char set
	 */
	private static String CHARSET = "UTF-8";
	
	/**
	 * 超时
	 */
	private static long timeout = 10000;

	/**
	 * 获取当前使用中的语言
	 * 
	 * @param prompt
	 * @param os
	 * @param protocol
	 * @param netArgs
	 * @return
	 * @throws Exception
	 */
	public static String getUsedLang(String prompt, OS os, Protocol protocol,
									 NetArgs netArgs) throws Exception {

		logger.info("获取系统语言");
		// 获取connector
		final IConnector connector = ConnectorFactory.getConnector(protocol, netArgs);
		try {
			// 连接
			connector.connect();
			// 获取脚本
			String script = ShellScriptManager.getScript(os.getName(), scriptName,
					"used");
			StringBuilder sb = new StringBuilder();
			sb.append(script);
			sb.append("exit");

			String[] commands = sb.toString().split("\n");

			// 完成标志
			final boolean[] finish = new boolean[1];

			// 接结果数据
			final ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
			// 定义线程
			Thread thread = new Thread() {

				/**
				 * run
				 */
				public void run() {
					try {
						int len = -1;
						byte[] buffer = new byte[1024];
						// 获取结果
						while ((len = connector.read(buffer)) != -1) {
							byteOut.write(buffer, 0, len);
						}
						logger.debug("执行脚本返回结果：" + byteOut.toString(CHARSET));
					} catch (Exception e) {
						logger.error(e.getMessage(), e);
					} finally {
						finish[0] = true;
					}
				}
			};
			// 启动线程
			thread.start();

			for (int i = 0; i < commands.length; i++) {
				Thread.sleep(Command.interval);
				String command = commands[i] + "\r\n";
				// 获取发送数据
				byte[] bytes = command.getBytes(CHARSET);
				// 发送命令
				connector.write(bytes);
			}

			int tryTimes = 0;
			while (finish[0] != true) {
				long time = tryTimes * 100;
				if (time > timeout) {
					String msg = "等待返回结果超时,耗时：" + time + "毫秒";
					throw new TimeoutException(msg);
				}
				// 每次等待100毫秒
				Thread.sleep(100);
				tryTimes++;
			}

			String[] encodings = new String[] { "UTF-8", "GBK" };
			for (int i = 0; i < encodings.length; i++) {
				try {
					String encoding = encodings[i];
					String s = byteOut.toString(encoding);
					s = ResultExtractor.extract(s, prompt, "exit");
					return s;
				} catch (Exception e) {
					logger.error(e.getMessage(), e);
				}
			}

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (connector != null) {
				connector.disconnect();
			}
		}
		return null;
	}

	/**
	 * 获取系统所有可用语言
	 * 
	 * @param prompt
	 * @param os
	 * @param protocol
	 * @return
	 * @throws Exception
	 */
	public static String getAllLang(String prompt, OS os, Protocol protocol,
			NetArgs netArgs) throws Exception {

		logger.info("获取系统语言");
		// 获取connector
		final IConnector connector = ConnectorFactory.getConnector(protocol, netArgs);
		try {
			// 连接
			connector.connect();
			// 获取脚本
			String script = ShellScriptManager.getScript(os.getName(), scriptName,
					"all");

			StringBuilder sb = new StringBuilder();
			sb.append(script);
			sb.append("exit");

			String[] commands = sb.toString().split("\n");

			// 完成标志
			final boolean[] finish = new boolean[1];

			// 接结果数据
			final ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
			// 定义线程
			Thread thread = new Thread() {

				/**
				 * run
				 */
				public void run() {
					try {
						int len = -1;
						byte[] buffer = new byte[1024];
						// 获取结果
						while ((len = connector.read(buffer)) != -1) {
							byteOut.write(buffer, 0, len);
						}
						logger.debug("执行脚本返回结果：" + byteOut.toString(CHARSET));
					} catch (Exception e) {
						logger.error(e.getMessage(), e);
					} finally {
						finish[0] = true;
					}
				}
			};
			// 启动线程
			thread.start();

			for (int i = 0; i < commands.length; i++) {
				Thread.sleep(Command.interval);
				String command = commands[i] + "\r\n";
				// 获取发送数据
				byte[] bytes = command.getBytes(CHARSET);
				// 发送命令
				connector.write(bytes);
			}

			int tryTimes = 0;
			while (finish[0] != true) {
				long time = tryTimes * 100;
				if (time > timeout) {
					String msg = "等待返回结果超时,耗时：" + time + "毫秒";
					throw new TimeoutException(msg);
				}
				// 每次等待100毫秒
				Thread.sleep(100);
				tryTimes++;
			}


			String[] encodings = new String[] { "UTF-8", "GBK" };
			for (int i = 0; i < encodings.length; i++) {
				try {
					String encoding = encodings[i];
					String s = byteOut.toString(encoding);
					s = ResultExtractor.extract(s, prompt, "exit");
					return s;
				} catch (Exception e) {
					logger.error(e.getMessage(), e);
				}
			}

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (connector != null) {
				connector.disconnect();
			}
		}
		return null;
	}

	/**
	 * 测试
	 * 
	 * @param args
	 * @throws Exception
	 */
	static public void main(String[] args) throws Exception {
		NetArgs netArgs = new NetArgs();
		// netArgs.ip = "158.222.67.70";
		// netArgs.port = 22;
		// netArgs.userName = "bwp";
		// netArgs.password = "bwp";
		// netArgs.timeout = 30000;

		for (int i = 0; i < 1000; i++) {

			netArgs.ip = "10.1.54.215";
			netArgs.port = 23;
			netArgs.userName = "bipcns1";
			netArgs.password = "bipcns1";
			netArgs.timeout = 30000;
			// 获取提示符号
			String prompt = PromptGetter.getPrompt(Protocol.TELNET, netArgs);
			// 获取语言
			String lang = LangGetter.getUsedLang(prompt, OS.AIX,
					Protocol.TELNET, netArgs);
			System.err.println("lang=" + lang + " ,len=" + lang.length());

			Thread.sleep(500);

		}

		// 获取语言
		// String allLang = LangGetter.getAllLang(prompt, OS.AIX,
		// Protocol.TELNET,
		// netArgs);
		// System.out.println("allLang=" + allLang + " ,len=" +
		// allLang.length());
	}
}
