package cn.com.yusys.icsp.agent.common.beans;


import java.io.*;

public class FileUploadInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	private transient InputStream inputStream;
	private transient File file;
	private String fileDir;
	private String fileName;
	private int startPos;
	private int length;
	private int endPos;
	private byte[] bytes;
	private String resMsg;

	public FileUploadInfo() {
		this.resMsg = "";
	}

	public FileUploadInfo(final InputStream inputStream) {
		this.resMsg = "";
		this.inputStream = inputStream;
	}

	public FileUploadInfo(final File file) {
		this.resMsg = "";
		this.file = file;
	}

	public InputStream getInputStream() {
		return this.inputStream;
	}

	public File getFile() {
		return this.file;
	}

	public String getFileName() {
		return this.fileName;
	}

	public void setFileName(final String fileName) {
		this.fileName = fileName;
	}

	public int getStartPos() {
		return this.startPos;
	}

	public void setStartPos(final int startPos) {
		this.startPos = startPos;
	}

	public int getLength() {
		return this.length;
	}

	public void setLength(final int length) {
		this.length = length;
	}

	public byte[] getBytes() {
		return this.bytes;
	}

	public void setBytes(final byte[] bytes) {
		this.bytes = bytes;
		if (bytes != null) {
			this.length = this.bytes.length;
		}
	}

	public int getEndPos() {
		return this.endPos;
	}

	public void setEndPos(final int endPos) {
		this.endPos = endPos;
	}

	public String getFileDir() {
		return this.fileDir;
	}

	public void setFileDir(final String fileDir) {
		this.fileDir = fileDir;
	}

	public String getResMsg() {
		return this.resMsg;
	}

	public void setResMsg(final String resMsg) {
		this.resMsg = resMsg;
	}
}
