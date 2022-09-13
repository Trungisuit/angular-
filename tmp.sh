#!/bin/bash
a="12"
b="12"
c="12"

if [ "$a" == "$b" ] || [ "$a" == "$c" ]
then
	echo "=="
else
	echo "!="
fi
