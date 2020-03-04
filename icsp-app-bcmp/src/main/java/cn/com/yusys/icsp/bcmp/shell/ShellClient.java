package cn.com.yusys.icsp.bcmp.shell;

import cn.com.yusys.icsp.common.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;


/**
 * Shell执行器
 * 
 * @author 江成
 * 
 */
public class ShellClient {


	private static Logger logger = LoggerFactory.getLogger(ShellClient.class);


	/**
	 * 插件ID
	 */
	private static String MARK = "shell";

	/**
	 * 连接器
	 */
	private IConnector connector;

	/**
	 * 编码
	 */
	private String encoding;

	/**
	 * 互斥锁
	 */
	private Lock lock = new ReentrantLock();

	/**
	 * 同步condition
	 */
	private Condition conditon = lock.newCondition();

	/**
	 * 接受线程
	 */
	private Thread receiveThread;

	/**
	 * 待处理任务队列
	 */
	private Queue<Task> pendingTaskQueue = new LinkedList<Task>();

	/**
	 * 是否为活动状态
	 */
	private boolean alive;

	/**
	 * 命令间隔
	 */
	private long commandInterval = 100;

	/**
	 * 空闲等待时间
	 */
	private long idleWaitTime = 1000;

	/**
	 * 种子
	 */
	private AtomicLong seed = new AtomicLong(0);

	/**
	 * 构造函数
	 * 
	 * @param connector
	 * @param encoding
	 * @throws Exception
	 */
	public ShellClient(IConnector connector, String encoding) throws Exception {
		this.connector = connector;
		this.encoding = encoding;

		// 连接服务器
		this.connector.connect();

		// 获取命令间隔
		this.commandInterval = 100;
		// 获取空闲等待时间
		this.idleWaitTime = 1000;
		// 标志为活动状态
		this.alive = true;
		// 定义接受线程
		this.receiveThread = new Thread() {

			/**
			 * run
			 */
			public void run() {
				
				byte[] buffer=new byte[8192];
				
				// 标志是否处理完成
				boolean handle = false;
				// 获取任务
				Task task = getTask();

				// 循环处理
				while (alive) {
					try {
						// 判断是否处理完成
						if (handle) {
							// 获取任务
							task = getTask();
						}
						// 获取数据
						int len=ShellClient.this.connector.read(buffer);
						
						if(len==-1){
							break;
						}
						
						// 处理空闲情况
						if (task == null) {
							handle=true;
							handleIdle();
							continue;
						}
						
						byte[] bytes=new byte[len];
						if(len>0){
							System.arraycopy(buffer, 0, bytes, 0, len);
						}
						
						// 处理数据
						handle = handleMessage(task, bytes);
					} catch (Throwable e) {
						// 标志处理已经完成
						handle = true;
						// 处理异常
						handleException(task, e);
					}
				}

			}
		};
		// 启动线程
		this.receiveThread.start();

	}

	/**
	 * 获取任务
	 * 
	 * @return
	 */
	private Task getTask() {
		lock.lock();
		try {
			if (this.pendingTaskQueue.size() == 0) {
				return null;
			}

			Task task = this.pendingTaskQueue.poll();
			task.startTime = System.currentTimeMillis();
			return task;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			lock.unlock();
		}
		return null;
	}

	/**
	 * 加入任务
	 * 
	 * @param task
	 * @return
	 */
	private boolean addTask(Task task) {
		lock.lock();
		try {
			// 加入任务列表
			this.pendingTaskQueue.add(task);
			// 唤醒等待线程
			this.conditon.signalAll();
		} finally {
			lock.unlock();
		}
		return true;
	}

	/**
	 * 生成ID
	 * 
	 * @return
	 */
	private long generateId() {
		long id = this.seed.addAndGet(1);
		return id;
	}

	/**
	 * 处理空闲
	 * 
	 * @return
	 */
	private boolean handleIdle() {
		lock.lock();
		try {
			this.conditon.await(this.idleWaitTime, TimeUnit.MILLISECONDS);
		} catch (InterruptedException e) {
			// do nothing
		} finally {
			lock.unlock();
		}
		return true;
	}

	/**
	 * 处理异常
	 * 
	 * @param task
	 * @param e
	 * @return
	 */
	private boolean handleException(Task task, Throwable e) {
		if (task != null) {
			// 打印错误日志
			task.exception = e;
			// 标志任务已经完成
			task.finished = true;
		} else {
			logger.error(e.getMessage(), e);
		}
		return true;
	}

	/**
	 * 处理数据
	 * 
	 * @param task
	 * @param bytes
	 * @return
	 */
	private boolean handleMessage(Task task, byte[] bytes) throws Exception {
		if (bytes == null || bytes.length == 0) {
			if (task != null && task.foreQuit) {
				// 标志任务已经完成
				task.finished = true;
				return true;
			}
			return false;
		}
		// 加入数据篮子
		task.dataBasket.write(bytes);
		// 转换为字符
		String s = task.dataBasket.toString(this.encoding);
		StringBuilder sb = new StringBuilder();
		sb.append("执行脚本返回结果ID[");
		sb.append(task.id);
		sb.append("]:");
		sb.append(s);
		logger.debug(sb.toString());

		boolean end = false;
		if (task.foreQuit) {
			end = true;
		} else {
			int index = s.indexOf(task.endFeature);
			if (index != -1) {
				int offset = task.endFeature.length();
				end = (s.indexOf(task.endFeature, index + offset) != -1);
			}
		}

		// 判断是否获取结束符号
		if (end) {
			// 标志任务已经完成
			task.finished = true;
		}
		return end;
	}

