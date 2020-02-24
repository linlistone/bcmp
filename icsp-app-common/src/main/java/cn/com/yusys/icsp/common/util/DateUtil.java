/**
 * Special Declaration: These technical material reserved as the technical
 * secrets by Bankit TECHNOLOGY have been protected by the "Copyright Law"
 * "ordinances on Protection of Computer Software" and other relevant
 * administrative regulations and international treaties. Without the written
 * permission of the Company, no person may use (including but not limited to
 * the illegal copy, distribute, display, image, upload, and download) and
 * disclose the above technical documents to any third party. Otherwise, any
 * infringer shall afford the legal liability to the company.
 * <p>
 * 特别声明：本技术材料受《中华人民共和国著作权法》、《计算机软件保护条例》
 * 等法律、法规、行政规章以及有关国际条约的保护，浙江宇信班克信息技术有限公
 * 司享有知识产权、保留一切权利并视其为技术秘密。未经本公司书面许可，任何人
 * 不得擅自（包括但不限于：以非法的方式复制、传播、展示、镜像、上载、下载）使
 * 用，不得向第三方泄露、透露、披露。否则，本公司将依法追究侵权者的法律责任。
 * 特此声明！
 * <p>
 * Copyright(C) 2012 Bankit Tech, All rights reserved.
 */

package cn.com.yusys.icsp.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * 日期转换工具类
 *
 * @author linli
 * @history 郭婷 2012.11.23 添加注释
 * @history 董国伟 2012.12.20 格式化含小时分的时间输入场
 */
public class DateUtil {

    private static final Logger logger = LoggerFactory.getLogger(DateUtil.class);


    /** 时间格式(yyyy-MM-dd) */
    public final static String DATE_PATTERN = "yyyy-MM-dd";
    /** 时间格式(yyyy-MM-dd HH:mm:ss) */
    public final static String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";

    public static String format(Date date) {
        return format(date, DATE_PATTERN);
    }

    public static String format(Date date, String pattern) {
        if (date != null) {
            SimpleDateFormat df = new SimpleDateFormat(pattern);
            return df.format(date);
        }
        return null;
    }

