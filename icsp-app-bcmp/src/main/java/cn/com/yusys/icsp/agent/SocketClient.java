package cn.com.yusys.icsp.agent;

import cn.com.yusys.icsp.agent.common.beans.FileSplitUploadInfo;
import cn.com.yusys.icsp.agent.common.beans.FileUploadInfo;

public class SocketClient {
	public static final void uploadFile(final String host, final int port, final FileUploadInfo info) throws Exception {
		if (!info.getFile().exists()) {
			throw new Exception("文件" + info.getFile().getAbsolutePath() + "不存在!");
		}
		new NettyFileHandlerClient().upload(host, port, info);
	}

	public static final void uploadFile(final String host, final int port, final FileUploadInfo info,
										final boolean isSplit) throws Exception {
		if (isSplit) {
			final FileSplitUploadInfo splitInfo = new FileSplitUploadInfo(info.getFile());
			splitInfo.setFileDir(info.getFileDir());
			splitInfo.setFileName(info.getFileName());
			splitInfo.setPartFileSize(15728640);
			splitFileUpload(host, port, splitInfo);
		} else {
			uploadFile(host, port, info);
		}
	}

	public static final void splitFileUpload(final String host, final int port, final FileSplitUploadInfo info)
			throws Exception {
		if (!info.getFile().exists()) {
			throw new Exception("文件" + info.getFile().getAbsolutePath() + "不存在!");
		}
		new NettyFileHandlerClient().upload(host, port, info);
	}
}
