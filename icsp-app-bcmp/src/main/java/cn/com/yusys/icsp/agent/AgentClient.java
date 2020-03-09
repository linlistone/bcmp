package cn.com.yusys.icsp.agent;

import cn.com.yusys.icsp.agent.common.beans.ExecResult;
import cn.com.yusys.icsp.agent.common.beans.FileUploadInfo;
import cn.com.yusys.icsp.agent.common.exception.AgentException;
import cn.com.yusys.icsp.agent.common.mxbean.AgentManagementMXBean;
import cn.com.yusys.icsp.agent.common.mxbean.ApplicationManagementMXBean;
import cn.com.yusys.icsp.agent.mxbean.MxBeanClient;
import cn.com.yusys.icsp.agent.mxbean.MxBeanClientImpl;
import cn.com.yusys.icsp.bcmp.BcmpOptions;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.ReadFunction;
import cn.com.yusys.icsp.exception.BcmpException;
import cn.com.yusys.icsp.util.AgentUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.InputStream;
import java.util.Objects;

public class AgentClient implements BcmpOptions {

    private static Logger logger = LoggerFactory.getLogger(AgentClient.class);

    private HostDescriptor hostDescriptor = null;

    public AgentClient(HostDescriptor hostDescriptor) {
        this.hostDescriptor = hostDescriptor;
    }

    private MxBeanClient getMxBeanClient() throws Exception {
        try {
            ApplicationManagementMXBean appProxy = AgentMXBeanFactory.instance()
                    .applicationMXBean(hostDescriptor.getIp(), hostDescriptor.getRmiPort());
            AgentManagementMXBean agentProxy = AgentMXBeanFactory.instance()
                    .agentMXBean(hostDescriptor.getIp(), hostDescriptor.getRmiPort());
            return (MxBeanClient) new MxBeanClientImpl(appProxy, agentProxy);
        } catch (Exception e) {
            logger.error("获取agent连接失败, cause by:{}", (Object) e.getMessage());
            throw new AgentException("获取agent连接失败:" + e.getMessage(), e);
        }
    }

    @Override
    public String goCmd(String cmd) throws AgentException {
        logger.info("调用执行的命令为:{}", (Object) cmd);
        try (MxBeanClient client = this.getMxBeanClient()) {
            ExecResult result = client.runCmd((String) null, new String[]{cmd});
            if (result == null) {
                throw new Exception("执行命令失败无法获取返回数据!");
            }
            String str = result.getOut();
            if (!result.isSuccess()) {
                throw new Exception("执行命令失败:" + result.getErrOut());
            }
            if (StringUtils.isEmpty((CharSequence) str)) {
                str = result.getErrOut();
            }
            logger.debug("执行命令成功:{}", (Object) str);
            return str;
        } catch (Exception e) {
            throw new AgentException(e.getMessage(), e);
        }
    }

    @Override
    public void goCmd(ReadFunction readFunction, String cmd) throws AgentException {
        String result = this.goCmd(cmd);
        try {
            readFunction.read((InputStream) new ByteArrayInputStream(result.getBytes()));
        } catch (Exception e) {
            throw new AgentException(e.getMessage());
        }
    }


    @Override
    public String goShell(String... shell) throws AgentException {
        try (MxBeanClient client = this.getMxBeanClient()) {
            ExecResult result = client.runShell((String) null, shell);
            if (!result.isSuccess()) {
                throw new AgentException("执行交互式命令出错:" + result.getErrOut());
            }
            return result.getOut();
        } catch (Exception e) {
            throw new AgentException(e.getMessage(), e);
        }
    }

    @Override
    public void goShell(ReadFunction readFunction, String... shell) throws AgentException {
        String s = this.goShell(shell);
        try {
            readFunction.read((InputStream) new ByteArrayInputStream(s.getBytes()));
        } catch (Exception e) {
            throw new AgentException(e.getMessage());
        }
    }

    @Override
    public void upload(InputStream localStream, String fileName, String path, boolean cover)
            throws AgentException {
        logger.info("文件{}当前使用流的方式上传!", (Object) fileName);
        FileUploadInfo upload = new FileUploadInfo(localStream);
        upload.setFileName(fileName);
        upload.setFileDir(path);
        try {
            SocketClient.uploadFile(this.hostDescriptor.getIp(),
                    (int) Integer.valueOf(this.hostDescriptor.getSocketPort()), upload);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new AgentException(e.getMessage());
        }
    }

    @Override
    public void upload(File localFile, String fileName, String path, boolean cover)
            throws AgentException {
        logger.info("本地文件:{}采用文件分割方式上传!", (Object) localFile.getAbsolutePath());
        FileUploadInfo upload = new FileUploadInfo(localFile);
        upload.setFileName(fileName);
        upload.setFileDir(path);
        try {
            SocketClient.uploadFile(this.hostDescriptor.getIp(), (int) Integer.valueOf(this.hostDescriptor.getSocketPort()), upload, true);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            throw new AgentException(e.getMessage());
        }
    }

    @Override
    public void rm(String parent, String... fileName) throws AgentException {
        if (Objects.isNull(fileName) || fileName.length == 0) {
            this.goCmd(AgentUtil.rmDir(parent));
        } else {
            try (MxBeanClient client = this.getMxBeanClient()) {
                client.runCmd(parent, AgentUtil.rmFiles(fileName));
            } catch (Exception e) {
                throw new AgentException(e.getMessage());
            }
        }
    }

    @Override
    public String getAgentStatus() throws BcmpException {
        try (MxBeanClient client = this.getMxBeanClient()) {
            return client.getAgentStatus();
        } catch (Exception e) {
            throw new AgentException(e.getMessage(), e);
        }
    }

    @Override
    public String agentShutdown() throws BcmpException {
        try (MxBeanClient client = this.getMxBeanClient()) {
            return client.agentShutdown();
        } catch (Exception e) {
            throw new AgentException(e.getMessage(), e);
        }
    }


    @Override
    public void download(String p0, String p1, ReadFunction p2) throws AgentException {

    }


    @Override
    public void close() throws Exception {

    }
}
