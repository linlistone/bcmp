package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.jmx.JmxAccessor;
import cn.com.yusys.icsp.bcmp.node.PartitionState;
import cn.com.yusys.icsp.bcmp.shell.ShellScriptManager;
import cn.com.yusys.icsp.bean.HostAgentBean;
import cn.com.yusys.icsp.common.util.StringUtil;
import cn.com.yusys.icsp.domain.BcmpSmAgent;
import cn.com.yusys.icsp.domain.BcmpSmHostinfo;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.openmbean.CompositeData;
import java.util.ArrayList;
import java.util.List;

/*
 *  @Description : 服务器节点内存,CPU,运行时间,磁盘分区获取服务
 *  @Author : Mr_Jiang
 *  @Date : 2020/3/7 17:23
 */
@Service
@Transactional
public class BcmpSmNodeMonitorService {
    //初始化日志信息
    private Logger logger = LoggerFactory.getLogger(BcmpSmNodeMonitorService.class);
    //JVM访问器
    private JmxAccessor jvmAccessor;
    //JVM环境是否已经准备完成
    private boolean isPrepareJvm = false;

    /*
     *  @Description : 准备JVM环境
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 17:44
     */
    public synchronized boolean prepareJvm(String hostIp, String jvmPort) {
        if (isPrepareJvm) {
            return true;
        }
        // 定义JVM连接器
        jvmAccessor = new JmxAccessor();
        boolean connected = jvmAccessor.connect(hostIp, jvmPort);
        if (connected) {
            this.isPrepareJvm = true;
        }
        return connected;
    }

    /*
     *  @Description : 释放JVM环境
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 20:44
     */
    public synchronized void releaseJvm() {
        if (this.jvmAccessor != null) {
            this.jvmAccessor.disconnect();
            this.jvmAccessor = null;
        }
        this.isPrepareJvm = false;
    }

