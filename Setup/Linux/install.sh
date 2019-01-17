#!/bin/bash

if [ "$1" = "-update" ] || [ "$1" = "-u" ];
then
  
  dirPath=$(sudo systemctl show backup.service | grep -o "argv\[\]=[^;]*;" | cut -d " " -f 2)&&dirPath=$(dirname $dirPath)
  if [ "$dirPath" != " " ];
then
  sudo systemctl stop backup && sudo systemctl disable backup && sudo rm "/lib/systemd/system/backup.service" && sudo systemctl daemon-reload && cd $dirPath && cd .. && cd .. && mv ./service/Repository.db ./Repository.db && dirPath=$PWD && find ./* -prune  -not -name "Repository.db" -not -name "install.sh" -not -name "uninstall.sh" -exec rm -r "{}" \;
fi;
  fi;
  if [ "$1" != "-update" ] && [ "$1" != "-u" ]; 
  then
  while [ ! -d "$installPath" ]; do
   echo "Please enter the folder where Backup380 should be installed"
   read installPath
  done
  else
   installPath="$dirPath"
  fi;

  cd $installPath && wget "https://github.com/20150055/backup/archive/gh-pages.zip" && unzip -o gh-pages.zip && rm gh-pages.zip && mv -f backup-gh-pages/* . && rm -r backup-gh-pages && sudo apt-get update && sudo apt-get -y install nodejs && sudo apt-get -y install npm && cd service && npm install node-bin-setup && npm install --production && cd build && echo "Description=index.js
After=network.target

[Service]
Environment=NODE_PORT=3001
Type=simple
User=$USER
ExecStart=/usr/bin/node $PWD/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target" > backup.service && sudo mv "backup.service" "/lib/systemd/system" && sudo systemctl daemon-reload && sudo systemctl start backup && sudo systemctl enable backup && cd ~/Desktop && echo "[Desktop Entry]
Encoding=UTF-8
Name=Backup380         
Type=Link
URL=http://localhost:8380/" >> Backup.desktop && mv ./Repository.db ./service/Repository.db 2> /dev/null
