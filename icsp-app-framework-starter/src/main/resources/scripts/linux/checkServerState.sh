#!/bin/bash 
# check server state
port=$1
n=`netstat -an |grep ':'$port' ' |grep LISTEN |wc -l`
if [ $n -eq 0 ]; then
   n=`netstat -an |grep ','$port' ' |grep LISTEN |wc -l`
  if [ $n -eq 0 ]; then
     echo "close"
  elif [ $n -eq 1 ]; then
     echo "open"
  else
     echo "unkonwn error"
     netstat -an |grep $port |grep LISTEN
  fi
elif [ $n -eq 1 ]; then
  echo "open"
else
   echo "unkonwn error"
   netstat -an |grep $port |grep LISTEN
fi