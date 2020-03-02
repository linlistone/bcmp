#!/bin/bash 
#get cup
jmxremotePort=$1

#运行tprof命令，生成sleep.prof文件
tprof -x sleep 30
#获取进程ID
processId=`ps -ef |grep java |grep Dcom.sun.management.jmxremote.port |grep $jmxremotePort |awk '{print $2}'`
#获取相应进程的CPU使用率
cat sleep.prof|grep $processId|awk '{print $4}'