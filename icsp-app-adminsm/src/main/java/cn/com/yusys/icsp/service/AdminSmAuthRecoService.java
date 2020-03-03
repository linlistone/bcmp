package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.exception.ICSPException;
import cn.com.yusys.icsp.common.util.DateUtil;
import cn.com.yusys.icsp.domain.AdminSmAuthReco;
import cn.com.yusys.icsp.repository.mapper.AdminSmAuthRecoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * @version 1.0.0
 * @项目名称: sp-platform-oca-core模块
 * @类名称: AdminSmAuthRecoService
 * @类描述: #服务类
 * @功能描述:
 * @创建人: C00177
 * @创建时间: 2019-06-26 09:44:21
 * @修改备注:
 * @修改记录: 修改时间 修改人员 修改原因
 * -------------------------------------------------------------
 * @Copyright (c) 2017宇信科技-版权所有
 */
@Service
@Transactional
public class AdminSmAuthRecoService extends BaseService {

    private static Logger logger = LoggerFactory.getLogger(AdminSmAuthRecoService.class);

    @Autowired
    private AdminSmAuthRecoMapper mapper;

    @Transactional(readOnly = true)
    public List<Map<String, Object>> selectMenuTree(String sysId) {
        List<Map<String, Object>> list = this.mapper.queryMenuTree(sysId);
        return changerList(list);
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getList(String objectType, String resType, String objectId, String sysId) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("objectType", objectType);
        paramMap.put("resType", resType.split(","));
        paramMap.put("objectId", objectId);
        paramMap.put("sysId", sysId);
        return changerList(mapper.getObjectResourcInfo(paramMap));
    }

    @Transactional(readOnly = false, rollbackFor = {Exception.class, RuntimeException.class})
    public int insertBatch(List<Map<String, Object>> menus, List<Map<String, Object>> ctrs) throws ICSPException {
        int result = 0;
        try {
            if (menus.size() > 0) {
                List<String> ids = new ArrayList<String>();
                int length = menus.size();
                int ctrLength = ctrs.size();
                for (int s = 0; s < length; ++s) {
                    Map<String, Object> pol = menus.get(s);
                    ids.add(pol.get("authresId").toString());
                }
                List<Map<String, Object>> listRes = mapper.quryUpIdById(ids);
                listRes=changerList(listRes);
                int listResSize = listRes.size();
                Map<String, Object> pool = menus.get(0);
                List<String> resType = new ArrayList<>();
                resType.add("M");
                resType.add("C");
                this.deleteInfo(pool.get("authobjType").toString(), resType, pool.get("authobjId").toString(), pool.get("sysId").toString());
                logger.info("删除旧的对象资源关系数据-- {}", DateUtil.getFormatDateTime());
                for (int i = 0; i < listResSize; ++i) {
                    AdminSmAuthReco info = new AdminSmAuthReco();
                    Map<String, Object> map = listRes.get(i);
                    info.setAuthRecoId(this.createUUId());
                    info.setLastChgDt(DateUtil.getFormatDateTime());
                    info.setSysId(pool.get("sysId").toString());
                    info.setAuthobjId(pool.get("authobjId").toString());
                    info.setAuthobjType(pool.get("authobjType").toString());
                    info.setLastChgUsr(pool.get("lastChgUsr").toString());
                    if (map.get("id") != null) {
                        info.setAuthresId(map.get("id").toString());
                    }
                    if (map.get("menuId") != null) {
                        info.setMenuId(map.get("menuId").toString());
                    }
                    if (map.get("menuType") != null) {
                        info.setAuthresType(map.get("menuType").toString());
                    }
                    result += mapper.insert(info);
                }
                for (int s2 = 0; s2 < ctrLength; ++s2) {
                    Map<String, Object> map2 = ctrs.get(s2);
                    AdminSmAuthReco info2 = new AdminSmAuthReco();
                    info2.setAuthRecoId(this.createUUId());
                    info2.setLastChgDt(DateUtil.getFormatDateTime());
                    info2.setSysId(map2.get("sysId").toString());
                    info2.setAuthobjId(map2.get("authobjId").toString());
                    info2.setAuthobjType(map2.get("authobjType").toString());
                    info2.setLastChgUsr(map2.get("lastChgUsr").toString());
                    info2.setAuthresId(map2.get("authresId").toString());
                    info2.setMenuId(map2.get("menuId").toString());
                    info2.setAuthresType(map2.get("authresType").toString());
                    result += mapper.insert(info2);
                }
                logger.info("新增对象资源关系数据-- |{}|{}| ---{}", pool.get("authobjType"), pool.get("authobjId"),
                        DateUtil.getFormatDateTime());
            }
        } catch (Exception e) {
            throw new ICSPException("保存失败"+e.getMessage());
        }
        return result;
    }


    public int deleteInfo(String objectType, List resType, String objectId, String sysId) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        paramMap.put("objectType", objectType);
        paramMap.put("resType", resType);
        paramMap.put("objectId", objectId);
        paramMap.put("sysId", sysId);
        return this.mapper.deleteRelInfo(paramMap);
    }
}