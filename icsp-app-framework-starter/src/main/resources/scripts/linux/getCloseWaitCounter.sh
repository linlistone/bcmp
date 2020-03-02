#!/bin/bash 
#counter close wait 
port=$1
netstat -an |grep $port |grep CLOSE_WAIT |wc -l
