#!/bin/bash 
# unpackage update file
#更新工作目录
workDir=$1
#更新文件
updateFile=$2
#记录当前路径
nextDir=`pwd`
cd $workDir
#解压文件
if [ "${updateFile##*.}" = "jar" ]; then
   jar -xf $updateFile
else
   tar -xf $updateFile
fi
#还原路径
cd $nextDir
echo "success"