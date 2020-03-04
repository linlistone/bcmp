package cn.com.yusys.icsp.bcmp.ftp;

import cn.com.yusys.icsp.bcmp.constant.Protocol;

/**
 * FTP工厂
 * 
 * @author 江成
 * 
 */
public class FtpFactory {
	/**
	 * 获取FTP Client
	 * 
	 * @param protocol
	 * @return
	 */
	public static IFtpClient getFtpClient(Protocol protocol) {
		IFtpClient ftpClient = null;
		if (protocol == Protocol.SSH) {
			ftpClient = new SftpClient();
		} else if(protocol == Protocol.TELNET){
			ftpClient = new FtpClient();
		}else if(protocol == Protocol.AGENT) {
		}
		return ftpClient;
	}
}
