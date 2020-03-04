package cn.com.yusys.icsp.bcmp.ftp;

import cn.com.yusys.icsp.common.util.StringUtil;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;

/**
 * FTP客户端
 * 
 * @author 江成
 * 
 */
public class FtpClient implements IFtpClient {

	/**
	 * FTP Client
	 */
	private FTPClient ftp;

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
			port = 21;
		}
		// 定义FTP client
		this.ftp = new FTPClient();
		
		// 设置超时时间
		ftp.setConnectTimeout(timeout);
		// 连接
		this.ftp.connect(url, port);
		// 登录
		ftp.login(userName, password);
		int reply = ftp.getReplyCode();
		if (!FTPReply.isPositiveCompletion(reply)) {
			ftp.disconnect();
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
		if (ftp != null) {
			return ftp.isConnected();
		}
		return false;
	}

	/**
	 * 断开连接
	 * 
	 * @return
	 */
	public boolean disconnect() throws Exception {
		if (ftp != null) {
			ftp.logout();
			ftp.disconnect();
			return true;
		}
		return false;
	}

	/**
	 * 更改为当前工作目录的父目录
	 * 
	 * @return
	 * @throws Exception
	 */
	public boolean changeToParentDirectory() throws Exception {
		return ftp.changeToParentDirectory();
	}

	/**
	 * 如果不存在文件路径，则创建该目录
	 * 
	 * @param name
	 * @return
	 */
	private boolean makeDirIfNoExist(String name) throws Exception {
		boolean isExist = false;
		FTPFile[] items = this.ftp.listDirectories();
		for (int i = 0, size = items.length; i < size; i++) {

			String fileName = items[i].getName();
			if (fileName.equals(name)) {
				isExist = true;
				break;
			}
		}

		if (!isExist) {
			// 建立文件夹
			this.ftp.makeDirectory(name);
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
			ftp.changeWorkingDirectory("/");
			path=path.substring(1);
		}
		String name = path;
		int index = path.indexOf("/");
		int fromIndex = 0;
		while (index != -1) {
			name = path.substring(fromIndex, index);
			makeDirIfNoExist(name);
			this.ftp.changeWorkingDirectory(name);
			// 修改form index
			fromIndex = index + 1;
			index = path.indexOf("/", fromIndex);
		}
		name = path.substring(fromIndex, path.length());
		makeDirIfNoExist(name);
		this.ftp.changeWorkingDirectory(name);
		return true;
	}

	/**
	 * 上送文件
	 * 
	 * @param fileName
	 * @param input
	 * @return
	 */
	public boolean uploadFile(String fileName, InputStream input)
			throws Exception {
		try {
			//设置上传模式
			ftp.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);
		
			// 设置上传格式为二进制
			ftp.setFileType(FTP.BINARY_FILE_TYPE);
			
			//设置缓存区大小
			ftp.setBufferSize(1024*1024);

			// 上传文件
			ftp.storeFile(fileName, input);
			return true;
		} catch (Exception e) {
			throw e;
		} finally {
			// 关闭输入流
			input.close();
		}
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
		// 转移到FTP服务器目录
		ftp.changeWorkingDirectory(remotePath);
		FTPFile[] files = ftp.listFiles();
		for (int i = 0; i < files.length; i++) {
			String name = files[i].getName();
			if (name.equals(fileName)) {
				File localFile = new File(localPath + "/" + name);
				BufferedOutputStream out = new BufferedOutputStream(
						new FileOutputStream(localFile));
				try {
					ftp.retrieveFile(name, out);
				} finally {
					out.close();
				}
				return true;
			}
		}
		return false;
	}
}
