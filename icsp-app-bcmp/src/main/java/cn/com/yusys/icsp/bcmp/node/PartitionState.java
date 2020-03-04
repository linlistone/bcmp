package cn.com.yusys.icsp.bcmp.node;

import java.util.HashMap;
import java.util.Map;

/**
 * 分区状态
 * 
 * @author 江成
 * 
 */
public class PartitionState {

	/**
	 * 文件系统
	 */
	private String fileSystem;

	/**
	 * 挂载点
	 */
	private String mountedPoint;

	/**
	 * 总空间
	 */
	private long totalSpace;

	/**
	 * 已使用空间
	 */
	private long usedSpace;

	/**
	 * 使用比率
	 */
	private double usedRatio;

	/**
	 * 获取使用率
	 * 
	 * @return
	 */
	public double getUsedRatio() {
		return this.usedRatio;
	}

	/**
	 * 设置使用率
	 * 
	 * @param usedRatio
	 */
	public void setUsedRatio(double usedRatio) {
		this.usedRatio = usedRatio;
	}

	/**
	 * 获取文件系统名称
	 * 
	 * @return
	 */
	public String getFileSystem() {
		return this.fileSystem;
	}

	/**
	 * 设置文件系统名称
	 * 
	 * @param fileSystem
	 */
	public void setFileSystem(String fileSystem) {
		this.fileSystem = fileSystem;
	}

	/**
	 * 获取挂载点名称
	 * 
	 * @return
	 */
	public String getMountedPoint() {
		return this.mountedPoint;
	}

	/**
	 * 设置挂载点名称
	 * 
	 * @param mountedPoint
	 */
	public void setMountedPoint(String mountedPoint) {
		this.mountedPoint = mountedPoint;
	}

	/**
	 * 获取总空间大小(单位M)
	 * 
	 * @return
	 */
	public long getTotalSpace() {
		return totalSpace;
	}

	/**
	 * 设置总空间大小(单位M)
	 * 
	 * @param totalSpace
	 */
	public void setTotalSpace(long totalSpace) {
		this.totalSpace = totalSpace;
	}

	/**
	 * 获取已经使用空间大小(单位M)
	 * 
	 * @return
	 */
	public long getUsedSpace() {
		return usedSpace;
	}

	/**
	 * 设置已经使用空间大小(单位M)
	 * 
	 * @param usedSpace
	 */
	public void setUsedSpace(long usedSpace) {
		this.usedSpace = usedSpace;
	}

	public Map<String,Object> toMap(){
		Map<String,Object > map = new HashMap<String, Object>();
		
		map.put("usedRatio", this.usedRatio);
		map.put("usedSpace", this.usedSpace);
		map.put("totalSpace", this.totalSpace);
		map.put("mountedPoint", this.mountedPoint);
		map.put("fileSystem", this.fileSystem);
		
		return map;
	}
}
