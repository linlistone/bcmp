#!/bin/bash 
# list
#更新工作目录
targetDir=$1
if [ ! -e $targetDir ];then
   echo ""
else
  alias ls='ls'
  ls $targetDir
fi