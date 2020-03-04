package cn.com.yusys.icsp.bcmp.node.filesystem;

import cn.com.yusys.icsp.bcmp.jmx.JmxAccessor;
import cn.com.yusys.icsp.bcmp.node.FileInfo;
import cn.com.yusys.icsp.bcmp.node.IFileSystemAccessor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.BitSet;
import java.util.Date;
import java.util.zip.GZIPInputStream;


/**
 * 服务器文件系统访问器
 * 
 * @author 江成
 * 
 */
public class ClientFileSystemAccessor implements IFileSystemAccessor {

	private static Logger logger = LoggerFactory.getLogger(ClientFileSystemAccessor.class);


	/**
	 * HTTP请求内容形式(上传文件方式)
	 */
	private final static String MULTIPATR_FORM = "multipart/form-data";

	/**
	 * HTTP请求内容形式(普通表单)
	 */
	private final static String APPLICATION_FORM = "application/x-wwww-form-urlencoded";

	/**
	 * HTTP请求形式(POST)
	 */
	public final static String POST = "POST";

	/**
	 * HTTP请求形式(GET)
	 */
	public final static String GET = "GET";

	/**
	 * 当前运行context path
	 */
	public final static String INSTANT_CONTEXT_PATH = "instant";

	/**
	 * base context
	 */
	public final static String BASE_CONTEXT = "baseContext";

	/**
	 * 字符编码
	 */
	private static final String CHARSET_NAME = "UTF-8";

	/**
	 * 需要转码的字符
	 */
	private static final BitSet dontNeedEncoding = new BitSet(256);
	static {
		for (int i = 33; i < 127; i++) {
			dontNeedEncoding.set(i);
		}
		dontNeedEncoding.clear(' ');
		dontNeedEncoding.clear('%');
		dontNeedEncoding.clear('[');
		dontNeedEncoding.clear(']');
		dontNeedEncoding.clear('{');
		dontNeedEncoding.clear('}');
	}

	/**
	 * 列分割符
	 */
	private static String ITEM_SPLITOR = "\t";

	/**
	 * 行分割符
	 */
	private static String LINE_SPLITOR = "\n";

	/**
	 * 分割符
	 */
	private static String SPLITOR = ",";

	/**
	 * 日志格式
	 */
	private static SimpleDateFormat dateFormat = new SimpleDateFormat(
			"yyyy-MM-dd hh:mm:dd");

	/**
	 * 资源请求超时时间
	 */
	private int timeout = 30000;

	/**
	 * 地址
	 */
	private String host;

	/**
	 * 端口
	 */
	private int port;

	/**
	 * 客户端地址
	 */
	private String clientAddress;

	/**
	 * JMX ACCESSOR
	 */
	private JmxAccessor jmxAccessor;

	/**
	 * 获取客户端信息超时
	 */
	private long clientTimeout = 20000L;

	/**
	 * 构造函数
	 * 
	 * @param host
	 * @param port
	 */
	public ClientFileSystemAccessor(String host, int port,
									JmxAccessor jmxAccessor, String clientAddress) {
		this.host = host;
		this.port = port;
		this.jmxAccessor = jmxAccessor;
		this.clientAddress = clientAddress;
	}

	/**
	 * 列举文件
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public FileInfo[] list(String path) throws Exception {
		// 定义对象名称
		String objectName = "Phoenix Server:type=MessageMonitor";
		Object[] args = new Object[] { this.clientAddress, "ClientServer",
				"FileSystemService", "list" + SPLITOR + path, 60000L };
		// 获取客户端数量
		String s = (String) jmxAccessor.invoke(objectName,
				"doSendMessage2Client", args);
		if (s == null || s.length() == 0) {
			return new FileInfo[0];
		}
		String[] lines = s.split(LINE_SPLITOR);
		FileInfo[] fileInfos = new FileInfo[lines.length];
		for (int i = 0; i < fileInfos.length; i++) {
			fileInfos[i] = this.createFileInfo(lines[i]);
		}
		return fileInfos;
	}

	/**
	 * 创建文件信息
	 * 
	 * @param info
	 * @return
	 */
	private FileInfo createFileInfo(String info) {
		// 文件类型 \t大小\t修改时间\t文件路径
		String[] items = info.split(ITEM_SPLITOR);

		// 文件类型
		boolean isDirectory = false;
		if ("d".equals(items[0])) {
			isDirectory = true;
		}
		// 文件大小
		long size = Long.parseLong(items[1]);

		// 最近修改时间
		Date lastModified = null;
		try {
			lastModified = dateFormat.parse(items[2]);
		} catch (ParseException e) {
			logger.error(e.getMessage(), e);
		}

		// 文件路径
		String path = items[3];
		// 文件名
		String name = path;
		// 父亲路径
		String parentPath = "";
		int index = path.lastIndexOf("/");
		if (index != -1) {
			name = path.substring(index + 1);
			parentPath = path.substring(0, index);
		}

		// 定义文件信息
		FileInfo fileInfo = new FileInfo();
		fileInfo.setName(name);
		fileInfo.setPath(path);
		fileInfo.setParentPath(parentPath);
		fileInfo.setDirectory(isDirectory);
		fileInfo.setSize(size);
		fileInfo.setLastModified(lastModified);
		return fileInfo;
	}

