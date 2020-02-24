package cn.com.yusys.icsp.common.mapper;

import cn.com.yusys.icsp.common.util.StringUtilEx;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class QueryModel {

	private static final Logger logger = LoggerFactory.getLogger(QueryModel.class);

	private static final JavaType condMapType = TypeFactory.defaultInstance()
			.constructMapType(Map.class, String.class, Object.class);

	private Map<String, Object> condition;
	private int page;
	private int size;
	private String sort;

	private String formatedOrderBy;

	private String dataAuth;

	public QueryModel() {
		this.condition = new HashMap<String, Object>();

		this.size = 10;
	}

	public Map<String, Object> getCondition() {
		return this.condition;
	}

	public void setCondition(String condition) {
		ObjectMapper jsonObj = new ObjectMapper();
		try {
			if (condition == null || "".equals(condition))
				return;
			this.condition = ((Map) jsonObj.readValue(condition, condMapType));
		} catch (JsonParseException e) {
			logger.error("将查询条件condition转换为map格式出错", e);
		} catch (JsonMappingException e) {
			logger.error("将查询条件condition转换为map格式出错", e);
		} catch (IOException e) {
			logger.error("将查询条件condition转换为map格式出错", e);
		}
	}

	public void addCondition(String key, Object value) {
		this.condition.put(key, value);
	}

	public int getPage() {
		return this.page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return this.size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public String getSort() {
		return this.formatedOrderBy;
	}

	public void setSort(String sort) {
		this.sort = sort;
		formateOrderBy(this.sort);
	}

	private void formateOrderBy(String orderBy) {
		if ((orderBy == null) || ("".equals(orderBy.trim()))) {
			return;
		}
		StringBuilder formatedOrderBy = new StringBuilder();
		String[] orders = orderBy.split(",");

		for (String order : orders) {
			String[] items = order.trim().split("\\s+|\\t+");

			if (items.length > 2) {
				logger.error(new StringBuilder().append("orderBy[")
						.append(orderBy).append("]字段不合法,不进行拼接").toString());
				return;
			}

			if (items.length >= 1) {
				String field = items[0];
				if (("and".equalsIgnoreCase(field.trim()))
						|| ("or".equalsIgnoreCase(field.trim()))) {
					logger.error(new StringBuilder().append("orderBy[")
							.append(orderBy).append("]字段不合法,不进行拼接").toString());
					return;
				}
			}

			if (items.length >= 2) {
				String type = items[1];
				if ((!("asc".equalsIgnoreCase(type)))
						&& (!("desc".equals(type)))) {
					logger.error(new StringBuilder().append("orderBy[")
							.append(orderBy).append("]字段不合法,不进行拼接").toString());
					return;
				}
			}
			formatedOrderBy.append(StringUtilEx.humpToLine(items[0]));
			if (items.length > 1) {
				formatedOrderBy.append(new StringBuilder().append(" ")
						.append(items[1]).toString());
			}
			formatedOrderBy.append(",");
		}
		String newOrderBy = formatedOrderBy.toString();
		if (newOrderBy.endsWith(",")) {
			newOrderBy = newOrderBy.substring(0, newOrderBy.length() - 1);
		}
		this.formatedOrderBy = newOrderBy;
	}

	public String getDataAuth() {
		return this.dataAuth;
	}

	public void setDataAuth(String dataAuth) {
		this.dataAuth = dataAuth;
	}

}