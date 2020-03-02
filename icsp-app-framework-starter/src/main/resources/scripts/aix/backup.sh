#!/bin/bash 
#backup
#备份文件名
bakupFile=$1
#更新包所在目录
workDir=$2
#更新包文件名
updateFile=$3
#bips目录
bipsDir=$4

#设置语言环境
LANG=ZH_CN.UTF-8
export LANG

#获取语言环境
envLang=$LANG
if [ $envLang="ZH_CN.UTF-8" ]; then
   alias cp='cp'
   alias mv='mv'
   #保存当前目录
   nextDir=`pwd`
   #进入更新包所在目录
   cd $workDir
   
   if [ "${updateFile##*.}" = "jar" ]; then
      #按文件名排序，导出文件大小，时间和文件名
      jar -tvf $updateFile | sort -d -k 8 | grep [^/]$ | awk '{print $8}' > updateFileList.txt
      #回到上一层目录
      cd $nextDir
      mv $workDir"/updateFileList.txt" $bipsDir
      #进入bips目录
      cd $bipsDir
      #生成列表
      fileList=""
      s=`cat updateFileList.txt`
      for element in $s 
      do  
         if [[ $element == plugins/* ]]; then
            fileList=$fileList" "${element%_*}*
         elif [[ $element == update/plugins/* ]]; then
            fileList=$fileList" "${element%_*}* 
         elif [ $element = "update/plugins/version.ini" ]; then
            fileList=$fileList" "$element 
         else
            fileList=$fileList" "$element 
         fi 
      done
      
      fileList="updateFileList.txt "$fileList
      #备份文件
      jar -Mcf $bakupFile $fileList
   else
      #按文件名排序，导出文件大小，时间和文件名
      tar -tvf $updateFile | sort -d -k 8 | grep ^[^d] | awk '{print $8}' > updateFileList.txt
      #回到上一层目录
      cd $nextDir
      mv $workDir"/updateFileList.txt" $bipsDir
      #进入bips目录
      cd $bipsDir
      #备份文件
      tar -cf $bakupFile updateFileList.txt
      #加入tar文件
      cat updateFileList.txt | while read row; do
         if [[ $row == plugins/* ]]; then
            tar -uf $bakupFile ${row%_*}*
         elif [[ $row == update/plugins/* ]]; then
            tar -uf $bakupFile ${row%_*}*
         elif [ $row = "update/plugins/version.ini" ]; then
            tar -uf $bakupFile $row 
         else
            tar -uf $bakupFile $row 
         fi   
      done
   fi
   #删除文件列表
   rm -f updateFileList.txt
   #回到上一层目录
   cd $nextDir
   
   #定义备份文件夹
   backupDir=$workDir"/backup"
   if [ ! -e $backupDir ];then
     mkdir -p $backupDir
   fi

   mv $bipsDir"/"$bakupFile $backupDir
   echo "success"
else
   echo "unsupprot the lang[$envLang]"
   echo "fail"
fi