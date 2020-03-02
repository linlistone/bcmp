package cn.com.yusys.icsp.agent;

import cn.com.yusys.icsp.agent.common.beans.FileSplitUploadInfo;
import cn.com.yusys.icsp.agent.common.beans.FileUploadInfo;
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.*;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.serialization.ClassResolvers;
import io.netty.handler.codec.serialization.ObjectDecoder;
import io.netty.handler.codec.serialization.ObjectEncoder;

class NettyFileHandlerClient {
	public void upload(final String host, final int port, final FileUploadInfo info) throws Exception {
		final EventLoopGroup group = (EventLoopGroup) new NioEventLoopGroup();
		try {
			final Bootstrap b = new Bootstrap();
			b.group(group); // 通过Bootstrap的group方法，设置（1）中初始化的"线程池"；
			b.channel(NioSocketChannel.class); // 指定通道channel的类型，由于是客户端，故而是NioSocketChannel；
			b.option(ChannelOption.TCP_NODELAY, true); // 设置SocketChannel的选项
			b.handler(new ChannelInitializer<Channel>() {// 设置SocketChannel的处理器， 其内部是实际业务开发的"主战场"
				protected void initChannel(final Channel ch) {
					ch.pipeline().addLast(new ChannelHandler[] { new ObjectEncoder() });
					ch.pipeline().addLast(new ChannelHandler[] {
							new ObjectDecoder(ClassResolvers.weakCachingConcurrentResolver((ClassLoader) null)) });
					ch.pipeline().addLast(new ChannelHandler[] { new FileUploadClientHandler(info) });
				}
			});
			final ChannelFuture f = b.connect(host, port).sync();
			f.channel().closeFuture().sync();
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} finally {
			group.shutdownGracefully();
		}
	}

	public void upload(final String host, final int port, final FileSplitUploadInfo info) throws Exception {
		final EventLoopGroup group = (EventLoopGroup) new NioEventLoopGroup();
		try {
			final Bootstrap b = new Bootstrap();

			b.group(group); // 通过Bootstrap的group方法，设置（1）中初始化的"线程池"；
			b.channel(NioSocketChannel.class); // 指定通道channel的类型，由于是客户端，故而是NioSocketChannel；
			b.option(ChannelOption.TCP_NODELAY, true); // 设置SocketChannel的选项
			b.handler(new ChannelInitializer<Channel>() {// 设置SocketChannel的处理器， 其内部是实际业务开发的"主战场"
				protected void initChannel(final Channel ch) {
					ch.pipeline().addLast(new ChannelHandler[] { new ObjectEncoder() });
					ch.pipeline().addLast(new ChannelHandler[] {
							new ObjectDecoder(ClassResolvers.weakCachingConcurrentResolver((ClassLoader) null)) });
					ch.pipeline().addLast(new ChannelHandler[] { new FileSplitUploadClientHandler(info) });
				}
			});
			final ChannelFuture f = b.connect(host, port).sync();
			f.channel().closeFuture().sync();
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} finally {
			group.shutdownGracefully();
		}
	}
}
