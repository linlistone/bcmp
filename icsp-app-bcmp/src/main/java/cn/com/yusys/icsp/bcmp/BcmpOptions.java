package cn.com.yusys.icsp.bcmp;

import cn.com.yusys.icsp.exception.BcmpException;

import java.io.File;
import java.io.InputStream;

public interface BcmpOptions extends AutoCloseable {
    public static final String SUCCESS_CODE = "0";

    String goCmd(String p0) throws BcmpException;

    void goCmd(ReadFunction p0, String p1) throws BcmpException;

    String goShell(String... p0) throws BcmpException;

    void goShell(ReadFunction p0, String... p1) throws BcmpException;

    void upload(InputStream p0, String p1, String p2, boolean p3) throws BcmpException;

    void upload(File p0, String p1, String p2, boolean p3) throws BcmpException;

    void rm(String p0, String... p1) throws BcmpException;

    void download(String p0, String p1, ReadFunction p2) throws BcmpException;

    /**
     * 代理服务状态
     *
     * @return
     * @throws BcmpException
     */
    String getAgentStatus() throws BcmpException;

    /**
     * 代理服务停止
     *
     * @return
     * @throws BcmpException
     */
    String agentShutdown() throws BcmpException;
}
