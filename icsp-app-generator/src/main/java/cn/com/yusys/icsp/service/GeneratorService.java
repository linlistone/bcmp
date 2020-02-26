package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.repository.mapper.GeneratorMapper;
import cn.com.yusys.icsp.util.GenUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

/**
 * 代码生成器
 *
 * @author 林立
 */
@Service
@Transactional
public class GeneratorService {

    @Autowired
    private GeneratorMapper generatorMapper;

    public PageInfo<Map<String, Object>> queryTableList(QueryModel model) {
        PageHelper.startPage(model.getPage(), model.getSize());
        List<Map<String, Object>> list = generatorMapper.queryTableList(model);
        PageHelper.clearPage();
        return new PageInfo<>(list);
    }

    public PageInfo<Map<String, Object>> queryColumnList(QueryModel model) {
        PageHelper.startPage(model.getPage(), model.getSize());
        PageHelper.startPage(model.getPage(), model.getSize());
        List<Map<String, Object>> list = generatorMapper.queryColumnList(model);
        PageHelper.clearPage();
        return new PageInfo<>(list);
    }

    public byte[] generatorCode(String[] tableNames, String moduleName, String createType) throws Exception {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ZipOutputStream zip = new ZipOutputStream(outputStream);
        for (String tableName : tableNames) {
            // 查询表信息
            Map<String, String> table = queryTable(tableName);
            // 查询列信息
            List<Map<String, String>> columns = queryColumns(tableName);
            // 生成代码
            GenUtils.generatorCode(createType, moduleName, table, columns, zip);
        }
//		zip.close();
        IOUtils.closeQuietly(zip);
        return outputStream.toByteArray();
    }

    private Map<String, String> queryTable(String tableName) {
        return generatorMapper.queryTable(tableName);
    }

    private List<Map<String, String>> queryColumns(String tableName) {
        return generatorMapper.queryColumns(tableName);
    }
}
