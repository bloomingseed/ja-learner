#! /bin/bash
mkdir tmp

LONG_CHARS="kya kyu kyo sha shu sho cha chu cho nya nyu nyo hya hyu hyo mya myu myo rya ryu ryo gya gyu gyo ja ju jo bya byu byo pya pyu pyo"

for img in $(ls|grep .png); do convert $img -crop 90x90+23+10 tmp/$img; done
for img in $LONG_CHARS; do convert $img.png -crop 140x80+30+12 tmp/$img.png; done
