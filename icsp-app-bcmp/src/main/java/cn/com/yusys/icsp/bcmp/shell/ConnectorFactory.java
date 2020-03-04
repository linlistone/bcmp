package cn.com.yusys.icsp.bcmp.shell;


import cn.com.yusys.icsp.bcmp.constant.Protocol;
import cn.com.yusys.icsp.bcmp.shell.ssh.SSH2Connector;
import cn.com.yusys.icsp.bcmp.shell.telnet.TelnetConnector;

/**
 * connector factory
 * 
 * @author 江成
 * 
 */
public class ConnectorFactory {

	/**
	 * 获取连接器
	 * 
	 * @param protocol
	 * @param netArgs
	 * @return
	 */
	public static IConnector getConnector(Protocol protocol, NetArgs netArgs) {
		IConnector connector=null;
		if(protocol==Protocol.SSH){
			connector=new SSH2Connector();
			connector.init(netArgs);
		}else{
			connector=new TelnetConnector();
			connector.init(netArgs);
		}
		return connector;
	}
}