    /*
     *  @Description : 获取CPU使用率
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 17:43
     */
    public float getCpuUsage(HostAgentBean hostAgentBean) throws Exception {
        //获取hostAgentBean中的主机信息
        BcmpSmHostinfo bcmpSmHostinfo = hostAgentBean.getBcmpSmHostinfo();
        //获取hostAgentBean中的节点信息
        BcmpSmNodeinfo bcmpSmNodeinfo = hostAgentBean.getBcmpSmNodeinfo();
        //获取hostAgentBean中的agent注册信息
        BcmpSmAgent agentRegistryInfo = hostAgentBean.getAgentRegistryInfo();
        // 获取当前时间
        long s = System.currentTimeMillis();
        logger.info("开始获取cup使用率");
        // cpu使用率
        float cpusage = -1;
        try {
            // 获取解压命令
            String script = ShellScriptManager.getScript(agentRegistryInfo.getOsName(), "getCpuUsage.sh", bcmpSmNodeinfo.getJvmPort());
            if ("linux".equalsIgnoreCase(agentRegistryInfo.getOsName())) {
                HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmHostinfo.getHostIp(), bcmpSmHostinfo.getLoginUsername(), bcmpSmHostinfo.getLoginPassword(), agentRegistryInfo.getRmiPort());
                // 执行命令
                String res = BcmpTools.goShell(hostDescriptor, script);
                String[] items = StringUtil.split(res, "\n");
                for (int i = 0; i < items.length; i++) {
                    try {
                        float f = Float.parseFloat(items[i]);
                        cpusage = f;
                        break;
                    } catch (Exception e) {
                    }
                }
                if (cpusage == -1) {
                    logger.error("获取cpu使用率失败，返回结果为 :" + res);
                }
                return cpusage;
            }
            logger.info("完成获取cpu使用率，耗时:" + (System.currentTimeMillis() - s) + "毫秒");
            return cpusage;
        } catch (Exception e) {
            String msg = "获取cpu使用率，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            throw e;
        }
    }

    /*
     *  @Description : 获取内存总数
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 17:42
     */
    public long getTotalMemorySize(HostAgentBean hostAgentBean) throws Exception {
        //获取hostAgentBean中的节点信息
        BcmpSmNodeinfo bcmpSmNodeinfo = hostAgentBean.getBcmpSmNodeinfo();
        //获取hostAgentBean中的agent注册信息
        BcmpSmAgent agentRegistryInfo = hostAgentBean.getAgentRegistryInfo();
        // 判断JMX环境是否准备成功,若连接失败则返回内存数为0
        if (!isPrepareJvm) {
            return 0;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=Memory";
            String heapMemoryKey = "max";
            if (!"linux".equalsIgnoreCase(agentRegistryInfo.getOsName())) {
                heapMemoryKey = "committed";
            }
            // 获取堆内存使用情况
            CompositeData heapMemoryData = (CompositeData) jvmAccessor.getAttribute(objectName, "HeapMemoryUsage");
            // 获取非堆内存使用情况
            CompositeData nonHeapMemoryData = (CompositeData) jvmAccessor.getAttribute(objectName, "NonHeapMemoryUsage");

            long heapMemorySize = (Long) heapMemoryData.get(heapMemoryKey);
            long nonHeapMemorySize = (Long) nonHeapMemoryData.get(heapMemoryKey);
            // 计算总内存
            long size = (heapMemorySize + nonHeapMemorySize) / 1024;
            return size;
        } catch (Exception e) {
            //this.releaseJvm();
            String msg = "获取总内存量(单位KB)，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            throw e;
        }
    }

    /*
     *  @Description : 获取系统运行时间
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 17:57
     */
    public long getRunningTime(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        //判断JVM环境是否已经准备完成
        if (!isPrepareJvm) {
            return 0;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=Runtime";
            // 获取JVM运行时间情况
            long time = (Long) jvmAccessor.getAttribute(objectName, "Uptime");
            return time;
        } catch (Exception e) {
            String msg = "获取系统运行总时间，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            //this.releaseJvm();
            throw e;
        }
    }

    /*
     *  @Description : 获取峰值线程数
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 20:34
     */
    public int getPeakThreadCount(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        //判断JVM环境是否已经准备完成
        if (!isPrepareJvm) {
            return 0;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=Threading";
            // 获取峰值线程数
            int count = (Integer) jvmAccessor.getAttribute(objectName, "PeakThreadCount");
            return count;
        } catch (Exception e) {
            String msg = "获取峰值线程数，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            //this.releaseJvm();
            throw e;
        }
    }

    /*
     *  @Description : 获取守护线程数
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 20:37
     */
    public long getDaemonThreadCount(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        //判断JVM环境是否已经准备完成
        if (!isPrepareJvm) {
            return 0;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=Threading";
            // 获取守护线程数
            int count = (Integer) jvmAccessor.getAttribute(objectName, "DaemonThreadCount");
            return count;
        } catch (Exception e) {
            String msg = "获取守护线程数，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            //this.releaseJvm();
            throw e;
        }
    }

    /*
     *  @Description : 获取当前活动线程数
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 20:40
     */
    public int getThreadCount(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        //判断JVM环境是否已经准备完成
        if (!isPrepareJvm) {
            return 0;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=Threading";
            // 获取当前活动线程数
            int count = (Integer) jvmAccessor.getAttribute(objectName, "ThreadCount");
            return count;
        } catch (Exception e) {
            String msg = "获取当前活动线程数，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            //this.releaseJvm();
            throw e;
        }
    }

    /*
     *  @Description : 获取已经启动过的线程数
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 20:42
     */
    public long getTotalStartedThreadCount(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        //判断JVM环境是否已经准备完成
        if (!isPrepareJvm) {
            return 0;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=Threading";
            // 获取已经启动的线程数
            long count = (Long) jvmAccessor.getAttribute(objectName, "TotalStartedThreadCount");
            return count;
        } catch (Exception e) {
            String msg = "获取已经启动过的线程数，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            //this.releaseJvm();
            throw e;
        }
    }

    /*
     *  @Description : 获取JVM输入参数
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 21:10
     */
    public String[] getJvmInputArguments(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        //判断JVM环境是否已经准备完成
        if (!isPrepareJvm) {
            return null;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=Runtime";
            // 获取JVM输入参数
            String[] args = (String[]) jvmAccessor.getAttribute(objectName, "InputArguments");
            return args;
        } catch (Exception e) {
            String msg = "获取JVM输入参数，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            //this.releaseJvm();
            throw e;
        }
    }

    /*
     *  @Description : 获取当前加载的类数量
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 21:11
     */
    public int getLoadedClassCount(BcmpSmNodeinfo bcmpSmNodeinfo) throws Exception {
        //判断JVM环境是否已经准备完成
        if (!isPrepareJvm) {
            return 0;
        }
        try {
            // 定义对象名称
            String objectName = "java.lang:type=ClassLoading";
            // 获取当前加载的类数量
            int count = (Integer) jvmAccessor.getAttribute(objectName, "LoadedClassCount");
            return count;
        } catch (Exception e) {
            String msg = "获取当前加载的类数量，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            //this.releaseJvm();
            throw e;
        }
    }

    /*
     *  @Description : 获取主机的分区使用情况
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/5 21:15
     */
    public List<PartitionState> getPartitionState(HostAgentBean hostAgentBean) throws Exception {
        //获取hostAgentBean中的主机信息
        BcmpSmHostinfo bcmpSmHostinfo = hostAgentBean.getBcmpSmHostinfo();
        //获取hostAgentBean中的节点信息
        BcmpSmNodeinfo bcmpSmNodeinfo = hostAgentBean.getBcmpSmNodeinfo();
        //获取hostAgentBean中的agent注册信息
        BcmpSmAgent agentRegistryInfo = hostAgentBean.getAgentRegistryInfo();
        // 获取当前时间
        long s = System.currentTimeMillis();
        logger.info("开始获取主机硬盘使用情况");
        try {
            // 获取解压命令
            String script = ShellScriptManager.getScript(agentRegistryInfo.getOsName(), "getDiskState.sh", bcmpSmNodeinfo.getJvmPort());
            HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmHostinfo.getHostIp(), bcmpSmHostinfo.getLoginUsername(), bcmpSmHostinfo.getLoginPassword(), agentRegistryInfo.getRmiPort());
            // 执行命令
            String response = BcmpTools.goShell(hostDescriptor, script);
            System.out.println("获取分区情况:" + response);
            String[] lines = response.split("\n");
            List<PartitionState> list = new ArrayList<>();
            for (int i = 0; i < lines.length; i++) {
                String line = lines[i];
                if (line.indexOf("%") == -1) {
                    continue;
                }
                String[] items = line.split("[\t+|\\s]+");
                String lastItem = items[items.length - 1];
                if (lastItem.charAt(0) != '/') {
                    continue;
                }
                PartitionState state = new PartitionState();
                if ("linux".equalsIgnoreCase(agentRegistryInfo.getOsName())) {
                    state.setFileSystem(items[0]);
                    state.setMountedPoint(lastItem);
                    double num = Double.parseDouble(items[1]);
                    state.setTotalSpace((int) num);
                    num = Double.parseDouble(items[2]);
                    state.setUsedSpace((int) num);
                    String str = items[4].trim();
                    // 去掉%
                    str = str.substring(0, str.length() - 1);
                    double ratio = Double.parseDouble(str) / 100;
                    state.setUsedRatio(ratio);
                } else {
                    state.setFileSystem(items[0]);
                    state.setMountedPoint(lastItem);
                    double total = Double.parseDouble(items[1]);
                    state.setTotalSpace((int) total);
                    double free = Double.parseDouble(items[2]);
                    state.setUsedSpace((int) (total - free + 0.5));
                    String str = items[5].trim();
                    // 去掉%
                    str = str.substring(0, str.length() - 1);
                    double ratio = Double.parseDouble(str) / 100;
                    state.setUsedRatio(ratio);
                }
                list.add(state);
            }
            logger.info("完成获取主机硬盘使用情况，耗时:" + (System.currentTimeMillis() - s) + "毫秒");
            return list;
        } catch (Exception e) {
            String msg = "获取主机硬盘使用情况，错误服务器[host:" + bcmpSmNodeinfo.getHostIp() + " ,port:" + bcmpSmNodeinfo.getHttpPort() + "]";
            logger.error(msg, e);
            throw e;
        }
    }
}