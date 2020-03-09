#!/bin/bash
#获取服务器应用版本号
versionDir=$1
if [ ! -e $versionDir ];then
    echo "Fail: BIPS Directory[ $versionDir ] Not Exist!"
else
   cd $versionDir
   if [ ! -e "version.ini" ];then
     echo `cat version.ini`
   else
     echo "Fail: BIPS GetVersion Script[ version.ini ] Not Exist !"
   fi
fi