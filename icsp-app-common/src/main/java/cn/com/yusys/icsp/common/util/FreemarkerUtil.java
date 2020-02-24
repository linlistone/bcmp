package cn.com.yusys.icsp.common.util;

public class FreemarkerUtil {

//	/**
//	 * Generate html string.
//	 *
//	 * @param template
//	 *            the name of freemarker teamlate.
//	 * @param variables
//	 *            the data of teamlate.
//	 * @return htmlStr
//	 * @throws Exception
//	 */
//	public static String generate(String template, Map<String, Object> variables)
//			throws Exception {
//		Configuration config = FreemarkerConfiguration.getConfiguation();
//		config.setObjectWrapper(ObjectWrapper.BEANS_WRAPPER);
//		Template tp = config.getTemplate(template);
//		StringWriter stringWriter = new StringWriter();
//		BufferedWriter writer = null;
//		try {
//			writer = new BufferedWriter(stringWriter);
//			tp.setEncoding("UTF-8");
//			tp.process(variables, writer);
//			writer.flush();
//		} finally {
//			if (writer != null)
//				writer.close();
//		}
//		String htmlStr = stringWriter.toString();
//		return htmlStr;
//	}

}