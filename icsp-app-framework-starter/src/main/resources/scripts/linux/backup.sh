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
LANG=zh_CN.utf8
export LANG

#获取语言环境
envLang=$LANG
if [ $envLang="zh_CN.utf8" ]; then
   alias cp='cp'
   alias mv='mv'
   alias ls='ls'
   #保存当前目录
   nextDir=`pwd`
   #进入更新包所在目录
   cd $workDir
   
   if [ "${updateFile##*.}" = "jar" ]; then
      #按文件名排序，导出文件大小，时间和文件名
      jar -tvf $updateFile | sort -d -k 8 | grep [^/]$ | awk '{for(i=8;i<NF;i++) printf $i" ";print $NF}' > updateFileList.txt
      #回到上一层目录
      cd $nextDir
      mv $workDir"/updateFileList.txt" $bipsDir
      #进入bips目录
      cd $bipsDir
      #生成列表
      fileList=""
      s=`cat updateFileList.txt`
      IFS=$'\n';for element in $s 
      do  
         if [[ $element == plugins/* ]]; then
             tmp=`ls ${element%_*}*`
             for subElement in $tmp
             do
               if [ -f "$subElement" ]; then
                 fileList=$fileList" "$subElement
               fi
             done
          elif [[ $element == update/plugins/* ]]; then
             tmp=`ls ${element%_*}*`
             for subElement in $tmp
             do
               if [ -f "$subElement" ]; then
                 fileList=$fileList" "$subElement
               fi
             done
          elif [ $element = "update/plugins/version.ini" ]; then
             fileList=$fileList" '"$element"'"
          else
             fileList=$fileList" '"$element"'"
          fi 
      done
      
      fileList="'updateFileList.txt' "$fileList
      #备份文件
      echo $fileList|xargs jar -Mcf $bakupFile
   else
      #按文件名排序，导出文件大小，时间和文件名
      tar -tvf $updateFile | sort -d -k 6 | grep ^[^d] | awk '{for(i=8;i<NF;i++) printf $i" ";print $NF}' > updateFileList.txt
      #回到上一层目录
      cd $nextDir
      mv $workDir"/updateFileList.txt" $bipsDir
      #进入bips目录
      cd $bipsDir
      #备份文件
      #生成列表
      fileList=""
      s=`cat updateFileList.txt`
      IFS=$'\n';for element in $s 
      do  
         if [[ $element == plugins/* ]]; then
             tmp=`ls ${element%_*}*`
             for subElement in $tmp
             do
               if [ -f "$subElement" ]; then
                 fileList=$fileList" "$subElement
               fi
             done
          elif [[ $element == update/plugins/* ]]; then
             tmp=`ls ${element%_*}*`
             for subElement in $tmp
             do
               if [ -f "$subElement" ]; then
                 fileList=$fileList" "$subElement
               fi
             done
          elif [ $element = "update/plugins/version.ini" ]; then
            fileList=$fileList" '"$element"'"
          else
            fileList=$fileList" '"$element"'"
         fi 
      done
      
      fileList="'updateFileList.txt' "$fileList
      #备份文件
      echo $fileList|xargs tar -cf $bakupFile
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