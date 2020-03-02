package cn.com.yusys.icsp.agent;

import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.yusys.icsp.agent.common.beans.FileUploadInfo;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

class FileUploadClientHandler extends ChannelInboundHandlerAdapter {
	private static final int M = 1048576;
	private static final Logger logger = LoggerFactory.getLogger(FileUploadClientHandler.class);
	private FileUploadInfo fileUploadInfo;
	private InputStream inputStream;
	public RandomAccessFile randomAccessFile;
	private boolean localeMode;
	private volatile int start;
	private volatile int lastLength;
	private int byteRead;
	boolean complete;
	private int byteLength;

	public FileUploadClientHandler(final FileUploadInfo uploadInfo) {
		this.start = 0;
		this.lastLength = 0;
		this.complete = false;
		this.byteLength = 1048576;
		this.fileUploadInfo = uploadInfo;
		this.inputStream = uploadInfo.getInputStream();
	}

	public void channelActive(final ChannelHandlerContext ctx) throws Exception {
		if (Objects.nonNull(this.fileUploadInfo.getFile())) {
			this.localeMode = true;
			this.randomAccessFile = new RandomAccessFile(this.fileUploadInfo.getFile(), "r");
			this.lastLength = (int) this.randomAccessFile.length() / 10;
			logger.info("�����ͨ��,׼�����䱾���ļ�");
		} else {
			logger.info("�����ͨ��,��ȡ���������д���");
		}
		this.fileUploadInfo.setStartPos(0);
		ctx.writeAndFlush((Object) this.fileUploadInfo);
	}

	public void channelRead(final ChannelHandlerContext ctx, final Object msg) throws Exception {
		if (msg instanceof Integer) {
			if (this.localeMode) {
				this.readLocalFile(ctx, (Integer) msg);
			} else {
				this.readRemoteFile(ctx, (Integer) msg);
			}
		} else if (msg instanceof String) {
			try {
				ctx.writeAndFlush(msg);
			} catch (Exception e) {
				logger.error(e.getMessage(), (Throwable) e);
			}
			logger.info("response echo msg:{}", (Object) msg);
			this.fileUploadInfo.setResMsg((String) msg);
			ctx.close();
		}
		super.channelRead(ctx, msg);
	}

	void readRemoteFile(final ChannelHandlerContext ctx, final Integer msg) throws IOException {
		this.start = msg;
		if (this.start != -1) {
			final byte[] bytes = new byte[this.byteLength];
			this.lastLength = this.inputStream.read(bytes);
			if (this.lastLength <= -1) {
				this.complete = true;
			} else {
				if (this.lastLength < this.byteLength) {
					final byte[] actualBytes = new byte[this.lastLength];
					System.arraycopy(bytes, 0, actualBytes, 0, this.lastLength);
					this.fileUploadInfo.setBytes(actualBytes);
				} else {
					this.fileUploadInfo.setBytes(bytes);
				}
				this.fileUploadInfo.setLength(this.lastLength);
				this.byteRead = this.start + this.lastLength;
				this.fileUploadInfo.setEndPos(this.byteRead);
				logger.info("�Ѵ����ļ���С:{}M", (Object) (this.byteRead / 1048576));
				ctx.writeAndFlush((Object) this.fileUploadInfo);
			}
		} else {
			this.complete = true;
		}
		if (this.complete) {
			try {
				this.inputStream.close();
			} catch (IOException e) {
				logger.error(e.getMessage());
			}
			logger.info("�������,�ܴ�С:{} M", (Object) (this.byteRead / 1048576));
			this.fileUploadInfo.setLength(0);
			this.fileUploadInfo.setBytes((byte[]) null);
			ctx.writeAndFlush((Object) this.fileUploadInfo);
			ctx.close();
		}
	}

	void readLocalFile(final ChannelHandlerContext ctx, final Integer msg) throws IOException {
		this.start = msg;
		if (this.start != -1) {
			(this.randomAccessFile = new RandomAccessFile(this.fileUploadInfo.getFile(), "r")).seek(this.start);
			final int a = (int) (this.randomAccessFile.length() - this.start);
			final int b = (int) (this.randomAccessFile.length() / 10L);
			if (a < b) {
				this.lastLength = a;
			}
			logger.debug("�ļ�[{}], �鳤�ȣ�{}, Ԥ�����ȡ����{}", new Object[] { this.fileUploadInfo.getFileName(), a, b });
			final byte[] bytes = new byte[this.lastLength];
			final int len;
			if ((len = this.randomAccessFile.read(bytes)) != -1 && this.randomAccessFile.length() - this.start > 0L) {
				logger.debug("�ļ�[{}], ���ζ�ȡ�ĳ��ȣ�{}", (Object) this.fileUploadInfo.getFileName(), (Object) bytes.length);
				this.fileUploadInfo.setLength(len);
				this.byteRead = this.start + len;
				this.fileUploadInfo.setEndPos(this.byteRead);
				this.fileUploadInfo.setBytes(bytes);
				ctx.writeAndFlush((Object) this.fileUploadInfo);
			} else {
				this.randomAccessFile.close();
				this.fileUploadInfo.setLength(0);
				this.fileUploadInfo.setBytes((byte[]) null);
				ctx.writeAndFlush((Object) this.fileUploadInfo);
				ctx.close();
				logger.info("�ļ�[{}]�Ѿ���ȡ���!", (Object) this.fileUploadInfo.getFileName());
			}
		}
	}

	public void exceptionCaught(final ChannelHandlerContext ctx, final Throwable cause) throws Exception {
		logger.error("�����ļ��쳣!");
		super.exceptionCaught(ctx, cause);
	}

}
