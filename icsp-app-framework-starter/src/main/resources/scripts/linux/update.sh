#!/bin/bash 
#工作目录
workDir=$1
#更新包文件名
updateFile=$2
#更新目录
updateDir=$3

#如果更新目录不存在，则创建该目录
if [ ! -e $updateDir ];then
  mkdir $updateDir
fi

alias cp='cp'
alias mv='mv'
#保存当前目录
nextDir=`pwd`
#移动文件到更新目录
cp -f $workDir"/"$updateFile $updateDir
#进入更新目录
cd $updateDir
#解压文件
if [ "${updateFile##*.}" = "jar" ]; then
   jar -xf $updateFile
else
   tar -xf $updateFile
fi
#删除更新文件
rm -f $updateFile
#回到上一层目录
cd $nextDir
echo "success"