package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.bcmp.constant.OS;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.common.util.DateUtil;
import cn.com.yusys.icsp.domain.BcmpSmVersion;
import cn.com.yusys.icsp.repository.mapper.BcmpSmVersionMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;

import java.io.*;
import java.util.List;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * 版本清单表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:21
 */
@Service
@Transactional
public class BcmpSmVersionService extends BaseService {

    //初始化日志信息
    private Logger logger = LoggerFactory.getLogger(BcmpSmVersionService.class);


    @Autowired
    private BcmpSmVersionMapper bcmpSmVersionMapper;


    /*
     *  @Description : 服务器集群信息上传版本文件到服务器
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 15:58
     */
    public int uploadFile(MultipartFile file, BcmpSmVersion versionInfo) {
        if (versionInfo.getVersionNum() == null || "".equals(versionInfo.getVersionNum())) {
            return -1;
        }
        String serviceName = versionInfo.getVersionType().toLowerCase();
        String originalFilename = file.getOriginalFilename();
        String outFileName = versionInfo.getVersionNum() + "_" + originalFilename;
        this.logger.info("上传服务:{}对应资源包", (Object) serviceName);
        OutputStream os = null;
        try (InputStream inputStream = file.getInputStream()) {
            String path = "deploy" + OS.LINUXSEPARATOR.getName() + serviceName + OS.LINUXSEPARATOR.getName() + outFileName;
            File outFile = new File(path);
            versionInfo.setVersionPath(path);
            if (!outFile.exists()) {
                File fileDir = outFile.getParentFile();
                if (!fileDir.exists() || !fileDir.isDirectory()) {
                    fileDir.mkdirs();
                }
            }
            this.logger.info("上传文件到本地:{}", (Object) outFile.getAbsolutePath());
            os = new FileOutputStream(outFile);
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) != -1) {
                os.write(buffer, 0, len);
            }
        } catch (Exception e) {
            this.logger.error(e.getMessage());
            throw new ICSPException(e.getMessage(), e);
        } finally {
            try {
                os.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return 0;
    }

    /**
     * @throws Exception
     * @方法名称: show
     * @方法描述: 创建信息
     * @参数与返回说明:
     * @算法描述: 无
     */
    public int create(BcmpSmVersion bcmpSmVersion) throws Exception {
        bcmpSmVersion.setVersionId(bcmpSmVersion.getVersionNum());
        bcmpSmVersion.setVersionUploadDate(DateUtil.getFormatDateTime());
        return bcmpSmVersionMapper.insert(bcmpSmVersion);
    }

    /**
     * @throws Exception
     * @方法名称: show
     * @方法描述: 查询信息 by VersionId
     * @参数与返回说明:
     * @算法描述: 无
     */
    public BcmpSmVersion show(String versionId) throws Exception {
        QueryModel model = new QueryModel();
        model.addCondition("versionId", versionId);
        PageInfo<BcmpSmVersion> pageInfo = index(model);
        if (pageInfo == null || pageInfo.getTotal() == 0) {
            throw new ICSPException("数据不存在" + versionId);
        }
        BcmpSmVersion bcmpSmVersion = pageInfo.getList().get(0);
        return bcmpSmVersion;
    }

    /**
     * @方法名称: index
     * @方法描述: 查询所有
     * @参数与返回说明:
     * @算法描述: 无
     */
    public PageInfo<BcmpSmVersion> index(QueryModel model) throws Exception {
        PageHelper.startPage(model.getPage(), model.getSize());
        if (model.getSort() == null || "".equals(model.getSort()))
            model.setSort("versionNum desc");
        List<BcmpSmVersion> list = bcmpSmVersionMapper.selectByModel(model);
        PageHelper.clearPage();
        return new PageInfo<>(list);
    }

    /**
     * @方法名称: index
     * @方法描述: 查询所有
     * @参数与返回说明:
     * @算法描述: 无
     */
    public List<BcmpSmVersion> all(QueryModel model) throws Exception {
        if (model.getSort() == null || "".equals(model.getSort()))
            model.setSort("versionNum desc");
        List<BcmpSmVersion> list = bcmpSmVersionMapper.selectByModel(model);
        return list;
    }

    /**
     * @方法名称: update
     * @方法描述: 根据数据库主建更新
     * @参数与返回说明:
     * @算法描述:
     */
    public int update(BcmpSmVersion bcmpSmVersion) throws Exception {
        return bcmpSmVersionMapper.updateByPrimaryKey(bcmpSmVersion);
    }

    /**
     * @方法名称: delete
     * @方法描述: 根据主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int delete(String versionId) throws Exception {
        return bcmpSmVersionMapper.deleteByPrimaryKey(versionId);
    }

    /**
     * @方法名称: delete
     * @方法描述:根据多个主键删除
     * @参数与返回说明:
     * @算法描述:
     */
    public int deleteByIds(String ids) throws Exception {
        return bcmpSmVersionMapper.deleteByIds(ids);
    }

}

