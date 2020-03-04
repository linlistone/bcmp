package cn.com.yusys.icsp.bcmp.node;

/**
 * 文件系统访问器
 * 
 * @author 江成
 * 
 */
public interface IFileSystemAccessor {

	/**
	 * 列举文件
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public FileInfo[] list(String path) throws Exception;

	/**
	 * 获取文件
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public byte[] get(String path) throws Exception;
	
	/**
	 * 获取文件
	 * 
	 * @param fileInfo
	 * @return
	 * @throws Exception
	 */
	public byte[] get(FileInfo fileInfo) throws Exception;
}
