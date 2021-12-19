#! /bin/bash
output=data.js
echo "const alphabet = {" > $output
for img in $(ls *.png); do
  char=$(echo $img | gawk 'match($0, /(.*)\.png/, m) {print(m[1])}')
  data=$(base64 -w 0 $img)
  echo "$char: \"data:image/png;base64,$data\"," >> $output
done
echo "}" >> $output
