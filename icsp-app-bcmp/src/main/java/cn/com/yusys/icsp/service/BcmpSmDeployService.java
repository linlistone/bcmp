package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeploy;
import cn.com.yusys.icsp.repository.mapper.BcmpSmDeployMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 * 应用部署表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:34
 */
@Service
@Transactional
public class BcmpSmDeployService extends BaseService {


	@Autowired
	private BcmpSmDeployMapper bcmpSmDeployMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmDeploy bcmpSmDeploy) throws Exception {
		bcmpSmDeploy.setDeployId(createUUId());
		return bcmpSmDeployMapper.insert(bcmpSmDeploy);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by DeployId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmDeploy show(String deployId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("deployId", deployId);
		PageInfo<BcmpSmDeploy> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + deployId);
		}
		BcmpSmDeploy bcmpSmDeploy = pageInfo.getList().get(0);
		return  bcmpSmDeploy;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmDeploy> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		List<BcmpSmDeploy> list = bcmpSmDeployMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmDeploy bcmpSmDeploy) throws Exception {
		return bcmpSmDeployMapper.updateByPrimaryKey(bcmpSmDeploy);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String deployId) throws Exception {
		return bcmpSmDeployMapper.deleteByPrimaryKey(deployId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmDeployMapper.deleteByIds(ids);
	}
}

