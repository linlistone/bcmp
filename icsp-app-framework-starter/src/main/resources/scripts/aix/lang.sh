#!/bin/bash 
#获取系统语言
ops=$1
if [ $ops = "used" ]; then
   echo $LANG
else
   locale -a
fi