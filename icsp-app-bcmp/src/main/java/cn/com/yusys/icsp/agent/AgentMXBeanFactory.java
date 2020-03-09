package cn.com.yusys.icsp.agent;

import cn.com.yusys.icsp.agent.common.mxbean.AgentManagementMXBean;
import cn.com.yusys.icsp.agent.common.mxbean.ApplicationManagementMXBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.management.JMX;
import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
import javax.management.remote.JMXConnector;
import javax.management.remote.JMXConnectorFactory;
import javax.management.remote.JMXServiceURL;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

public class AgentMXBeanFactory {
    private static  Logger logger = LoggerFactory.getLogger(AgentMXBeanFactory.class);
    ;
    static boolean isShortConnect = true;
    private static Map<String, JMXConnector> jmxConnectors = null;
    private static Map<String, JMXConnector> mBeanConnects = null;
    private static AgentMXBeanFactory instance = null;

    private AgentMXBeanFactory() {
        if (!isShortConnect) {
            jmxConnectors = new ConcurrentHashMap<String, JMXConnector>();
        } else {
            mBeanConnects = new ConcurrentHashMap<String, JMXConnector>();
        }
    }

    public static AgentMXBeanFactory instance() {
        if (instance == null) {
            instance = new AgentMXBeanFactory();
        }
        return instance;
    }

    public JMXConnector builder( String ip,  String rmiPort) throws Exception {
        //String url = "service:jmx:rmi:///jndi/rmi://" + ip + ":" + rmiPort + "/jmxrmi";
        StringBuffer sb = new StringBuffer();
        sb.append("service:jmx:rmi://");
        sb.append(ip);
        sb.append(":");
        sb.append(rmiPort);
        sb.append("/jndi/rmi://");
        sb.append(ip);
        sb.append(":");
        sb.append(rmiPort);
        sb.append("/jmxrmi");
        String url = sb.toString();
        logger.info("创建连接的地址为:{}", (Object) url);
        if (isShortConnect) {
            return this.builder(url);
        }
        if (!jmxConnectors.containsKey(url)) {
             JMXConnector jmxConnector = this.builder(url);
             JMXConnector oldJMXConnector = jmxConnectors.put(url, jmxConnector);
            if (Objects.nonNull(oldJMXConnector)) {
                oldJMXConnector.close();
            }
        }
        return jmxConnectors.get(url);
    }

    private JMXConnector builder( String url) throws Exception {
         JMXServiceURL jmxServiceURL = new JMXServiceURL(url);
        return JMXConnectorFactory.connect(jmxServiceURL);
    }

    public AgentManagementMXBean agentMXBean( String ip,  String rmiPort) throws Exception {
         JMXConnector jmxConnector = this.builder(ip, rmiPort);
         MBeanServerConnection mbsc = jmxConnector.getMBeanServerConnection();
         ObjectName mBeanName = new ObjectName("Agent:name=AgentManagement");
         AgentManagementMXBean proxy = JMX.newMXBeanProxy(mbsc, mBeanName, AgentManagementMXBean.class, false);
        this.cacheMBeanConnector(proxy.toString(), jmxConnector);
        return proxy;
    }

    public ApplicationManagementMXBean applicationMXBean( String ip,  String rmiPort) throws Exception {
         JMXConnector jmxConnector = this.builder(ip, rmiPort);
         MBeanServerConnection mbsc = jmxConnector.getMBeanServerConnection();
         ObjectName mBeanName = new ObjectName("Agent:name=ApplicationManagement");
         ApplicationManagementMXBean proxy = JMX.newMXBeanProxy(mbsc, mBeanName, ApplicationManagementMXBean.class,
                false);
        this.cacheMBeanConnector(proxy.toString(), jmxConnector);
        return proxy;
    }

    private void cacheMBeanConnector( String mBeanName,  JMXConnector jmxConnector) {
        if (isShortConnect) {
             JMXConnector oldJMXConnector = mBeanConnects.put(mBeanName, jmxConnector);
            if (Objects.nonNull(oldJMXConnector) && oldJMXConnector.hashCode() != jmxConnector.hashCode()) {
                try {
                    oldJMXConnector.close();
                } catch (IOException e) {
                    logger.error("关闭JmxConnect异常! cause by:{}", (Object) e.getMessage());
                }
            }
        }
    }

    public void closeJMXConnector( Object mBean) {
        if (Objects.isNull(mBean)) {
            return;
        }
         String key = mBean.toString();
        if (isShortConnect && mBeanConnects.containsKey(key)) {
            try {
                mBeanConnects.get(key).close();
                mBeanConnects.remove(key);
            } catch (IOException e) {
                logger.error("关闭JmxConnect异常! cause by:{}", (Object) e.getMessage());
            }
        }
    }

}
