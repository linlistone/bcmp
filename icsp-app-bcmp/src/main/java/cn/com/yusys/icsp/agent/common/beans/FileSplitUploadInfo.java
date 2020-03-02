package cn.com.yusys.icsp.agent.common.beans;


import java.io.*;

public class FileSplitUploadInfo extends FileUploadInfo implements Serializable
{
    private static final long serialVersionUID = 1L;
    private int splitCount;
    private int partFileSize;
    private String transferType;
    private long totalSize;
    private String partFileName;
    
    public FileSplitUploadInfo(final File file) {
        super(file);
    }
    
    public String getTransferType() {
        return this.transferType;
    }
    
    public void setTransferType(final String transferType) {
        this.transferType = transferType;
    }
    
    public long getTotalSize() {
        return this.totalSize;
    }
    
    public void setTotalSize(final long totalSize) {
        this.totalSize = totalSize;
    }
    
    public static long getSerialversionuid() {
        return 1L;
    }
    
    public int getPartFileSize() {
        return this.partFileSize;
    }
    
    public void setPartFileSize(final int partFileSize) {
        this.partFileSize = partFileSize;
    }
    
    public int getSplitCount() {
        return this.splitCount;
    }
    
    public void setSplitCount(final int splitCount) {
        this.splitCount = splitCount;
    }
    
    public String getPartFileName() {
        return this.partFileName;
    }
    
    public void setPartFileName(final String partFileName) {
        this.partFileName = partFileName;
    }
    
    public FileSplitUploadInfo copy() {
        final FileSplitUploadInfo info = new FileSplitUploadInfo(this.getFile());
        info.setFileDir(this.getFileDir());
        info.setFileName(this.getFileName());
        info.setPartFileSize(this.getPartFileSize());
        info.setTotalSize(this.getTotalSize());
        info.setSplitCount(this.getSplitCount());
        return info;
    }
}