	/**
	 * 检查connection
	 * 
	 * @return
	 */
	private boolean checkConnection() {
		boolean needReconnect = false;
		try {
			// 判断连接是否正常，如果不正常，那么则尝试重连
			if (this.connector.isConnected()) {
				return true;
			}
			needReconnect = true;
			this.connector.disconnect();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}

		if (needReconnect) {
			try {
				// 试图重连
				this.connector.connect();
				// 判断是否重连成功
				boolean success = this.connector.isConnected();
				return success;
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
		}
		return false;

	}

	/**
	 * 获取结束标志
	 * 
	 * @return
	 */
	public String getEndMark() {
		// 定义结束特征
		StringBuilder endMark = new StringBuilder();
		endMark.append("end-");
		endMark.append(System.currentTimeMillis());

		return endMark.toString();
	}

	/**
	 * 中断
	 * 
	 * @param task
	 */
	private void interrupt(Task task) throws Exception {
		try {
			task.foreQuit = true;
			connector.write(new byte[] { 03 });
		} catch (Exception e) {
			StringBuilder sb=new StringBuilder();
			sb.append("中断异常ID[");
			sb.append(task.id);
			sb.append("]");
			logger.error(sb.toString(), e);
		}
	}

	/**
	 * 同步发送命令
	 * 
	 * @param script
	 * @param timeout
	 * @return
	 * @throws Exception
	 */
	public String execute(String script, long timeout) throws Exception {
		return this.execute(script, timeout, null);
	}

	/**
	 * 同步发送命令
	 * 
	 * @param script
	 * @param timeout
	 * @param endMark
	 * @return
	 * @throws Exception
	 */
	public synchronized String execute(String script, long timeout,
			String endMark) throws Exception {
		if (!this.checkConnection()) {
			Exception e = new Exception("检查连接异常，并且重连失败");
			logger.error(e.getMessage());
			throw e;
		}

		if (endMark == null) {
			endMark = this.getEndMark();
		}

		// 定义任务
		Task task = new Task();
		task.id = this.generateId();
		task.endFeature = endMark;
		// 加入任务
		this.addTask(task);

		// 发送命令
		String[] commands = StringUtil.split(script, "\n");
		for (int i = 0; i < commands.length; i++) {
			StringBuilder command = new StringBuilder();
			command.append(commands[i]);
			command.append("\r\n");
			// 获取发送数据
			byte[] bytes = command.toString().getBytes(encoding);
			// 发送命令
			connector.write(bytes);
			// 等待命令间隔
			Thread.sleep(this.commandInterval);
		}
		// 发送结束符
		StringBuilder sb = new StringBuilder();
		sb.append("echo ");
		sb.append(task.endFeature);
		sb.append("\r\n");
		connector.write(sb.toString().getBytes(encoding));

		int tryTime = 0;
		// 如果任务未完成，等待任务完成
		while (!task.finished) {
			if (task.startTime != 0) {
				long curTime = System.currentTimeMillis();
				if (curTime - task.startTime >= timeout) {
					if (tryTime == 0) {
						tryTime++;
						// 中断
						interrupt(task);
						Thread.sleep(500);
						continue;
					}
					break;
				}
			}
			// 等待
			Thread.sleep(100);
		}

		if (task.exception != null) {
			StringBuilder exSb = new StringBuilder();
			exSb.append(task.exception.getMessage());
			exSb.append(",ID[");
			exSb.append(task.id);
			exSb.append("]");
			logger.error(exSb.toString(), task.exception);
			throw new Exception(task.exception);
		} else if (!task.finished) {
			StringBuilder exSb = new StringBuilder();
			exSb.append("脚本执行超时,ID[");
			exSb.append(task.id);
			exSb.append("]");
			Exception e = new TimeoutException(exSb.toString());
			logger.error(e.getMessage(), e);
			throw e;
		}

		// 获取返回数据
		String s = task.dataBasket.toString(encoding);
		return s;
	}

	/**
	 * 异步发送命令
	 * 
	 * @param script
	 * @throws Exception
	 */
	public synchronized void asynExecute(String script) throws Exception {
		if (!this.checkConnection()) {
			throw new Exception("连接异常");
		}
		// 获取发送数据
		byte[] bytes = script.getBytes(encoding);
		// 发送命令
		connector.write(bytes);
	}

	/**
	 * 销毁
	 */
	public synchronized void dispose() {
		this.alive = false;
		try {
			this.connector.disconnect();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		// 中断线程
		receiveThread.interrupt();
	}

	/**
	 * 处理任务
	 * 
	 * @author 江成
	 * 
	 */
	private class Task {

		/**
		 * ID
		 */
		public long id;

		/**
		 * 开始时间
		 */
		public long startTime;

		/**
		 * 结束特征
		 */
		public String endFeature;

		/**
		 * 标志是否任务是否结束
		 */
		public boolean finished = false;

		/**
		 * 数据篮子
		 */
		public ByteArrayOutputStream dataBasket = new ByteArrayOutputStream();

		/**
		 * 异常
		 */
		public Throwable exception;

		/**
		 * 是否强行退出
		 */
		public boolean foreQuit = false;

	}
}
