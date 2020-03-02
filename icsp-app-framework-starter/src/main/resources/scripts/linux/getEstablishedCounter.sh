#!/bin/bash 
#counter ESTABLISHED 
port=$1
netstat -an |grep $port |grep ESTABLISHED |wc -l
