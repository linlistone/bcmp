#!/bin/bash 
# check
#更新包所在目录
updateDir=$1
#更新包文件名
updateFile=$2
#bips目录
bipsDir=$3

#设置语言环境
LANG=zh_CN.utf8
export LANG

#获取语言环境
envLang=$LANG
if [ $envLang="zh_CN.utf8" ]; then
   alias cp='cp'
   alias mv='mv'
   #保存当前目录
   nextDir=`pwd`
   #进入更新包所在目录
   cd $updateDir
   if [ "${updateFile##*.}" = "jar" ]; then
      #按文件名排序，导出文件名
      jar -tvf $updateFile | sort -d -k 8 | grep [^/]$ | awk '{for(i=8;i<NF;i++) printf $i" ";print $NF}' > updateFileList.txt
      #按文件名排序，导出文件大小和文件名
      jar -tvf $updateFile | sort -d -k 8 | grep [^/]$ | awk '{printf $1" ";for(i=8;i<NF;i++) printf $i" ";print $NF}' > tarUpdateFileList.txt
   else
      #按文件名排序，导出文件名
      tar tvf $updateFile | sort -d -k 6 | grep ^[^d] | awk '{for(i=6;i<NF;i++) printf $i" ";print $NF}' > updateFileList.txt
      #按文件名排序，导出文件大小和文件名
      tar tvf $updateFile | sort -d -k 6 | grep ^[^d] | awk '{printf $3" ";for(i=6;i<NF;i++) printf $i" ";print $NF}' > tarUpdateFileList.txt
   fi
   #回到上一层目录
   cd $nextDir
   mv $updateDir"/updateFileList.txt" $bipsDir
   mv $updateDir"/tarUpdateFileList.txt" $bipsDir
   #进入bips目录
   cd $bipsDir
   fileList=""
   s=`cat updateFileList.txt`
   IFS=$'\n';for element in $s 
    do  
       fileList=$fileList" '"$element"'"
    done
      
   #导出bips更新文件列表
   echo $fileList | xargs ls -lU |grep ^[^d] |awk '{printf $5" ";for(i=9;i<NF;i++) printf $i" ";print $NF}' > bipsUpdateFileList.txt
   # 统计文件差异
   n=`diff tarUpdateFileList.txt bipsUpdateFileList.txt |wc -l`
   if [ $n -eq 0 ]; then
      echo "success"
   else
      echo "can not pass the checking the different parts are:"
      diff tarUpdateFileList.txt bipsUpdateFileList.txt > diff.txt
      cat diff.txt
      rm -f diff.txt
      echo "fail"
   fi
   #删除临时文件
   #rm -f updateFileList.txt
   #rm -f tarUpdateFileList.txt
   #rm -f bipsUpdateFileList.txt
   #还原路径
   cd $nextDir
else
   echo "unsupport the lang[$envLang]"
   echo "fail"
fi