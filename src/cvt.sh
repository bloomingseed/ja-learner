#! /bin/bash
mkdir tmp

for img in $(ls|grep .png); do convert $img -crop 90x90+23+10 tmp/$img; done
for img in $(ls | egrep "[a-z][ysh][aioeu]*"); do convert $img -crop 140x80+30+12 tmp/$img; done
for img in shi.png chi.png tsu.png ; do convert $img -crop 90x90+23+10 tmp/$img; done
