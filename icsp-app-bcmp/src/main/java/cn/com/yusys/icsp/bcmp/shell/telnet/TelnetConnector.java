package cn.com.yusys.icsp.bcmp.shell.telnet;

import cn.com.yusys.icsp.bcmp.shell.IConnector;
import cn.com.yusys.icsp.bcmp.shell.NetArgs;
import org.apache.commons.net.telnet.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * telnet connector
 * 
 * @author 江成
 * 
 */
public class TelnetConnector implements IConnector {

	private static Logger logger = LoggerFactory.getLogger(TelnetConnector.class);


	/**
	 * 输入流
	 */
	private InputStream in;

	/**
	 * 输出流
	 */
	private OutputStream out;

	/**
	 * client
	 */
	private TelnetClient tc;

	/**
	 * 网络参数
	 */
	private NetArgs netArgs;

	/**
	 * 最大尝试数量
	 */
	private int maxTryCount = 1000;
	
	/**
	 * 超时时间
	 */
	private long timeout=10000;

	/**
	 * 初始化
	 */
	public void init(NetArgs args) {
		this.netArgs = args;
	}

	/**
	 * 断开连接
	 */
	public void disconnect() throws IOException {
		// 关闭输入流
		if (in != null) {
			in.close();
		}
		// 关闭输出流
		if (out != null) {
			out.close();
		}
		// 断开连接
		tc.disconnect();
		tc = null;
	}

	/**
	 * 连接
	 */
	public boolean connect() throws IOException {
		tc = new TelnetClient();
		tc.setDefaultTimeout(0);

		TerminalTypeOptionHandler ttopt = new TerminalTypeOptionHandler(
				"vt100", false, false, true, true);
		EchoOptionHandler echoopt = new EchoOptionHandler(false, false, false,
				true);
		SuppressGAOptionHandler gaopt = new SuppressGAOptionHandler(false,
				false, false, true);

		logger.debug("正在建立连接 ip=" + netArgs.ip + " ,port=" + netArgs.port);
		
		try {
			tc.addOptionHandler(ttopt);
			tc.addOptionHandler(echoopt);
			tc.addOptionHandler(gaopt);
		} catch (InvalidTelnetOptionException e) {
			logger.error("Error registering option handlers: ", e);
			return false;
		}
		
		logger.debug("正在建立连接...");
		tc.connect(netArgs.ip, netArgs.port);
		logger.debug("连接主机[" + netArgs.ip + ":" + netArgs.port + "]成功！");

		// 获取输入流
		in = tc.getInputStream();
		// 获取输出流
		out = tc.getOutputStream();
		if (login()) {
			logger.debug("登录成功");
			return true;
		} else {
			logger.debug("登录失败");
			return false;
		}

	}
	
	/**
	 * 登陆
	 * 
	 * @return
	 */
	private boolean login() throws IOException {
        //创建锁
		final Lock lock=new ReentrantLock();
		//创建同步condition
		final Condition condition=lock.newCondition();
		
		final Boolean[] res = new Boolean[1];
		// 定义线程
		Thread thread = new Thread() {

			/**
			 * run
			 */
			public void run() {
				res[0] = doLoginTask();
				lock.lock();
				try{
					condition.signalAll();
				}finally{
					lock.unlock();
				}
			}
		};
		//启动线程
		thread.start();
		
		lock.lock();
		try{
			condition.await(timeout, TimeUnit.MILLISECONDS);
		} catch (InterruptedException e) {
			logger.error(e.getMessage(),e);
		}finally{
		   lock.unlock();	
		}
		
		//如果超时返回，断开连接
		if(res[0]==null){
			this.disconnect();
		}
		return res[0];
	}

	/**
	 * 执行登录任务
	 * 
	 * @return
	 */
	private boolean doLoginTask() {
		try {
			// 标志操作是否成功
			boolean flag = false;

			ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
			for (int i = 0; i < maxTryCount; i++) {
				int len = -1;
				byte[] buffer = new byte[1024];
				len = read(buffer);
				if (len == -1) {
					break;
				}
				if (len > 0) {
					byteOut.write(buffer, 0, len);
					String s = byteOut.toString("GBK").toLowerCase();
					//System.err.println(">> " + s);
					if (s.indexOf("login") != -1) {
						String msg = netArgs.userName + "\r\n";
						byte[] data = msg.getBytes("GBK");
						write(data);
						flag = true;
						break;
					}
				}
			}

			if (flag) {
				logger.debug("代填账号成功");
			} else {
				return false;
			}

			byteOut = new ByteArrayOutputStream();
			for (int i = 0; i < maxTryCount; i++) {
				int len = -1;
				byte[] buffer = new byte[1024];
				len = read(buffer);
				if (len == -1) {
					break;
				}

				if (len > 0) {
					byteOut.write(buffer, 0, len);
					String s = byteOut.toString("GBK").toLowerCase();
					//System.err.println(">> " + s);
					if (s.indexOf("password") != -1) {
						String msg = netArgs.password + "\r\n";
						byte[] data = msg.getBytes("GBK");
						write(data);
						break;
					}
				}
			}

			if (flag) {
				logger.debug("代填密码成功");
				return true;
			} else {
				return false;
			}

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return false;
		}
	}

	/**
	 * read
	 */
	public int read(byte[] buff) throws IOException {
		int n = in.read(buff);
		return n;
	}

	/**
	 * read
	 */
	public byte[] read() throws IOException {
		ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		if (in.available() > 0) {
			byte[] buff = new byte[in.available()];
			in.read(buff);
			byteOut.write(buff);
		}
		return byteOut.toByteArray();
	}

	/**
	 * 写操作
	 */
	public void write(byte[] bytes) throws IOException {
		out.write(bytes);
		out.flush();
	}

	/**
	 * 判断是否处于连接状态
	 */
	public boolean isConnected() {
		if (tc != null) {
			return tc.isConnected();
		}
		return false;
	}

}
