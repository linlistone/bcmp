#!/bin/bash 
# rollback file
#更新工作目录
workDir=$1
#恢复文件
rollbackFile=$2
#恢复目录
rollbackDir=$3
#定义备份文件夹
backupDir=$workDir"/backup"
if [ ! -e $backupDir ];then
   echo "fail"
else
   alias cp='cp'
   #记录当前路径
   nextDir=`pwd`
   #定义备份工作目录
   backupWorkDir=$workDir"/backup_work"
   #删除旧的文件
   rm -rf $backupWorkDir
   #创建工作目录
   mkdir $backupWorkDir
   #拷贝文件
   cp $backupDir"/"$rollbackFile $backupWorkDir"/"
   cd $backupWorkDir
  
   if [ "${rollbackFile##*.}" = "jar" ]; then
      #解压文件
      jar -xf $rollbackFile
      #还原路径
      cd $nextDir
      mv $backupWorkDir"/updateFileList.txt" $rollbackDir"/"
      #进入工作目录
      cd $rollbackDir
      #删除更新的文件列表
      cat updateFileList.txt | while read row; do
         echo "'"$row"'" |xargs rm -f
      done
      targetDir=`pwd`
      #还原路径
      cd $nextDir
      #进入备份工作路径
      cd $backupWorkDir
      #还原文件
      ls | grep -v $rollbackFile | while read row; do
        echo "'"$row"' "$targetDir"/"|xargs cp -rf
        echo "'"$row"'" |xargs rm -f
      done
   else
      #解压文件
      tar -xf $rollbackFile
      #还原路径
      cd $nextDir
      mv backupWorkDir"/updateFileList.txt" $rollbackDir"/"
      #进入工作目录
      cd $rollbackDir
      #删除更新的文件列表
      cat updateFileList.txt | while read row; do
         echo "'"$row"'" |xargs rm -f
      done
      #记录目标文件路径
      targetDir=`pwd`
      #还原路径
      cd $nextDir
      #进入备份工作路径
      cd $backupWorkDir
      #还原文件
      ls | grep -v $rollbackFile | while read row; do
        echo "'"$row"' "$targetDir"/"|xargs cp -rf
        echo "'"$row"'" |xargs rm -f
      done
   fi  
   #还原路径
   cd $nextDir
   echo "success"
fi