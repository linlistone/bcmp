package cn.com.yusys.icsp.bcmp.shell;

import java.io.ByteArrayOutputStream;
import java.util.concurrent.TimeoutException;

import cn.com.yusys.icsp.bcmp.constant.Command;
import cn.com.yusys.icsp.bcmp.constant.OS;
import cn.com.yusys.icsp.bcmp.constant.Protocol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



/**
 * 系统类型获取器
 * 
 * @author 江成
 * 
 */
public class SystemGetter {

	/**
	 * 日志
	 */
	private static Logger logger = LoggerFactory.getLogger(SystemGetter.class);
	
	/**
	 * 超时
	 */
	private static long timeout=10000;

	/**
	 * 获取系统类型
	 * 
	 * @param protocol
	 * @param netArgs
	 * @param prompt
	 * @return
	 * @throws Exception
	 */
	public static OS getSystemType(Protocol protocol, NetArgs netArgs,
								   String prompt) throws Exception {

		logger.info("获取系统类型");
		// 获取connector
		final IConnector connector = ConnectorFactory.getConnector(protocol, netArgs);
		try {
			// 连接
			connector.connect();

			String[] commands = new String[2];
			commands[0] = "uname -s \r\n";
			commands[1] = "exit \r\n";
			
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
						logger.debug("执行脚本返回结果：" + byteOut.toString("UTF-8"));
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
				String command = commands[i] ;
				// 获取发送数据
				byte[] bytes = command.getBytes("UTF-8");
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
					s = ResultExtractor.subExtract(s, prompt, "uname -s");
					String[] items = s.split("\n");
					for (int j = 0; j < items.length; j++) {
						String item = items[j];
						if ("AIX".equalsIgnoreCase(item)) {
							return OS.AIX;
						} else if ("LINUX".equalsIgnoreCase(item)) {
							return OS.LINUX;
						}
					}
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
		return OS.UNKNOWN;
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

		netArgs.ip = "10.1.54.215";
		netArgs.port = 23;
		netArgs.userName = "bipcns1";
		netArgs.password = "bipcns1";
		netArgs.timeout = 30000;
		// 获取提示符号
		String prompt = PromptGetter.getPrompt(Protocol.TELNET, netArgs);
		System.out.println("prompt="+prompt);
		// 获取提示符
		OS os = SystemGetter.getSystemType(Protocol.TELNET, netArgs, prompt);
		System.out.println("system=" + os + " ,len=" + os.getName().length());
	}
}
