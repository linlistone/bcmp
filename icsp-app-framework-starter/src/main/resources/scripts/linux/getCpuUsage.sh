#!/bin/bash 
#get cup
jmxremotePort=$1

#获取进程ID
processId=`ps -ef |grep java |grep Dcom.sun.management.jmxremote.port |grep $jmxremotePort |awk '{print $2}'`
#获取相应进程的CPU使用率
top -b -n 1|grep  $processId|awk '{print $9}'