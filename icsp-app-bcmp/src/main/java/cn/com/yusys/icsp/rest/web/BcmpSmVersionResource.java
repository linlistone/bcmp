package cn.com.yusys.icsp.rest.web;

import java.util.List;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmVersion;
import cn.com.yusys.icsp.service.BcmpSmVersionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 版本清单表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-08 20:36:21
 */
@RestController
@RequestMapping("/api/bcmpSmVersion")
public class BcmpSmVersionResource extends BaseResouce {

    private static final Logger logger = LoggerFactory.getLogger(BcmpSmVersionResource.class);

    @Autowired
    private BcmpSmVersionService bcmpSmVersionService;

    /**
     * @方法名称: create
     * @方法描述: 新增版本清单表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/create")
    public ResultDto<Integer> create(@RequestBody BcmpSmVersion bcmpSmVersion) throws Exception {
        int result = bcmpSmVersionService.create(bcmpSmVersion);
        return ResultDto.success(result);
    }

    /*
     *  @Description : 服务器集群信息上传版本文件到服务器
     *  @Author : Mr_Jiang
     *  @Date : 2020/3/7 15:51
     */
    @PostMapping({"/uploadfile"})
    public ResultDto<Integer> uploadFile(MultipartFile file, BcmpSmVersion versionInfo) throws Exception {
        logger.info("服务[{}],上传文件[{}]->版本号{}", new Object[]{versionInfo.getVersionType(), file.getOriginalFilename(), versionInfo.getVersionNum()});
        int result = this.bcmpSmVersionService.uploadFile(file, versionInfo);
        if (result == 0) {
            return ResultDto.success(bcmpSmVersionService.create(versionInfo));
        }
        return ResultDto.error(500, "上传版本文件出错");
    }

    /**
     * @方法名称:show
     * @方法描述:版本清单表信息查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/show")
    public ResultDto<BcmpSmVersion> show(@RequestParam("versionId") String versionId) throws Exception {
        return ResultDto.success(bcmpSmVersionService.show(versionId));
    }

    /**
     * @方法名称:index
     * @方法描述:版本清单表查询
     * @参数与返回说明:
     * @算法描述:
     */
    @GetMapping(value = "/index")
    public ResultDto<List<BcmpSmVersion>> index(QueryModel model)
            throws Exception {
        PageInfo<BcmpSmVersion> pageInfo = bcmpSmVersionService.index(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * @方法名称: update
     * @方法描述: 修改版本清单表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/update")
    public ResultDto<Integer> update(@RequestBody BcmpSmVersion bcmpSmVersion) throws Exception {
        int result = bcmpSmVersionService.update(bcmpSmVersion);
        return ResultDto.success(result);
    }

    /**
     * @方法名称: delete
     * @方法描述: 删除版本清单表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/delete/{versionId}")
    public ResultDto<Integer> delete(@PathVariable("versionId") String versionId) throws Exception {
        int result = bcmpSmVersionService.delete(versionId);
        return ResultDto.success(result);
    }
}
