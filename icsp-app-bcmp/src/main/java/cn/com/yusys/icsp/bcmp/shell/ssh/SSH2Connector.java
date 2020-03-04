/**
 * Special Declaration: These technical material reserved as the technical 
 * secrets by Bankit TECHNOLOGY have been protected by the "Copyright Law" 
 * "ordinances on Protection of Computer Software" and other relevant 
 * administrative regulations and international treaties. Without the written 
 * permission of the Company, no person may use (including but not limited to 
 * the illegal copy, distribute, display, image, upload, and download) and 
 * disclose the above technical documents to any third party. Otherwise, any 
 * infringer shall afford the legal liability to the company.
 *
 * 特别声明：本技术材料受《中华人民共和国著作权法》、《计算机软件保护条例》
 * 等法律、法规、行政规章以及有关国际条约的保护，浙江宇信班克信息技术有限公
 * 司享有知识产权、保留一切权利并视其为技术秘密。未经本公司书面许可，任何人
 * 不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使
 * 用，不得向第三方泄露、透露、披露。否则，本公司将依法追究侵权者的法律责任。
 * 特此声明！
 *
 * Copyright(C) 2012 Bankit Tech, All rights reserved.
 */
/*
 * cn.com.bankit.yuvt.net.ssh.SSHConnector.java
 * Created by Administrator @ 2012-1-12 下午3:22:36
 */

package cn.com.yusys.icsp.bcmp.shell.ssh;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;


import cn.com.yusys.icsp.bcmp.shell.IConnector;
import cn.com.yusys.icsp.bcmp.shell.NetArgs;
import com.jcraft.jsch.Channel;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * SSH2 Connector
 * 
 * @author 江成
 * 
 */
public class SSH2Connector implements IConnector {

	private static Logger logger = LoggerFactory.getLogger(SSH2Connector.class);


	/**
	 * 网络参数
	 */
	private NetArgs netArgs;

	/**
	 * 输出流
	 */
	private OutputStream out;

	/**
	 * 输入流
	 */
	private InputStream in;

	/**
	 * 会话
	 */
	private Session session;

	/**
	 * 通道
	 */
	private Channel channel;

	/**
	 * 初始化
	 */
	public void init(NetArgs agrs) {
		netArgs = agrs;
	}

	/**
	 * disconnect
	 */
	public void disconnect() throws IOException {
		// 关闭输入流
		if (in != null) {
			in.close();
		}
		// 关闭输出流
		if (out != null) {
			out.close();
		}
		// 关闭session
		if (session != null && session.isConnected()) {
			session.disconnect();
		}
		// 关闭通道
		if (channel != null && channel.isClosed()) {
			channel.disconnect();
		}
	}

	/**
	 * connect
	 */
	public boolean connect() throws IOException {
		JSch jsch = new JSch();
		try {
			// 设置用户名，服务器IP，端口号
			logger.debug("正在建立连接 ip=" + netArgs.ip + " ,port="
					+ netArgs.port);

			// 用户名的key和value，对应get方法和界面中的值。
			session = jsch.getSession(netArgs.userName, netArgs.ip,
					netArgs.port);

			// 设置密码
			logger.debug("正在认证  userName=" + netArgs.userName);
			
			session.setPassword(netArgs.password);

			// 设置超时
			session.setTimeout(netArgs.timeout);

			// Try to ssh from the command line and accept the public key
			session.setConfig("StrictHostKeyChecking", "no");

			// 尝试连接
			session.connect();
		} catch (JSchException e) {
			logger.debug(e.getMessage(), e);
			// 断开连接
			disconnect();
			return false;
		}

		try {
			// 建立通道
			channel = session.openChannel("shell");
			in = channel.getInputStream();
			out = channel.getOutputStream();
			channel.connect();
		} catch (JSchException e) {
			logger.debug(e.getMessage(), e);
			// 断开连接
			disconnect();
			return false;
		}

		logger.debug("连接成功 ip=" + netArgs.ip + " ,port=" + netArgs.port);
		return true;
	}

	/**
	 * read
	 */
	public int read(byte[] buff) throws IOException {
		int n = in.read(buff);
		return n;
	}

	/**
	 * read
	 */
	public byte[] read() throws IOException {
		ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
		if (in.available() > 0) {
			byte[] buff = new byte[in.available()];
			in.read(buff);
			byteOut.write(buff);
		}
		return byteOut.toByteArray();
	}

	/**
	 * write
	 */
	public void write(byte[] bytes) throws IOException {
		out.write(bytes);
		out.flush();
	}

	/**
	 * is connected
	 */
	public boolean isConnected() {
		if (session != null) {
			return session.isConnected();
		}
		return false;
	}

	/**
	 * 获取网络参数
	 * 
	 * @return
	 */
	public NetArgs getNetArgs() {
		return netArgs;
	}

	/**
	 * 设置网络参数
	 * 
	 * @param netArgs
	 */
	public void setNetArgs(NetArgs netArgs) {
		this.netArgs = netArgs;
	}

}
