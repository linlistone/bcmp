package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmAppMod;
import cn.com.yusys.icsp.repository.mapper.BcmpSmAppModMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 应用模块定义
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-11 10:31:26
 */
@Service
@Transactional
public class BcmpSmAppModService extends BaseService {


	@Autowired
	private BcmpSmAppModMapper bcmpSmAppModMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmAppMod bcmpSmAppMod) throws Exception {
		bcmpSmAppMod.setAppModId(createUUId());
		return bcmpSmAppModMapper.insert(bcmpSmAppMod);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by AppModId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmAppMod show(String appModId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("appModId", appModId);
		PageInfo<BcmpSmAppMod> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + appModId);
		}
		BcmpSmAppMod bcmpSmAppMod = pageInfo.getList().get(0);
		return  bcmpSmAppMod;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmAppMod> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<BcmpSmAppMod> list = bcmpSmAppModMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmAppMod bcmpSmAppMod) throws Exception {
		return bcmpSmAppModMapper.updateByPrimaryKey(bcmpSmAppMod);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String appModId) throws Exception {
		return bcmpSmAppModMapper.deleteByPrimaryKey(appModId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmAppModMapper.deleteByIds(ids);
	}
}

