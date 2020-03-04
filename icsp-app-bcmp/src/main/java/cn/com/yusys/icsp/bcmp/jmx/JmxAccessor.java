package cn.com.yusys.icsp.bcmp.jmx;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.util.List;
import javax.management.Attribute;
import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
import javax.management.remote.JMXConnector;
import javax.management.remote.JMXConnectorFactory;
import javax.management.remote.JMXServiceURL;

/**
 * JMX访问器
 *
 * @author 江成
 */
public class JmxAccessor {

    private static Logger logger = LoggerFactory.getLogger(JmxAccessor.class);


    /**
     * JMX连接器
     */
    private JMXConnector jmxConnector;

    /**
     * 连接器
     */
    private MBeanServerConnection connector;

    /**
     * 获取连接
     *
     * @param host
     * @param port
     * @param jndiPath
     * @return
     */
    private JMXConnector getMBeanServerConnection(String host, int port,
                                                  String jndiPath) {
        // 修改path
        if (!jndiPath.startsWith("/")) {
            jndiPath = "/" + jndiPath;
        }
        String url = String.format("service:jmx:rmi://%s:%s/jndi/rmi://%s:%s%s", host, port, host, port, jndiPath);

        JMXConnector jmxConnector = null;
        try {
            jmxConnector = JMXConnectorFactory.connect(new JMXServiceURL(url));
        } catch (Exception e) {
            logger.error("创建连接connector[" + url + "]失败", e);
        }
        return jmxConnector;
    }

    /**
     * 连接
     *
     * @param host
     * @param port
     * @return
     */
    public boolean connect(String host, int port) {
        this.jmxConnector = this
                .getMBeanServerConnection(host, port, "/jmxrmi");
        if (this.jmxConnector != null) {
            try {
                this.connector = this.jmxConnector.getMBeanServerConnection();
            } catch (IOException e) {
                logger.error(e.getMessage(), e);
            }
        }
        boolean res = (this.connector != null);
        return res;
    }

    /**
     * 断开连接
     *
     * @return
     */
    public boolean disconnect() {
        if (this.jmxConnector != null) {
            try {
                this.jmxConnector.close();
                return true;
            } catch (IOException e) {
                logger.error(e.getMessage(), e);
            }
        }
        return false;
    }

    /**
     * 创建signature
     *
     * @param params
     * @return
     */
    private String[] createSignature(Object[] params) {
        int len = params.length;
        String[] signature = new String[len];
        for (int i = 0; i < len; i++) {
            signature[i] = params[i].getClass().getName();
        }
        return signature;
    }

    /**
     * 调用方法
     *
     * @param objectName
     * @param actionName
     * @return
     * @throws Exception
     */
    public Object invoke(String objectName, String actionName) throws Exception {
        Object res = this.invoke(objectName, actionName, new Object[0]);
        return res;
    }

    /**
     * 调用方法
     *
     * @param objectName
     * @param actionName
     * @param params
     * @return
     * @throws Exception
     */
    public Object invoke(String objectName, String actionName, Object[] params)
            throws Exception {
        if (params == null) {
            params = new Object[0];
        }
        // 生成signature
        String[] signature = this.createSignature(params);
        // 调用action
        Object res = this.connector.invoke(new ObjectName(objectName),
                actionName, params, signature);
        return res;
    }

    /**
     * 获取对应的属性
     *
     * @param objectName
     * @param attribute
     * @return
     * @throws Exception
     */
    public Object getAttribute(String objectName, String attribute)
            throws Exception {
        Object value = this.connector.getAttribute(new ObjectName(objectName),
                attribute);
        return value;
    }

    /**
     * 设置对应的属性
     *
     * @param objectName
     * @param attribute
     * @param value
     * @throws Exception
     */
    public void setAttribute(String objectName, String attribute, Object value)
            throws Exception {
        // 定义属性
        Attribute mBeanAttr = new Attribute(attribute, value);
        // 设置属性值
        this.connector.setAttribute(new ObjectName(objectName), mBeanAttr);
    }

