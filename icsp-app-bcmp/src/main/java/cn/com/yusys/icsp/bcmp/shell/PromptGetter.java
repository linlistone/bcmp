package cn.com.yusys.icsp.bcmp.shell;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeoutException;

import cn.com.yusys.icsp.bcmp.constant.Command;
import cn.com.yusys.icsp.bcmp.constant.Protocol;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 提示符获取器
 * 
 * @author 江成
 * 
 */
public class PromptGetter {

	private static Logger logger = LoggerFactory.getLogger(PromptGetter.class);


	/**
	 * tip
	 */
	private static String TIP = "getPromptTest";

	/**
	 * 超时
	 */
	private static long timeout = 10000;

	/**
	 * 获取提示符
	 * 
	 * @param protocol
	 * @return
	 * @throws Exception
	 */
	public static String getPrompt(Protocol protocol, NetArgs netArgs)
			throws Exception {
		logger.info("获取系统提示符");
		// 获取connector
		final IConnector connector = ConnectorFactory.getConnector(protocol,
				netArgs);
		try {
			// 连接
			connector.connect();
			// 生成测试提示
			String testTip = "echo " + TIP + System.currentTimeMillis();

			// 命令
			String[] commands = new String[2];
			commands[0] = testTip + "\r\n";
			commands[1] = "exit\r\n";

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
				String command = commands[i];
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

			// 结果集合
			List<Item> resList = new ArrayList<Item>();

			String[] encodings = new String[] { "UTF-8", "GBK" };
			for (int i = 0; i < encodings.length; i++) {
				// 获取编码
				String encoding = encodings[i];
				try {
					String s = byteOut.toString(encoding);
					String[] lines = s.split("\n");
					for (String line : lines) {
						// 判断是否匹配
						int index = line.indexOf(testTip);
						if (index == -1) {
							continue;
						}
						Item item = new Item();
						item.index = index;
						item.content = line;
						resList.add(item);
					}
				} catch (Exception e) {
					logger.error(e.getMessage(), e);
				}

				if (resList.size() > 0) {
					break;
				}
			}

			int size = resList.size();
			if (size > 0) {
				Item item = resList.get(0);
				for (int i = 1; i < size; i++) {
					Item newItem = resList.get(i);
					if (item.index < newItem.index) {
						item = newItem;
					}
				}
				// 获取提示符
				String prompt = item.content.substring(0, item.index);
				return prompt;
			}
			throw new Exception("获取提示符错误");
		} finally {
			// 断开connector
			if (connector != null) {
				connector.disconnect();
			}
		}

	}

	/**
	 * item
	 * 
	 * @author 江成
	 * 
	 */
	private static class Item {

		/**
		 * index
		 */
		public int index;

		/**
		 * item
		 */
		public String content;
	}

	/**
	 * 测试
	 * 
	 * @param args
	 * @throws Exception
	 */
	static public void main(String[] args) throws Exception {
		NetArgs netArgs = new NetArgs();
		netArgs.ip = "158.222.67.70";
		netArgs.port = 22;
		netArgs.userName = "bwp";
		netArgs.password = "bwp";
		netArgs.timeout = 30000;
		// 获取提示符
		String prompt = PromptGetter.getPrompt(Protocol.SSH, netArgs);
		System.out.println("prompt=" + prompt + " ,len=" + prompt.length());
	}
}
