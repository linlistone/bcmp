package cn.com.yusys.icsp.bcmp.node;

import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.repository.mapper.BcmpSmNodeinfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * 节点管理器
 *
 * @author 江成
 */
public class NodeManager {

    private static Logger logger = LoggerFactory.getLogger(NodeManager.class);
    /**
     * Node
     */
    private static ConcurrentHashMap<String, Node> nodes = new ConcurrentHashMap<String, Node>();
    /**
     * 同步锁
     */
    private static Lock lock = new ReentrantLock();

    @Autowired
    private BcmpSmNodeinfoMapper bcmpSmNodeinfoMapper;

    /**
     * 获取节点
     *
     * @param ip
     * @param nodeName
     * @return
     */
    public Node getNode(String ip, String nodeName) {
        //加锁
        lock.lock();
        try {
            //获取当前 // 获取节点信息
            NodeInfo nodeInfo = getNodeInfo(ip, nodeName);
            if (nodeInfo == null)
                throw new ICSPException("未获取的nodeInfo");
            Node node = nodes.get(ip + "_" + nodeName);
            if (node == null) {
                node = new Node(nodeInfo);
                nodes.put(ip + "_" + nodeName, node);
            }
            return node;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
        } finally {
            //解锁
            lock.unlock();
        }
        return null;
    }

    /**
     * 获取节信息
     *
     * @param hostip
     * @param nodeName
     * @return
     */
    private NodeInfo getNodeInfo(String hostip, String nodeName)
            throws Exception {
        QueryModel queryModel = new QueryModel();
        queryModel.addCondition("hostIp", hostip);
        queryModel.addCondition("nodeName", nodeName);
        List<BcmpSmNodeinfo> list = bcmpSmNodeinfoMapper.selectByModel(queryModel);
        if (list != null && list.size() > 0) {
            NodeInfo nodeInfo = new NodeInfo();
            return nodeInfo;
        }
        return null;
    }
}
