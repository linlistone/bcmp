package cn.com.yusys.icsp.bcmp;

import cn.com.yusys.icsp.exception.BcmpException;

import java.io.File;
import java.io.InputStream;
import java.util.List;

public class BcmpTools {


    public static BcmpOptions getBcmpOptions(final HostDescriptor hostDescriptor) throws Exception {
        return BcmpOptionsFactory.getBcmpOptions(hostDescriptor);
    }

    public static String goCmd(final HostDescriptor hostDescriptor, final String cmd) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            return bcmpoptions.goCmd(cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void goCmd(final HostDescriptor hostDescriptor, final String cmd, final ReadFunction readFunction) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.goCmd(readFunction, cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void goShell(final HostDescriptor hostDescriptor, final ReadFunction readFunction, final String... cmd) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.goShell(readFunction, cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static String goShell(final HostDescriptor hostDescriptor, final String... cmd) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            return bcmpoptions.goShell(cmd);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void upload(final HostDescriptor hostDescriptor, final File local, final String target, final boolean cover) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.upload(local, local.getName(), target, cover);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void upload(final HostDescriptor hostDescriptor, final InputStream stream, final String fileName, final String target, final boolean cover) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.upload(stream, fileName, target, cover);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void remove(final HostDescriptor hostDescriptor, final String target, final String fileName) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.rm(target, fileName);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void rm(final HostDescriptor hostDescriptor, final String parent, final String... fileNames) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.rm(parent, fileNames);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

    public static void download(final HostDescriptor hostDescriptor, final String srcPath, final String fileName, final ReadFunction readFunction) throws BcmpException {
        try (final BcmpOptions bcmpoptions = getBcmpOptions(hostDescriptor)) {
            bcmpoptions.download(fileName, srcPath, readFunction);
        } catch (Exception e) {
            throw new BcmpException("关闭会话异常!" + e.getMessage());
        }
    }

//    public static void transfer(final HostDescriptor srcHost, final String srcPath, final String srcName, final HostDescriptor targetHost, final String targetPath) throws BcmpException {
//        download(srcHost, srcPath, srcName, is -> {
//            upload(targetHost, is, srcName, targetPath, true);
//            return true;
//        });
//    }

    public static List<String> ls(final HostDescriptor host, final String repoPath, final String key) throws BcmpException {

        throw new IllegalStateException("An error occurred while decompiling this method.");
    }


}
