package cn.com.yusys.icsp.bcmp.ftp;

import java.io.InputStream;

/**
 * FTP客户端
 * 
 * @author 江成
 * 
 */
public interface IFtpClient {

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
                           String password, int timeout) throws Exception;

	/**
	 * 是否连接中
	 * 
	 * @return
	 */
	public boolean isConnected();

	/**
	 * 断开连接
	 * 
	 * @return
	 */
	public boolean disconnect() throws Exception;

	/**
	 * 更改为当前工作目录的父目录
	 * 
	 * @return
	 * @throws Exception
	 */
	public boolean changeToParentDirectory() throws Exception;

	/**
	 * 改变工作目录
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public boolean changeWorkingDirectory(String path) throws Exception;

	/**
	 * 上送文件
	 * 
	 * @param fileName
	 * @param input
	 * @return
	 * @throws Exception
	 */
	public boolean uploadFile(String fileName, InputStream input)
			throws Exception;

	/**
	 * 下载文件
	 * 
	 * @param remotePath
	 * @param fileName
	 * @param localPath
	 * @return
	 */
	public boolean downloadFile(String remotePath, String fileName,
                                String localPath) throws Exception;
}
