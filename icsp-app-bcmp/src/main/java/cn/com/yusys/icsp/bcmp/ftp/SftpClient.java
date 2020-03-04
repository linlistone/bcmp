package cn.com.yusys.icsp.bcmp.ftp;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.Vector;


/**
 * SFTP客户端
 * 
 * @author 江成
 * 
 */
public class SftpClient implements IFtpClient {

	private static Logger logger = LoggerFactory.getLogger(SftpClient.class);

	/**
	 * 会话
	 */
	private Session session;

	/**
	 * 通道
	 */
	private ChannelSftp sftp;

	/**
	 * 连接
	 * 
	 * @param url
	 * @param port
	 * @param userName
	 * @param password
	 * @param timeout
	 *            (单位秒)
	 * @return
	 * @throws Exception
	 */
	public boolean connect(String url, int port, String userName,
			String password, int timeout) throws Exception {
		if (port == -1) {
			port = 22;
		}
		JSch jsch = new JSch();
		try {
			// 用户名的key和value，对应get方法和界面中的值。
			session = jsch.getSession(userName, url, port);
			// 设置密码
			session.setPassword(password);
			// 设置超时
			session.setTimeout(timeout * 1000);
			// Try to ssh from the command line and accept the public key
			session.setConfig("StrictHostKeyChecking", "no");
			// 尝试连接
			session.connect();
		} catch (JSchException e) {
			logger.debug(e.getMessage(), e);
			// 断开连接
			disconnect();
			return false;
		}

		try {
			// 建立通道
			this.sftp = (ChannelSftp) session.openChannel("sftp");
			this.sftp.connect();
		} catch (JSchException e) {
			logger.debug(e.getMessage(), e);
			// 断开连接
			disconnect();
			return false;
		}
		return true;
	}

	/**
	 * 是否连接中
	 * 
	 * @return
	 */
	public boolean isConnected() {
		if (session != null) {
			return session.isConnected();
		}
		return false;
	}

	/**
	 * 断开连接
	 * 
	 * @return
	 */
	public boolean disconnect() throws Exception {
		boolean res = true;
		// 关闭SFTP
		if (this.sftp != null) {
			try {
				this.sftp.quit();
			} catch (Exception e) {
				logger.error(e.getMessage());
				res = false;
			}
		}
		// 关闭session
		if (this.session != null) {
			try {
				this.session.disconnect();
			} catch (Exception e) {
				logger.error(e.getMessage());
				res = false;
			}
		}
		return res;
	}

	/**
	 * 更改为当前工作目录的父目录
	 * 
	 * @return
	 * @throws Exception
	 */
	public boolean changeToParentDirectory() throws Exception {
		this.sftp.cd("..");
		return true;
	}

	/**
	 * 如果不存在文件路径，则创建该目录
	 * 
	 * @param name
	 * @return
	 */
	private boolean makeDirIfNoExist(String name) throws Exception {
		boolean isExist = false;
		Vector<LsEntry> items = this.sftp.ls(".");
		for (int i = 0, size = items.size(); i < size; i++) {
			LsEntry entry = items.get(i);
			String fileName = entry.getFilename();
			if (fileName.equals(name)) {
				isExist = true;
				break;
			}
		}
		if (!isExist) {
			// 建立文件夹
			this.sftp.mkdir(name);
		}
		return true;
	}

	/**
	 * 改变工作目录
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public boolean changeWorkingDirectory(String path) throws Exception {
		// 格式化路径
		path = StringUtil.formatPath(path);
		if (path.endsWith("/")) {
			path = path.substring(0, path.length() - 1);
		}
		if('/'==path.charAt(0)){
			sftp.cd("/");
			path=path.substring(1);
		}
		String name = path;
		int index = path.indexOf("/");
		int fromIndex = 0;
		while (index != -1) {
			name = path.substring(fromIndex, index);
			makeDirIfNoExist(name);
			this.sftp.cd(name);
			// 修改form index
			fromIndex = index + 1;
			index = path.indexOf("/", fromIndex);
		}
		name = path.substring(fromIndex, path.length());
		makeDirIfNoExist(name);
		this.sftp.cd(name);
		return true;
	}

	/**
	 * 上送文件
	 * 
	 * @param fileName
	 * @param input
	 * @return
	 * @throws Exception
	 */
	public boolean uploadFile(String fileName, InputStream input)
			throws Exception {
		this.sftp.put(input, fileName);
		return true;
	}

	/**
	 * 下载文件
	 * 
	 * @param remotePath
	 * @param fileName
	 * @param localPath
	 * @return
	 */
	public boolean downloadFile(String remotePath, String fileName,
			String localPath) throws Exception {
		File localFile = new File(localPath + "/" + fileName);
		BufferedOutputStream out = new BufferedOutputStream(
				new FileOutputStream(localFile));
		try {
			this.sftp.get(fileName, out);
			return true;
		} finally {
			out.close();
		}
	}
}
