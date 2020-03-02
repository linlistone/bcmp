package cn.com.yusys.icsp.bcmp;

import java.io.InputStream;

@FunctionalInterface
public interface ReadFunction {
	boolean read(InputStream p0) throws Exception;
}