    /**
     * 格式化当前系统日期
     *
     * @return yyyyMMddHHmmss
     */
    public static String getAllTime14() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(new Date());
    }

    /**
     * 格式化当前系统日期
     *
     * @return yyyyMMddHHmmssSSS
     */
    public static String getAllTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        return sdf.format(new Date());
    }

    /**
     * 格式化系统当前日期
     *
     * @return yyyyMMdd
     */
    public static String getFormatDateTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(new Date());
    }

    /**
     * 格式化系统当前日期
     *
     * @return yyyyMMdd
     */
    public static String getFormatDate() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        return sdf.format(new Date());
    }

    /**
     * 格式化 系统当前日期
     *
     * @return HHmmss
     */
    public static String getFormatTime() {
        SimpleDateFormat sdf = new SimpleDateFormat("HHmmss");
        return sdf.format(new Date());
    }

    /**
     * 格式化 输入当前日期
     *
     * @param date
     * @param format
     *            yyyy-MM-dd
     * @return
     */
    public static String getDateFormat(Date date, String format) {
        // 判断传入的日期对象是否为空
        if (date == null)
            return "";
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }

    /**
     * 日期默认格式化
     *
     * @param date
     *            日期
     * @return 格式化字符串，格式:yyyy-MM-dd hh:mm:ss
     */
    public static String getDefaultFormat(Date date) {
        DateFormat df = DateFormat.getDateTimeInstance(DateFormat.MEDIUM,
                DateFormat.MEDIUM, Locale.CHINA);
        return df.format(date);
    }

    /**
     * 格式化日期字符串为"yyyy-MM-dd"格式的Date类型
     *
     * @param dateStr
     *            日期字符串
     * @return "yyyy-MM-dd"格式的Date
     * @throws Exception
     */
    public static Date getStringTime1(String dateStr) throws Exception {

        if (StringUtilEx.isNullOrEmpty(dateStr)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try {
            date = sdf.parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException("格式化转换日期失败");
        }
        return date;
    }

    /**
     * 格式化日期字符串为"yyyy-MM-dd"格式的Date类型
     *
     * @param dateStr
     *            日期字符串
     * @throws Exception
     */
    public static Date getStringTime2(String dateStr, String sdfstr)
            throws Exception {

        if (StringUtilEx.isNullOrEmpty(dateStr)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(sdfstr);
        Date date = null;
        try {
            date = sdf.parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException("格式化转换日期失败");
        }
        return date;
    }

    /**
     * 格式化日期字符串为"yyyy-MM-dd"格式的Date类型
     *
     * @param dateStr
     *            日期字符串
     * @return "yyyy-MM-dd"格式的Date
     * @throws Exception
     */
    public static Date getStringTime1(String dateStr, String datepater)
            throws Exception {
        if (StringUtilEx.isNullOrEmpty(dateStr)) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat(datepater);
        Date date = null;
        try {
            date = sdf.parse(dateStr);
        } catch (ParseException e) {
            throw new RuntimeException("格式化转换日期失败");
        }
        return date;
    }

    /**
     * 获取当前日期的日期字符串 如：20111201
     *
     * @return 获取当前日期的日期字符串
     */
    public static String getDateString() {
        StringBuffer dateStr = new StringBuffer();
        Calendar now = Calendar.getInstance();
        Integer year = now.get(Calendar.YEAR);
        dateStr.append(year);
        // dateStr.append("-");
        Integer month = now.get(Calendar.MONTH) + 1;
        // 判断月为一位还是两位,一位的前面补0
        if (month.toString().length() == 1) {
            dateStr.append("0");
            dateStr.append(month);
            // dateStr.append("-");
        } else {
            dateStr.append(month);
            // dateStr.append("-");
        }
        Integer day = now.get(Calendar.DAY_OF_MONTH);
        // 判断日为一位还是两位,一位的前面补0
        if (day.toString().length() == 1) {
            dateStr.append("0");
            dateStr.append(day);
        } else {
            dateStr.append(day);
        }
        return dateStr.toString();
    }

    /**
     * 获取当前日期的时间字符串 如：0100
     *
     * @return 获取当前日期的时间字符串
     */
    public static String getTimeString() {
        StringBuffer dateStr = new StringBuffer();
        Calendar now = Calendar.getInstance();
        Integer hour = now.get(Calendar.HOUR_OF_DAY);
        // 判断小时为一位还是两位,一位的前面补0
        if (hour.toString().length() == 1) {
            dateStr.append("0");
            dateStr.append(hour);
        } else {
            dateStr.append(hour);
        }
        Integer minute = now.get(Calendar.MINUTE);
        // 判断分为一位还是两位,一位的前面补0
        if (minute.toString().length() == 1) {
            dateStr.append("0");
            dateStr.append(minute);
        } else {
            dateStr.append(minute);
        }
        return dateStr.toString();
    }

    /**
     * 日期数据转换为默认格式的字符串 日期格式"yyyy-MM-dd HH:mm:ss"
     *
     * @param DateStr
     * @return
     * @throws ParseException
     */
    public static String dataToString(Date DateStr) throws ParseException {
        String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
                .format(DateStr);
        return date;
    }

    /**
     * 字符串转换为默认格式的日期 日期格式"yyyy-MM-dd HH:mm:ss"
     *
     * @param dateStr
     * @return
     * @throws ParseException
     */
    public static Date stingTODate(String dateStr) throws ParseException {
        Date date = null;
        // 判断传入的字符串是否为空
        if (dateStr != null && (!dateStr.equals(""))) {
            // 判断字符串格式是否为yyyy-MM-dd
            if (dateStr.matches("\\d{4}-\\d{1,2}-\\d{1,2}")) {

                dateStr = dateStr + " 00:00";

            } else // 判断字符串格式是否为yyyy-MM-dd HH
                if (dateStr.matches("\\d{4}-\\d{1,2}-\\d{1,2} \\d{1,2}")) {

                    dateStr = dateStr + ":00";

                } else {
                    return null;
                }
        }
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        date = format.parse(dateStr);
        return date;

    }

    /**
     * 字符串转换为指定格式的字符串
     *
     * @param dateStr
     * @param arg
     *            日期格式
     * @return
     * @throws ParseException
     */
    public static Date stingTODate(String dateStr, String arg)
            throws ParseException {
        // 判断传入的字符串是否为空
        if (dateStr != null && (!dateStr.equals(""))) {
            DateFormat format = new SimpleDateFormat(arg);
            Date date = format.parse(dateStr);
            return date;
        }
        return null;
    }

    /**
     * sqlDa.据转换为util.Date数据
     *
     * @param sqlData
     * @return
     */
    public static Date sqlToUntil(java.sql.Date sqlData) {
        Date untilDate = new Date(sqlData.getTime());
        return untilDate;
    }

    /**
     * util.Date数据转换为sql.Date数据
     *
     * @param utilData
     * @return
     */
    public static java.sql.Date untilToSql(Date utilData) {
        java.sql.Date sqllDate = new java.sql.Date(utilData.getTime());
        return sqllDate;
    }

    /**
     * 日期加减
     *
     * @param startDate
     *            開始日期
     * @param yearCount
     *            加年
     * @param monthCount
     *            加月
     * @param dayCount
     *            加天
     * @return
     * @throws ParseException
     */
    public static Date getDateByCount(String startDate, int yearCount,
                                      int monthCount, int dayCount) throws ParseException {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(new SimpleDateFormat("yyyyMMdd").parse(
                startDate).getTime()));
        if (yearCount > 0)
            calendar.add(Calendar.YEAR, yearCount);
        if (monthCount != 0)
            calendar.add(Calendar.MONTH, monthCount);
        if (dayCount != 0)
            calendar.add(Calendar.DAY_OF_MONTH, dayCount);
        return calendar.getTime();
    }

    public static void main(String[] args) throws ParseException {
        System.out.println("" + getDateByCount("20140129", 0, 0, 100));
    }

    /**
     * 根据起始日期和结束日期获得相隔天数
     *
     * @param startDate
     *            起始日期 例如：18991231
     * @param endDate
     *            结束日期 例如：20121231
     * @return
     * @throws ParseException
     */
    public static Long getRemainingdays(String startDate, String endDate)
            throws Exception {
        try {
            long start = new SimpleDateFormat("yyyyMMdd").parse(startDate)
                    .getTime();
            long end = new SimpleDateFormat("yyyyMMdd").parse(endDate)
                    .getTime();
            long day = (end - start) / 1000 / 60 / 60 / 24;
            return day;
        } catch (Exception e) {
            // TODO: handle exception
            logger.error(e.getMessage(), e);
        }
        return 0l;

    }

    /**
     * 日期字符串互转
     *
     * @param datesrc
     *            转换前日期字符串
     * @param srcFormat
     *            转换前日期格式
     * @param srcFormat
     *            转换后的日期格式
     * @return 转换后的日期字符串
     */
    public static String format(String datesrc, String srcFormat,
                                String toFormat) {
        SimpleDateFormat sdf = new SimpleDateFormat(srcFormat);
        Date srcdate;
        try {
            srcdate = sdf.parse(datesrc);
        } catch (ParseException e) {
            throw new RuntimeException("格式化转换日期失败");
        }
        sdf.applyPattern(toFormat);

        return sdf.format(srcdate);
    }

    /**
     * 判断输入日期和当前日期的相隔天数
     *
     * @param date
     *            日期
     * @return 输入时间大于当前时间返回负数
     * @throws Exception
     */
    public static Long getDateSpaceNew(String date) throws Exception {
        String newdate = getDateString().replace("-", "");
        return getRemainingdays(date, newdate);
    }

    /**
     * 给Date加上year年，month月,day天
     *
     * @param date
     * @param year
     * @param month
     * @param day
     * */
    public static Date addYearAndMonthAndDay(Date date, int year, int month,
                                             int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, year);
        calendar.add(Calendar.MONTH, month);
        calendar.add(Calendar.DAY_OF_MONTH, day);
        return calendar.getTime();
    }

}
