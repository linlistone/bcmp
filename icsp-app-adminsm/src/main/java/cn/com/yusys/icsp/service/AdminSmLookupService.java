package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.domain.AdminSmLookup;
import cn.com.yusys.icsp.repository.mapper.AdminSmLookupItemMapper;
import cn.com.yusys.icsp.repository.mapper.AdminSmLookupMapper;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 数据字典表
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:47:03
 */
@Service
@Transactional
public class AdminSmLookupService extends BaseService {

    @Autowired
    private AdminSmLookupMapper adminSmLookupMapper;

    @Autowired
    private AdminSmLookupItemMapper adminSmLookupItemMapper;

    public int create(AdminSmLookup domain) throws Exception {
        domain.setLookupId(createUUId());
        domain.setLastChgDt(DateUtil.getFormatDateTime());
        return adminSmLookupMapper.insert(domain);
    }

    /**
     * @throws ICSPException
     * @方法名称: getMenuInfo
     * @方法描述: 查询信息 by LookupId
     * @参数与返回说明:
     * @算法描述: 无
     */
    public AdminSmLookup show(String lookupId) throws Exception {
        QueryModel model = new QueryModel();
        model.addCondition("lookupId", lookupId);
        PageInfo<AdminSmLookup> pageInfo = index(model);
        if (pageInfo == null || pageInfo.getTotal()==0) {
            throw new ICSPException("数据不存在" + lookupId);
        }
        AdminSmLookup domain = pageInfo.getList().get(0);
        return domain;
    }

    /**
     * @方法名称: index
     * @方法描述: 查询所有
     * @参数与返回说明:
     * @算法描述: 无
     */
    public PageInfo<AdminSmLookup> index(QueryModel model) throws Exception {
        PageHelper.startPage(model.getPage(), model.getSize());
        List<AdminSmLookup> list = adminSmLookupMapper.selectByModel(model);
        PageHelper.clearPage();
        return new PageInfo<>(list);
    }

    /**
     * 根据数据库主建更新
     *
     * @param domain
     * @return
     */
    public int update(AdminSmLookup domain) throws Exception {
        domain.setLastChgDt(DateUtil.getFormatDateTime());
        return adminSmLookupMapper.updateByPrimaryKey(domain);
    }

    /**
     * @方法名称: delete
     * @方法描述: 根据主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int delete(String lookupId, String lookCode) throws Exception {
        int ret = 0;
        try {
            ret = adminSmLookupMapper.deleteByPrimaryKey(lookupId);
            ret += adminSmLookupItemMapper.deleteByLookupCode(lookCode);
        } finally {
        }
        return ret;
    }

    /**
     * @方法名称: delete
     * @方法描述:根据多个主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int deleteByIds(String ids) throws Exception {
        return adminSmLookupMapper.deleteByIds(ids);
    }
}
