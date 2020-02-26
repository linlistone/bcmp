package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.domain.AdminSmBusiFunc;
import cn.com.yusys.icsp.repository.mapper.AdminSmBusiFuncMapper;
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

@Service
@Transactional
public class AdminSmBusiFuncService extends BaseService {

    @Autowired
    private AdminSmBusiFuncMapper adminSmBusiFuncMapper;

    public AdminSmBusiFuncService() {
        super();
        // TODO Auto-generated constructor stub
    }

    public int create(AdminSmBusiFunc adminSmBusiFunc) throws Exception {
        adminSmBusiFunc.setFuncId(createUUId());
        adminSmBusiFunc.setLastChgDt(DateUtil.getFormatDateTime());
        return adminSmBusiFuncMapper.insert(adminSmBusiFunc);
    }

    /**
     * @throws ICSPException
     * @方法名称: getMenuInfo
     * @方法描述: 查询菜单信息 by menuId
     * @参数与返回说明:
     * @算法描述: 无
     */
    public AdminSmBusiFunc show(String funcId) throws Exception {
        QueryModel model = new QueryModel();
        model.addCondition("funcId", funcId);
        PageInfo<AdminSmBusiFunc> pageInfo = index(model);
        if (pageInfo == null || pageInfo.getTotal() == 0) {
            throw new ICSPException("数据不存在" + funcId);
        }
        AdminSmBusiFunc smMenu = pageInfo.getList().get(0);
        return smMenu;
    }

    /**
     * @方法名称: index
     * @方法描述: 查询所有菜单 按系统编号
     * @参数与返回说明:
     * @算法描述: 无
     */
    public PageInfo<AdminSmBusiFunc> index(QueryModel model) {
        PageHelper.startPage(model.getPage(), model.getSize());
        List<AdminSmBusiFunc> list = adminSmBusiFuncMapper.selectByModel(model);
        PageHelper.clearPage();
        return new PageInfo<>(list);
    }

    /**
     * 根据数据库主建更新
     *
     * @param adminSmBusiFunc
     * @return
     */
    public int update(AdminSmBusiFunc adminSmBusiFunc) throws Exception {
        adminSmBusiFunc.setLastChgDt(DateUtil.getFormatDateTime());
        return adminSmBusiFuncMapper.updateByPrimaryKey(adminSmBusiFunc);
    }

    /**
     * @方法名称: delete
     * @方法描述: 根据主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int delete(String funcId) throws Exception {
        return adminSmBusiFuncMapper.deleteByPrimaryKey(funcId);
    }

    /**
     * @方法名称: delete
     * @方法描述:根据多个主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int deleteByIds(String ids) throws Exception {
        return adminSmBusiFuncMapper.deleteByIds(ids);
    }

}