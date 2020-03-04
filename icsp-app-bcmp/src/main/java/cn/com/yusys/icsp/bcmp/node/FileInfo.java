package cn.com.yusys.icsp.bcmp.node;

import java.util.Date;

/**
 * 文件信息
 * 
 * @author 江成
 * 
 * 
 */
public class FileInfo {

	/**
	 * 文件名
	 */
	private String name;

	/**
	 * 文件路径
	 */
	private String path;

	/**
	 * 父路径
	 */
	private String parentPath;

	/**
	 * 是否为文件夹
	 */
	private boolean isDirectory;

	/**
	 * 大小
	 */
	private long size;

	/**
	 * 最后修改时间
	 */
	private Date lastModified;

	/**
	 * 获取文件名
	 * 
	 * @return
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置文件地址
	 * 
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 获取文件路径
	 * 
	 * @return
	 */
	public String getPath() {
		return path;
	}

	/**
	 * 设置文件路径
	 * 
	 * @param path
	 */
	public void setPath(String path) {
		this.path = path;
	}

	/**
	 * 获取父路径
	 * 
	 * @return
	 */
	public String getParentPath() {
		return parentPath;
	}

	/**
	 * 设置父路径
	 * 
	 * @param parentPath
	 */
	public void setParentPath(String parentPath) {
		this.parentPath = parentPath;
	}

	/**
	 * 判断是否为文件夹
	 * 
	 * @return
	 */
	public boolean isDirectory() {
		return isDirectory;
	}

	/**
	 * 设置是否为文件夹
	 * 
	 * @param isDirectory
	 */
	public void setDirectory(boolean isDirectory) {
		this.isDirectory = isDirectory;
	}

	/**
	 * 获取大小
	 * 
	 * @return
	 */
	public long getSize() {
		return size;
	}

	/**
	 * 设置大小
	 * 
	 * @param size
	 */
	public void setSize(long size) {
		this.size = size;
	}

	/**
	 * 获取最后修改时间
	 * 
	 * @return
	 */
	public Date getLastModified() {
		return lastModified;
	}

	/**
	 * 设置最后修改时间
	 * 
	 * @param lastModified
	 */
	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	/**
	 * to string
	 */
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("[");
		sb.append("name:");
		sb.append(name);
		sb.append(",path:");
		sb.append(path);
		sb.append(",parentPath:");
		sb.append(parentPath);
		sb.append(",size:");
		sb.append(size);
		sb.append(",isDirectory:");
		sb.append(isDirectory);
		sb.append(",lastModified:");
		sb.append(lastModified);
		sb.append("]");
		return sb.toString();
	}

}
