#!/bin/bash 
#kill 进程
jmxremotePort=$1
#获取符合条件的进程数
n=`ps -ef |grep java |grep Dcom.sun.management.jmxremote.port |grep $jmxremotePort |awk '{print $2}' |wc -l`
if [ $n -eq 0 ]; then
  echo "jmxremotePort[$jmxremotePort]not exist"
  echo "success"
elif [ $n -eq 1 ]; then
  #获取进程ID
  processId=`ps -ef |grep java |grep Dcom.sun.management.jmxremote.port |grep $jmxremotePort |awk '{print $2}'`
  #kill进程
  kill -9 $processId
  echo "success"
else
  echo "jmxremotePort[$jmxremotePort]duplicate"
  ps -ef |grep java |grep Dcom.sun.management.jmxremote.port |grep $jmxremotePort
  echo "fail"
fi