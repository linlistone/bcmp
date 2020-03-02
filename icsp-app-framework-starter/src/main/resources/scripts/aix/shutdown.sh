#!/bin/bash 
# shutdown
bipsDir=$1
if [ ! -e $bipsDir ];then
    echo "BIPS directory[$bipsDir] not exist"
    echo "fail"
else
   nextDir=`pwd`
   cd $bipsDir
   if [ -e "shutdown.sh" ];then
     #关闭服务器
     sh shutdown.sh
     #还原路径
     cd $nextDir
     echo "success"
   else
     echo "BIPS shutdown script[shutdown.sh]not exist"
     #还原路径
     cd $nextDir
     echo "fail"
   fi
fi
