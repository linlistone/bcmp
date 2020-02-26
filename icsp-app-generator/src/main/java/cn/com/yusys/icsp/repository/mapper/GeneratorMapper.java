
package cn.com.yusys.icsp.repository.mapper;

import cn.com.yusys.icsp.common.mapper.QueryModel;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

/**
 * 数据库接口
 *
 * @author Mark sunlightcs@gmail.com
 * @since 2018-07-24
 */
@Mapper
public interface GeneratorMapper {
    List<Map<String, Object>> queryTableList(QueryModel queryModel);
    
    List<Map<String, Object>> queryColumnList(QueryModel tableName);

    Map<String, String> queryTable(String tableName);

    List<Map<String, String>> queryColumns(String tableName);

}
