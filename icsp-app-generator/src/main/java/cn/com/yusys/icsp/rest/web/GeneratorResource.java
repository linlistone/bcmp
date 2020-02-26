package cn.com.yusys.icsp.rest.web;

import cn.com.yusys.icsp.base.base.BaseResouce;
import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.service.GeneratorService;
import com.github.pagehelper.PageInfo;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * 代码生成器
 *
 * @author Mark sunlightcs@gmail.com
 */
@RestController
@RequestMapping("/api/generator")
public class GeneratorResource extends BaseResouce {

    @Autowired
    private GeneratorService generatorService;

    /**
     * 列表
     */
    @GetMapping(value = "/tableList")
    public ResultDto<List<Map<String, Object>>> tableList(QueryModel model) {
        PageInfo<Map<String, Object>> pageInfo = generatorService
                .queryTableList(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * 列表
     */
    @GetMapping(value = "/columnList")
    public ResultDto<List<Map<String, Object>>> columnList(QueryModel model) {
        PageInfo<Map<String, Object>> pageInfo = generatorService
                .queryColumnList(model);
        return ResultDto.success(pageInfo);
    }

    /**
     * 生成代码
     */
    @RequestMapping("/code")
    @ResponseBody
    public void code(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String tables = request.getParameter("tableName");
        String moduleName = request.getParameter("moduleName");
        String createType = request.getParameter("createType");
        byte[] data = generatorService.generatorCode(tables.split(","), moduleName, createType);
        response.reset();
        response.setHeader("Content-Disposition", "attachment; filename=\"renren.zip\"");
        response.addHeader("Content-Length", "" + data.length);
        response.setContentType("application/octet-stream; charset=UTF-8");
        IOUtils.write(data, response.getOutputStream());
    }

}
