package cn.com.yusys.icsp.service;

import cn.com.yusys.icsp.base.base.BaseService;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmDeviceLog;
import cn.com.yusys.icsp.repository.mapper.BcmpSmDeviceLogMapper;
import cn.com.yusys.icsp.common.exception.ICSPException;

import java.io.*;
import java.util.List;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 设备日志上传表
 *
 * @author linli
 * @email linli@yusys.com.cn
 * @date 2020-03-09 23:02:18
 */
@Service
@Transactional
public class BcmpSmDeviceLogService extends BaseService {


	@Autowired
	private BcmpSmDeviceLogMapper bcmpSmDeviceLogMapper;
	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 创建信息
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public int create(BcmpSmDeviceLog bcmpSmDeviceLog) throws Exception {
		bcmpSmDeviceLog.setDeviceLogId(createUUId());
		return bcmpSmDeviceLogMapper.insert(bcmpSmDeviceLog);
	}

	/**
	 * @throws Exception
	 * @方法名称: show
	 * @方法描述: 查询信息 by DeviceLogId
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public BcmpSmDeviceLog show(String deviceLogId) throws Exception {
		QueryModel model = new QueryModel();
		model.addCondition("deviceLogId", deviceLogId);
		PageInfo<BcmpSmDeviceLog> pageInfo = index(model);
		if (pageInfo == null || pageInfo.getTotal()==0) {
			throw new ICSPException("数据不存在" + deviceLogId);
		}
		BcmpSmDeviceLog bcmpSmDeviceLog = pageInfo.getList().get(0);
		return  bcmpSmDeviceLog;
	}

	/**
	 * @方法名称: index
	 * @方法描述: 查询所有 
	 * @参数与返回说明:
	 * @算法描述: 无
	 */
	public PageInfo<BcmpSmDeviceLog> index(QueryModel model) throws Exception {
		PageHelper.startPage(model.getPage(), model.getSize());
		if(model.getSort()==null||"".equals(model.getSort())){
			model.setSort("uploadDate desc");
		}
		List<BcmpSmDeviceLog> list = bcmpSmDeviceLogMapper.selectByModel(model);
		PageHelper.clearPage();
		return new PageInfo<>(list);
	}

	/**
	 * @方法名称: update
	 * @方法描述: 根据数据库主建更新
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int update(BcmpSmDeviceLog bcmpSmDeviceLog) throws Exception {
		return bcmpSmDeviceLogMapper.updateByPrimaryKey(bcmpSmDeviceLog);
	}

	/**
	 * @方法名称: delete
	 * @方法描述: 根据主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int delete(String deviceLogId) throws Exception {
		return bcmpSmDeviceLogMapper.deleteByPrimaryKey(deviceLogId);
	}

	/**
	 * @方法名称: delete
	 * @方法描述:根据多个主键删除
	 * @参数与返回说明:
	 * @算法描述:
	 */
	public int deleteByIds(String ids) throws Exception {
		return bcmpSmDeviceLogMapper.deleteByIds(ids);
	}

	/*
	 *  @Description : 设备终端日志下载
	 *  @Author : Mr_Jiang
	 *  @Date : 2020/3/10 10:21
	 */
	public void download(HttpServletRequest request, HttpServletResponse response) throws Exception {
		//获取请求参数deviceLogId
		String deviceLogId = request.getParameter("deviceLogId");
		//从数据库获取当前日志编号详细信息
		BcmpSmDeviceLog bcmpSmDeviceLog =  show(deviceLogId);
		//获取文件
		File deviceLog = new File(bcmpSmDeviceLog.getLogPath()+File.separator+bcmpSmDeviceLog.getLogName());
		if(!deviceLog.exists()){
			throw new ICSPException("该日志文件["+bcmpSmDeviceLog.getLogName()+"]不存在!");
		}
		//将文件转化为字节数组
		byte[] data =readFile(new FileInputStream(deviceLog),new ByteArrayOutputStream());
		response.reset();
		response.setHeader("Content-Disposition", "attachment; filename=\""+bcmpSmDeviceLog.getLogName()+"\"");
		response.addHeader("Content-Length", "" + data.length);
		response.setContentType("application/octet-stream; charset=UTF-8");
		IOUtils.write(data, response.getOutputStream());
	}
	/*
	 *  @Description : 读取文件
	 *  @Author : Mr_Jiang
	 *  @Date : 2020/3/10 11:59
	 */
	private byte[] readFile(FileInputStream inputStream,ByteArrayOutputStream byteArrayOutputStream) throws IOException {
		byte[] bytes = new byte[1024];
		int line;
		try{
			while ((line = inputStream.read(bytes)) != -1){
				byteArrayOutputStream.write(bytes, 0, line);
			}
			return byteArrayOutputStream.toByteArray();
		}finally {
			if(inputStream!=null){
				inputStream.close();
			}
			if (byteArrayOutputStream != null) {
				byteArrayOutputStream.close();
			}
		}
	}
}

