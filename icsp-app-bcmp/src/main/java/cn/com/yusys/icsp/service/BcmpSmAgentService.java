package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.shell.ShellScriptManager;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmAgent;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.repository.mapper.BcmpSmAgentMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;

import java.util.List;
import java.util.Map;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 代理服务表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:39
 */
@Service
@Transactional
public class BcmpSmAgentService extends BaseService {

    //初始化日志信息
    private Logger logger = LoggerFactory.getLogger(BcmpSmServerClusterService.class);


    @Autowired
    private BcmpSmAgentMapper bcmpSmAgentMapper;

    /**
     * @throws Exception
     * @方法名称: show
     * @方法描述: 创建信息
     * @参数与返回说明:
     * @算法描述: 无
     */
    public int create(BcmpSmAgent bcmpSmAgent) throws Exception {
        BcmpSmAgent dbAgent = getBcmpSmAgent(bcmpSmAgent.getHostAddress());
        if (dbAgent != null) {
            bcmpSmAgent.setAgentId(dbAgent.getAgentId());
            return bcmpSmAgentMapper.updateByPrimaryKey(bcmpSmAgent);
        } else {
            //如果没有注册过，就增代理主机数据
            bcmpSmAgent.setAgentId(createUUId());
            return bcmpSmAgentMapper.insert(bcmpSmAgent);
        }
    }

    /**
     * @throws Exception
     * @方法名称: show
     * @方法描述: 查询信息 by AgentId
     * @参数与返回说明:
     * @算法描述: 无
     */
    public BcmpSmAgent getBcmpSmAgent(String hostAddress) throws Exception {
        QueryModel model = new QueryModel();
        model.addCondition("hostAddress", hostAddress);
        List<BcmpSmAgent> list = bcmpSmAgentMapper.selectByModel(model);
        if (list == null || list.isEmpty())
            return null;
        return list.get(0);
    }

    /**
     * @throws Exception
     * @方法名称: show
     * @方法描述: 查询信息 by AgentId
     * @参数与返回说明:
     * @算法描述: 无
     */
    public BcmpSmAgent show(String agentId) throws Exception {
        QueryModel model = new QueryModel();
        model.addCondition("agentId", agentId);
        PageInfo<BcmpSmAgent> pageInfo = index(model);
        if (pageInfo == null || pageInfo.getTotal() == 0) {
            throw new ICSPException("数据不存在" + agentId);
        }
        BcmpSmAgent bcmpSmAgent = pageInfo.getList().get(0);
        return bcmpSmAgent;
    }

    /**
     * @方法名称: index
     * @方法描述: 查询所有
     * @参数与返回说明:
     * @算法描述: 无
     */
    public PageInfo<BcmpSmAgent> index(QueryModel model) throws Exception {
        PageHelper.startPage(model.getPage(), model.getSize());
        List<BcmpSmAgent> list = bcmpSmAgentMapper.selectByModel(model);
        // 查询代理服务状态
        for (BcmpSmAgent bcmpSmAgent : list) {
            //代理服务器不多，可以这么搞搞，代码多了，要考虑用websocket反向通知，要不然卡
            bcmpSmAgent.setStatus("unknown");
            bcmpSmAgent.setSocketStatus("unknown");
        }
        PageHelper.clearPage();
        return new PageInfo<>(list);
    }


    /**
     * 校验应用节点启动状态
     *
     * @param hostAddress 代理地址
     * @return
     * @throws Exception
     */
    public String queryAgentStatus(String hostAddress) throws Exception {
        String result = "";
        try {
            BcmpSmAgent bcmpSmAgent = this.getBcmpSmAgent(hostAddress);
            if (bcmpSmAgent == null)
                return result;
            HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmAgent);
            result = BcmpTools.getAgentStatus(hostDescriptor);
            logger.info("记录获取代理服务器是否启动状态结果:{}", new Object[]{result});
        } catch (Throwable e) {
            logger.error("查询代理服务状态异常", e);
            throw new ICSPException("查询代理服务状态异常", 500);
        }
        return result;
    }


    /**
     * @方法名称: agentShutdown
     * @方法描述: 关闭代理服务
     * @参数与返回说明:
     * @算法描述: 无
     */
    @Async
    public void agentShutdown(BcmpSmAgent bcmpSmAgent) throws Exception {
        try {
            HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmAgent);
            String result = BcmpTools.agentShutdown(hostDescriptor);
            logger.info("停止代理服务器是否启动状态结果:{}", new Object[]{result});
        } catch (Throwable e) {
            logger.error("停止代理服务状态异常 "+bcmpSmAgent.getHostAddress(), e);
        }
    }


    /**
     * @方法名称: update
     * @方法描述: 根据数据库主建更新
     * @参数与返回说明:
     * @算法描述:
     */
    public int update(BcmpSmAgent bcmpSmAgent) throws Exception {
        return bcmpSmAgentMapper.updateByPrimaryKey(bcmpSmAgent);
    }

    /**
     * @方法名称: delete
     * @方法描述: 根据主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int delete(String agentId) throws Exception {
        return bcmpSmAgentMapper.deleteByPrimaryKey(agentId);
    }

    /**
     * @方法名称: delete
     * @方法描述:根据多个主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int deleteByIds(String ids) throws Exception {
        return bcmpSmAgentMapper.deleteByIds(ids);
    }


}

