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
    private static final Logger logger = LoggerFactory.getLogger(AgentMXBeanFactory.class);
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

    public JMXConnector builder(final String ip, final String rmiPort) throws Exception {
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
            final JMXConnector jmxConnector = this.builder(url);
            final JMXConnector oldJMXConnector = jmxConnectors.put(url, jmxConnector);
            if (Objects.nonNull(oldJMXConnector)) {
                oldJMXConnector.close();
            }
        }
        return jmxConnectors.get(url);
    }

    private JMXConnector builder(final String url) throws Exception {
        final JMXServiceURL jmxServiceURL = new JMXServiceURL(url);
        return JMXConnectorFactory.connect(jmxServiceURL);
    }

    public AgentManagementMXBean agentMXBean(final String ip, final String rmiPort) throws Exception {
        final JMXConnector jmxConnector = this.builder(ip, rmiPort);
        final MBeanServerConnection mbsc = jmxConnector.getMBeanServerConnection();
        final ObjectName mBeanName = new ObjectName("Agent:name=AgentManagement");
        final AgentManagementMXBean proxy = JMX.newMXBeanProxy(mbsc, mBeanName, AgentManagementMXBean.class, false);
        this.cacheMBeanConnector(proxy.toString(), jmxConnector);
        return proxy;
    }

    public ApplicationManagementMXBean applicationMXBean(final String ip, final String rmiPort) throws Exception {
        final JMXConnector jmxConnector = this.builder(ip, rmiPort);
        final MBeanServerConnection mbsc = jmxConnector.getMBeanServerConnection();
        final ObjectName mBeanName = new ObjectName("Agent:name=ApplicationManagement");
        final ApplicationManagementMXBean proxy = JMX.newMXBeanProxy(mbsc, mBeanName, ApplicationManagementMXBean.class,
                false);
        this.cacheMBeanConnector(proxy.toString(), jmxConnector);
        return proxy;
    }

    private void cacheMBeanConnector(final String mBeanName, final JMXConnector jmxConnector) {
        if (isShortConnect) {
            final JMXConnector oldJMXConnector = mBeanConnects.put(mBeanName, jmxConnector);
            if (Objects.nonNull(oldJMXConnector) && oldJMXConnector.hashCode() != jmxConnector.hashCode()) {
                try {
                    oldJMXConnector.close();
                } catch (IOException e) {
                    logger.error("关闭JmxConnect异常! cause by:{}", (Object) e.getMessage());
                }
            }
        }
    }

    public void closeJMXConnector(final Object mBean) {
        if (Objects.isNull(mBean)) {
            return;
        }
        final String key = mBean.toString();
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
