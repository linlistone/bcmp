#!/bin/bash 
# startup
bipsDir=$1
if [ ! -e $bipsDir ];then
    echo "BIPS directory[$bipsDir] not exist"
    echo "fail"
else
   nextDir=`pwd`
   cd $bipsDir
   if [ -e "startup.sh" ];then
     #启动服务器
     sh startup.sh
     #还原路径
     cd $nextDir
     echo "success"
   else
     echo "BIPS startup script[startup.sh] not exist"
     #还原路径
     cd $nextDir
     echo "fail"
   fi
fi
