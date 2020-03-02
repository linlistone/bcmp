#!/bin/bash 
# check rollback
#工作目录
workDir=$1
#回退包文件名
rollbackFile=$2
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
   rollbackWorkDir=$workDir"/backup_work"
   #保存当前目录
   nextDir=`pwd`
   #进入更新包所在目录
   cd $rollbackWorkDir
   if [ "${rollbackFile##*.}" = "jar" ]; then
      #按文件名排序，导出文件名
      jar -tvf $rollbackFile | sort -d -k 8 | grep [^/]$ | grep -v updateFileList.txt | awk '{for(i=8;i<NF;i++) printf $i" ";print $NF}' > rollbackFileList.txt
      #按文件名排序，导出文件大小和文件名
      jar -tvf $rollbackFile | sort -d -k 8 | grep [^/]$ | grep -v updateFileList.txt | awk '{print $1;for(i=8;i<NF;i++) printf $i" ";print $NF}' > tarRollbackFileList.txt
   else
      #按文件名排序，导出文件名
      tar tvf $rollbackFile | sort -d -k 6 | grep ^[^d] | awk '{for(i=6;i<NF;i++) printf $i" ";print $NF}' > rollbackFileList.txt
      #按文件名排序，导出文件大小和文件名
      tar tvf $rollbackFile | sort -d -k 6 | grep ^[^d] | awk '{print $3;for(i=6;i<NF;i++) printf $i" ";print $NF}' > tarRollbackFileList.txt
   fi
   #回到上一层目录
   cd $nextDir
   mv $rollbackWorkDir"/rollbackFileList.txt" $bipsDir
   mv $rollbackWorkDir"/tarRollbackFileList.txt" $bipsDir
   #进入bips目录
   cd $bipsDir
   
   if [ -z $rollbackFileList ]; then
        echo "success"
   else
		   #导出bips更新文件列表
		   fileList=""
		   s=`cat rollbackFileList.txt`
		   IFS=$'\n';for element in $s 
		    do  
		       fileList=$fileList" '"$element"'"
		    done
		   echo $fileList | xargs ls -lU |grep ^[^d] |awk '{printf $5" ";for(i=9;i<NF;i++) printf $i" ";print $NF}'  > bipsRollbackFileList.txt
		   # 统计文件差异
		   n=`diff tarRollbackFileList.txt bipsRollbackFileList.txt |wc -l`
		   if [ $n -eq 0 ]; then
		      echo "success"
		   else
		      echo "can not pass the checking the different parts are："
		      diff tarRollbackFileList.txt bipsRollbackFileList.txt > diff.txt
		      cat diff.txt
		      rm -f diff.txt
		      echo "fail"
		   fi
		   #删除临时文件
		   #rm -f rollbackFileList.txt
		   #rm -f tarRollbackFileList.txt
		   #rm -f bipsRollbackFileList.txt
	 fi
   #还原路径
   cd $nextDir
else
   echo "unsupport the lang[$envLang]"
   echo "fail"
fi