    /**
     * main
     *
     * @param args
     */
    public static void main(String[] args) throws Exception {
        // 定义JMX Accessor
        JmxAccessor jmxAccessor = new JmxAccessor();
        // jmxAccessor.connect("158.222.65.82", 6699);
        jmxAccessor.connect("127.0.0.1", 11189);
        // jmxAccessor.connect("158.222.2.83", 6688);

        // // 定义对象名称
        // String objectName = "Phoenix Server:type=DBMonitor";
        // // 获取DBSource名称列表
        // String[] dbSourceNames = (String[]) jmxAccessor.getAttribute(
        // objectName, "DBSourceNames");
        // for (String name : dbSourceNames) {
        // System.out.println("---------> name=" + name);
        // }
        //
        // String name = dbSourceNames[0];
        //
        // // 获取数据库池类型
        // String dbSourceType = (String) jmxAccessor.invoke(objectName,
        // "doGetDBSourceType", new Object[] { name });
        // System.out.println("-----------> dbsource type=" + dbSourceType);
        //
        // // 获取数据库类型
        // String dbType = (String) jmxAccessor.invoke(objectName,
        // "doGetDBType",
        // new Object[] { name });
        // System.out.println("-----------> db type=" + dbType);
        //
        // // 获取数据库池当前连接数
        // int num = (Integer) jmxAccessor.invoke(objectName,
        // "doGetConnectionNum", new Object[] { name });
        // System.out.println("----------> connection num=" + num);
        //
        // // 获取数据库池最大连接数
        // num = (Integer) jmxAccessor.invoke(objectName,
        // "doGetMaxConnectionNum", new Object[] { name });
        // System.out.println("----------> max connection num=" + num);
        // // 定义对象名称
        // String objectName = "java.lang:type=Runtime";
        // // 获取堆内存使用情况
        // long time = (Long) jmxAccessor.getAttribute(objectName, "Uptime");
        //
        // long secondUnit = 1000;
        // long minuteUnit = secondUnit * 60;
        // long hourUnit = minuteUnit * 60;
        // long dayUnit = hourUnit * 24;
        //
        // int day = (int) (time / dayUnit);
        // time = time - day * dayUnit;
        // int hour = (int) (time / hourUnit);
        // time = time - hour * hourUnit;
        // int minute = (int) (time / minuteUnit);
        // time = time - minute * minuteUnit;
        // int second = (int) (time / secondUnit);
        //
        // StringBuilder sb = new StringBuilder();
        // if (second != 0) {
        // sb.append(second);
        // sb.append("秒");
        // }
        //
        // if (minute != 0) {
        // sb.insert(0, "分钟");
        // sb.insert(0, minute);
        // }
        //
        // if (hour != 0) {
        // sb.insert(0, "小时");
        // sb.insert(0, hour);
        // }
        //
        // if (day != 0) {
        // sb.insert(0, "天");
        // sb.insert(0, day);
        // }
        // System.out.println(sb.toString());
        //
        // // 获取JVM输入参数
        // String[] params = (String[]) jmxAccessor.getAttribute(objectName,
        // "InputArguments");
        // System.out.println("JVM输入参数:");
        // for (String s : params) {
        // System.out.println(s);
        // }
        //
        // // 定义对象名称
        // objectName = "java.lang:type=ClassLoading";
        // // 获取当前加载的类数量
        // long count = (Integer) jmxAccessor.getAttribute(objectName,
        // "LoadedClassCount");
        // System.out.println("当前加载的类数量=" + count);
        //
        // // 获取当前加载的类数量
        // count = (Long) jmxAccessor.getAttribute(objectName,
        // "TotalLoadedClassCount");
        // System.out.println("已经加载的类数量=" + count);
        //
        // // 获取当前加载的类数量
        // count = (Long) jmxAccessor.getAttribute(objectName,
        // "UnloadedClassCount");
        // System.out.println("已经卸载的类数量=" + count);
        //
        // // 定义对象名称
        // objectName = "java.lang:type=Threading";
        // // 获取当前活动线程数
        // count = (Integer) jmxAccessor.getAttribute(objectName,
        // "ThreadCount");
        // System.out.println("当前活动线程数=" + count);
        //
        // // 获取峰值线程数
        // count = (Integer) jmxAccessor.getAttribute(objectName,
        // "PeakThreadCount");
        // System.out.println("峰值线程数=" + count);
        //
        // // 获取守护线程数
        // count = (Integer) jmxAccessor
        // .getAttribute(objectName, "DaemonThreadCount");
        // System.out.println("守护线程数=" + count);
        //
        // // 获取已经启动的线程数
        // count = (Long) jmxAccessor.getAttribute(objectName,
        // "TotalStartedThreadCount");
        // System.out.println("已经启动的线程数=" + count);

        // jmxAccessor.disconnect();

        // // 定义对象名称
        // String objectName = "java.lang:type=OperatingSystem";
        // // 获取HTTP服务端口
        // long cpu = (Long) jmxAccessor
        // .getAttribute(objectName, "ProcessCpuTime");
        // System.err.println("-----> cpu=" + cpu);
        //
        // // 获取HTTP服务端口
        // long totalPhysicalMemorySize = (Long) jmxAccessor
        // .getAttribute(objectName, "TotalPhysicalMemorySize");
        // System.err.println("-----> TotalPhysicalMemorySize=" +
        // totalPhysicalMemorySize);
        //
        // // 获取HTTP服务端口
        // long freePhysicalMemorySize = (Long) jmxAccessor
        // .getAttribute(objectName, "FreePhysicalMemorySize");
        // System.err.println("-----> FreePhysicalMemorySize=" +
        // freePhysicalMemorySize);

        // long preCpuTime = 0;
        // long preTime = 0;
        //
        // for (int i = 0; i < 10000; i++) {
        // // 定义对象名称
        // String objectName = "java.lang:type=OperatingSystem";
        // // 记录当前可用进程
        // int availableProcessors = (Integer) jmxAccessor.getAttribute(
        // objectName, "AvailableProcessors");
        // // 记录当前时间
        // long time = System.currentTimeMillis();
        // // 记录当前CPU使用时间
        // long cpuTime = (Long) jmxAccessor.getAttribute(objectName,
        // "ProcessCpuTime");
        //
        // long elapsedCpu = cpuTime - preCpuTime;
        // long elapsedTime = time - preTime;
        //
        // // 计算CPU使用率
        // float cpuUsage = 0;
        // if (preCpuTime > 0) {
        // cpuUsage = Math.min(99F, elapsedCpu
        // / (elapsedTime * 10000F * availableProcessors));
        // }
        // // 记录时间
        // preCpuTime = cpuTime;
        // preTime = time;
        //
        // System.err.println("----------------> " +
        // cpuUsage+" , "+elapsedCpu+" , "+elapsedTime);
        //
        // Thread.sleep(500);
        // }

        // 定义对象名称
        String objectName = "Phoenix Server:type=CommunicationServerMonitor";
        // 获取客户端地址列表
        @SuppressWarnings("unchecked")
        List<String> list = (List<String>) jmxAccessor.invoke(objectName,
                "doGetAllRemoteAddress");

        String clientAddress = list.get(0);

        // 定义对象名称
        objectName = "Phoenix Server:type=MessageMonitor";
        Object[] params = new Object[]{clientAddress, "ClientServer",
                "ClientService", "getAllThreadStackTraces", 60000L};
        // 获取堆栈信息
        String s = (String) jmxAccessor.invoke(objectName, "doSendMessage2Client",
                params);
        System.out.println(s);

        // // 获取客户端MAC地址
        // byte[] data = (byte[]) jmxAccessor.invoke(objectName,
        // "doSendMessage2Client", params);
        // File file=new File("d:/screen.png");
        //
        // FileOutputStream out=new FileOutputStream(file);
        // out.write(data);
        // out.close();
        //
        // System.err.println("-----------> mac address="+macAddress);//debug

    }
}
