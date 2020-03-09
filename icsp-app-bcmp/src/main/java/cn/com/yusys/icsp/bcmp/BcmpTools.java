package cn.com.yusys.icsp.bcmp;

import cn.com.yusys.icsp.exception.BcmpException;

import java.io.File;
import java.io.InputStream;
import java.util.List;

public class BcmpTools {


    public static BcmpOptions getBcmpOptions(HostDescriptor hostDescriptor) throws Exception {
        return BcmpOptionsFactory.getBcmpOptions(hostDescriptor);
    }

    public static String goCmd(HostDescriptor hostDescriptor, String cmd) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            return bcmpoptions.goCmd(cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void goCmd(HostDescriptor hostDescriptor, String cmd, ReadFunction readFunction) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.goCmd(readFunction, cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void goShell(HostDescriptor hostDescriptor, ReadFunction readFunction, String... cmd) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.goShell(readFunction, cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static String goShell(HostDescriptor hostDescriptor, String... cmd) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            return bcmpoptions.goShell(cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void upload(HostDescriptor hostDescriptor, File local, String target, boolean cover) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.upload(local, local.getName(), target, cover);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void upload(HostDescriptor hostDescriptor, InputStream stream, String fileName, String target, boolean cover) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.upload(stream, fileName, target, cover);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void remove(HostDescriptor hostDescriptor, String target, String fileName) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.rm(target, fileName);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void rm(HostDescriptor hostDescriptor, String parent, String... fileNames) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.rm(parent, fileNames);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void download(HostDescriptor hostDescriptor, String srcPath, String fileName, ReadFunction readFunction) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.download(fileName, srcPath, readFunction);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static String getAgentStatus(HostDescriptor hostDescriptor) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            return bcmpoptions.getAgentStatus();
        } catch (Exception e) {
            throw new BcmpException("获取代理状态异常!" + e.getMessage());
        }
    }

    public static String agentShutdown(HostDescriptor hostDescriptor) throws BcmpException {
        try (BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            return bcmpoptions.agentShutdown();
        } catch (Exception e) {
            throw new BcmpException("停止代理服务异常!" + e.getMessage());
        }
    }

//    public static void transfer( HostDescriptor srcHost,  String srcPath,  String srcName,  HostDescriptor targetHost,  String targetPath) throws BcmpException {
//        download(srcHost, srcPath, srcName, is -> {
//            upload(targetHost, is, srcName, targetPath, true);
//            return true;
//        });
//    }

    public static List<String> ls(HostDescriptor host, String repoPath, String key) throws BcmpException {

        throw new IllegalStateException("An error occurred while decompiling this method.");
    }


}
