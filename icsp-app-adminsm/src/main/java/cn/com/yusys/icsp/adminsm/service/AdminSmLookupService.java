package cn.com.yusys.icsp.adminsm.service;

import cn.com.yusys.icsp.adminsm.domain.AdminSmLookup;
import cn.com.yusys.icsp.adminsm.repository.mapper.AdminSmLookupItemMapper;
import cn.com.yusys.icsp.adminsm.repository.mapper.AdminSmLookupMapper;
import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * 数据字典表
 *
 * @author linli
 * @email linlistone@163.com
 * @date 2020-02-14 23:47:03
 */
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
        List<AdminSmLookup> list = index(model);
        if (list == null || list.isEmpty()) {
            throw new ICSPException("数据不存在" + lookupId);
        }
        AdminSmLookup domain = list.get(0);
        return domain;
    }

    /**
     * @方法名称: index
     * @方法描述: 查询所有
     * @参数与返回说明:
     * @算法描述: 无
     */
    public List<AdminSmLookup> index(QueryModel model) throws Exception {
        PageHelper.startPage(model.getPage(), model.getSize());
        List<AdminSmLookup> list = adminSmLookupMapper.selectByModel(model);
        PageHelper.clearPage();
        return list;
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