	/**
	 * 获取文件
	 * 
	 * @param fileInfo
	 * @return
	 * @throws Exception
	 */
	public byte[] get(FileInfo fileInfo) throws Exception {
		byte[] bytes = this.get(fileInfo.getPath());
		return bytes;
	}

	/**
	 * 获取文件
	 * 
	 * @param path
	 * @return
	 * @throws Exception
	 */
	public byte[] get(String path) throws Exception {
		// 定义对象名称
		String objectName = "Phoenix Server:type=MessageMonitor";
		Object[] args = new Object[] { this.clientAddress, "ClientServer",
				"FileSystemService", "upload" + SPLITOR + path, clientTimeout };
		// 获取客户端数量
		String serverPath = (String) jmxAccessor.invoke(objectName,
				"doSendMessage2Client", args);

		// 定义上送URL
		StringBuilder sb = new StringBuilder();
		sb.append("http://");
		sb.append(this.host);
		sb.append(":");
		sb.append(this.port);
		sb.append("/action/fileUtil?app=downloadFile");
		sb.append("&checkValidity=");
		sb.append(false);
		sb.append("&");
		sb.append(BASE_CONTEXT);
		sb.append("=");
		sb.append(INSTANT_CONTEXT_PATH);
		sb.append("&path=");
		sb.append(serverPath);
		String url = sb.toString();

		byte[] content = new byte[0];
		HttpURLConnection conn = null;
		InputStream in = null;

		try {
			// 创建下载连接
			conn = createHttpConnection(url, GET, APPLICATION_FORM, timeout);
			conn.connect();
			// 获取文件输入流
			in = new BufferedInputStream(conn.getInputStream());

			// 输出字节流
			ByteArrayOutputStream byteOut = new ByteArrayOutputStream();
			// 读取下载的文件内容
			byte[] buffer = new byte[1024];
			int len = -1;
			while ((len = in.read(buffer)) != -1) {
				byteOut.write(buffer, 0, len);
			}
			byteOut.flush();
			content = byteOut.toByteArray();
			byteOut.close();
			// 判断下载内容是否经过压缩
			if ("zip".equals(conn.getHeaderField("content_enCoding"))) {
				content = unzip(content, 0, content.length);
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw e;
		} finally {
			// 关闭输入流
			if (in != null) {
				in.close();
			}
			// 关闭连接
			if (conn != null) {
				conn.disconnect();
			}
		}
		return content;
	}

	/**
	 * 解压
	 */
	private static byte[] unzip(byte[] content, int pos, int len)
			throws IOException {
		ByteArrayInputStream byteIn = new ByteArrayInputStream(content, pos,
				len);
		GZIPInputStream zipIn = new GZIPInputStream(byteIn);
		ByteArrayOutputStream byteOut = new ByteArrayOutputStream(len);
		byte[] buff = new byte[1024];
		int length = 0;
		while ((length = zipIn.read(buff)) != -1) {
			byteOut.write(buff, 0, length);
		}
		zipIn.close();
		byte[] res = byteOut.toByteArray();
		return res;
	}

	/**
	 * 编码url
	 * 
	 * @param s
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String encodeURL(String s)
			throws UnsupportedEncodingException {
		StringBuilder sb = new StringBuilder();
		char[] chars = s.toCharArray();
		for (int i = 0; i < chars.length; i++) {
			char c = chars[i];
			if (dontNeedEncoding.get(c)) {
				sb.append(c);
				continue;
			} else {
				byte[] bytes = Character.toString(c).getBytes("UTF-8");
				for (int j = 0; j < bytes.length; j++) {
					byte b = bytes[j];
					sb.append('%');
					sb.append(Integer.toHexString(0xFF & b).toUpperCase());
				}
			}
		}
		return sb.toString();
	}

	/**
	 * 创建HTTP连接
	 * 
	 * @return
	 * @throws Exception
	 */
	private HttpURLConnection createHttpConnection(String url,
			String requsetType, String contentType, int timeout)
			throws Exception {
		// 编码URL
		url = encodeURL(url);
		// 创建URL
		URL conUrl = new URL(url);
		// 打开连接
		HttpURLConnection conn = (HttpURLConnection) conUrl.openConnection();
		if (timeout == -1)
			timeout = this.timeout;
		conn.setReadTimeout(timeout);
		conn.setConnectTimeout(timeout);
		conn.setDoInput(true); // 允许输入流
		conn.setDoOutput(true); // 允许输出流
		conn.setUseCaches(false); // 不允许使用缓存
		conn.setRequestMethod(requsetType); // 请求方式
		conn.setRequestProperty("Charset", CHARSET_NAME); // 设置编码
		conn.setRequestProperty("connection", "keep-alive");
		if (MULTIPATR_FORM.equals(contentType)) {
			conn.setRequestProperty("Content-Type", contentType + ";boundary="
					+ conn.hashCode());
		} else {
			conn.setRequestProperty("Content-Type", contentType);
		}
		return conn;
	}
}
