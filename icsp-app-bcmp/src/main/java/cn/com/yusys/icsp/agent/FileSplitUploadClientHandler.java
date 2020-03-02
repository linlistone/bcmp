package cn.com.yusys.icsp.agent;


import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import cn.com.yusys.icsp.agent.common.beans.FileSplitUploadInfo;
import cn.com.yusys.icsp.util.AgentUtil;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

public class FileSplitUploadClientHandler extends ChannelInboundHandlerAdapter
{
    private static final Logger logger;
    private FileSplitUploadInfo fileSplitUploadInfo;
    private int uploadSuccessCount;
    
    public FileSplitUploadClientHandler(final FileSplitUploadInfo fileSplitUploadInfo) {
        this.uploadSuccessCount = 0;
        this.fileSplitUploadInfo = fileSplitUploadInfo;
    }
    
    public void channelActive(final ChannelHandlerContext ctx) throws Exception {
        FileSplitUploadClientHandler.logger.info("\u6fc0\u6d3b\u4f20\u8f93\u901a\u9053,\u51c6\u5907\u4f20\u8f93\u672c\u5730\u6587\u4ef6");
        final FileSplitUploadInfo info = this.fileSplitUploadInfo.copy();
        info.setTransferType("readying");
        this.fileSplitUploadInfo.setTotalSize(this.fileSplitUploadInfo.getFile().length());
        ctx.writeAndFlush((Object)info);
        super.channelActive(ctx);
    }
    
    public void channelRead(final ChannelHandlerContext ctx, final Object msg) throws Exception {
        if ("ready complete".equals(msg)) {
            final int byteSize = this.fileSplitUploadInfo.getPartFileSize();
            final File file = this.fileSplitUploadInfo.getFile();
            int count = (int)Math.ceil(file.length() / byteSize);
            count = ((count < 1) ? 1 : count);
            this.fileSplitUploadInfo.setSplitCount(count);
            if (count <= 1) {
                final FileSplitUploadInfo uploadInfo = this.fileSplitUploadInfo.copy();
                uploadInfo.setTransferType("transferring");
                uploadInfo.setPartFileName(file.getName());
                new SplitRunnable((int)file.length(), 0, uploadInfo, ctx).run();
            }
            else {
                final ThreadPoolExecutor threadPool = new ThreadPoolExecutor(count, count * 3, 1L, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(count * 2));
                final int countLength = String.valueOf(count).length();
                for (int i = 0; i < count; ++i) {
                    final String partFileName = AgentUtil.buffer(100, new Object[] { file.getName(), ".", AgentUtil.leftPad(String.valueOf(i + 1), countLength, '0'), ".part" });
                    final FileSplitUploadInfo uploadInfo2 = this.fileSplitUploadInfo.copy();
                    uploadInfo2.setTransferType("transferring");
                    uploadInfo2.setPartFileName(partFileName);
                    final int available = (i == count - 1) ? ((int)Math.min(byteSize, file.length() - i * byteSize)) : byteSize;
                    threadPool.execute(new SplitRunnable(available, i * byteSize, uploadInfo2, ctx));
                }
                threadPool.shutdown();
            }
            ctx.flush();
        }
        else if ("write complete".equals(msg)) {
            ++this.uploadSuccessCount;
            if (this.uploadSuccessCount == this.fileSplitUploadInfo.getSplitCount()) {
                final FileSplitUploadInfo endInfo = this.fileSplitUploadInfo.copy();
                endInfo.setTransferType("ending");
                ctx.writeAndFlush((Object)endInfo);
            }
        }
        else {
            ctx.close();
        }
        super.channelRead(ctx, msg);
    }
    
    public void exceptionCaught(final ChannelHandlerContext ctx, final Throwable cause) throws Exception {
        FileSplitUploadClientHandler.logger.error("\u4f20\u8f93\u6587\u4ef6\u5f02\u5e38!");
        super.exceptionCaught(ctx, cause);
        if (ctx.channel().isActive()) {
            ctx.close();
        }
    }
    
    static {
        logger = LoggerFactory.getLogger((Class)FileSplitUploadClientHandler.class);
    }
    
    private class SplitRunnable implements Runnable
    {
        int byteSize;
        FileSplitUploadInfo fileInfo;
        int startPos;
        ChannelHandlerContext ctx;
        
        public SplitRunnable(final int byteSize, final int startPos, final FileSplitUploadInfo fileSplitUploadInfo, final ChannelHandlerContext ctx) {
            this.startPos = startPos;
            this.byteSize = byteSize;
            this.fileInfo = fileSplitUploadInfo;
            this.ctx = ctx;
        }
        
        @Override
        public void run() {
            try (final RandomAccessFile raf = new RandomAccessFile(this.fileInfo.getFile(), "r")) {
                raf.seek(this.startPos);
                final byte[] b = new byte[this.byteSize];
                final int readSize = raf.read(b);
                this.fileInfo.setPartFileSize(readSize);
                this.fileInfo.setBytes(b);
                this.fileInfo.setStartPos(this.startPos);
                this.ctx.writeAndFlush((Object)this.fileInfo);
                FileSplitUploadClientHandler.logger.info("\u6587\u4ef6{}\u62c6\u5206\u6587\u4ef6{}\u5f00\u59cb\u4e0a\u4f20\u7ed3\u675f", (Object)this.fileInfo.getFile().getName(), (Object)this.fileInfo.getPartFileName());
            }
            catch (IOException e) {
                FileSplitUploadClientHandler.logger.error("\u62c6\u5206\u6587\u4ef6\u4e0a\u4f20\u5f02\u5e38! cause by:{}", e.getCause());
            }
        }
    }
}
