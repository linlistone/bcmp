package cn.com.yusys.icsp.bcmp.shell;

import java.io.IOException;

/**
 * 连接器
 * 
 * @author 江成
 * 
 */
public interface IConnector {

	/**
	 * 初始化
	 */
	public void init(NetArgs netArgs);

	/**
	 * 连接
	 * 
	 * @return
	 */
	public boolean connect() throws Exception;

	/**
	 * disconnect
	 */
	public void disconnect() throws IOException;

	/**
	 * is connected
	 */
	public boolean isConnected();

	/**
	 * read
	 */
	public int read(byte[] buff) throws IOException;

	/**
	 * read
	 */
	public byte[] read() throws IOException;

	/**
	 * write
	 */
	public void write(byte[] bytes) throws IOException;

}
