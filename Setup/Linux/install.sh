#!/bin/bash


if [ "$#" -lt 1 ]; then
    echo "Illegal number of parameters: <path> <-i|-u|-install|-update|-d|-download>"
    exit;
fi
  if [ "$1" != "-install" ] || [ "$1" != "-i" ]; 
  then
    installPath="$2";
    sudo apt install jq && sudo apt install curl;
    mkdir -p $installPath && mkdir /home/$USER/temp_backup380 && cd /home/$USER/temp_backup380  && wget -T 360 "https://github.com/20150055/backup/archive/gh-pages.zip" && unzip -o gh-pages.zip && rm gh-pages.zip && mv -f backup-gh-pages/* . && rm -r backup-gh-pages && version=$(curl -s "https://api.github.com/repos/restic/restic/releases/latest"| jq -r ".tag_name" | cut -d 'v' -f 2) &&  wget "https://github.com/restic/restic/releases/download/v$version/restic_${version}_linux_amd64.bz2" -O "restic.bz2" && bzip2 -d restic.bz2 && mv restic service/build && sudo apt-get update && sudo apt-get -y install nodejs && sudo apt-get -y install npm && cd service  && npm install node-bin-setup && npm install --production && cd build && echo "Description=index.js
    After=network.target

    [Service]
    Environment=NODE_PORT=3001
    Type=simple
    User=$USER
    ExecStart=/usr/bin/node $installPath/service/build/index.js
    Restart=on-failure

    [Install]
    WantedBy=multi-user.target" > backup.service && sudo mv "backup.service" "/lib/systemd/system" &&  sudo mv /home/$USER/temp_backup380/* $installPath && sudo systemctl daemon-reload && sudo systemctl start backup && sudo systemctl enable backup && cd ~/Desktop && echo "[Desktop Entry]
    Encoding=UTF-8
    Name=Backup380         
    Type=Link
    URL=http://localhost:8380/" >> Backup.desktop && cd $installPath  && rm -rf /home/$USER/temp_backup380 && echo "Installation of Backup380 finished"

  fi;

if [ "$1" = "-download" ] || [ "$1" = "-d" ];
then
  sudo apt install jq && sudo apt install curl;
  mkdir /home/$USER/temp_backup380 && cd /home/$USER/temp_backup380  && wget -T 360 "https://github.com/20150055/backup/archive/gh-pages.zip" && unzip -o gh-pages.zip && rm gh-pages.zip && mv -f backup-gh-pages/* . && rm -r backup-gh-pages && version=$(curl -s "https://api.github.com/repos/restic/restic/releases/latest"| jq -r ".tag_name" | cut -d 'v' -f 2) &&  wget "https://github.com/restic/restic/releases/download/v$version/restic_${version}_linux_amd64.bz2" -O "restic.bz2" && bzip2 -d restic.bz2 && mv restic service/build && sudo apt-get update && sudo apt-get -y install nodejs && sudo apt-get -y install npm && cd service  && npm install node-bin-setup && npm install --production;
fi;
if [ "$1" = "-update" ] || [ "$1" = "-u" ];
then
  dirPath=$(sudo systemctl show backup.service | grep -o "argv\[\]=[^;]*;" | cut -d " " -f 2)&&dirPath=$(dirname $dirPath)
  if [ "$dirPath" != " " ];
  then
    sudo systemctl stop backup && sudo systemctl disable backup && sudo rm "/lib/systemd/system/backup.service" && sudo systemctl daemon-reload && cd $dirPath && cd .. && cd .. && dirPath=$PWD && sudo find ./* -prune  -not -name "Repository.db" -not -name "install.sh" -not -name "uninstall.sh" -exec rm -r "{}" \;
    sudo sh -c 'echo "Description=index.js
    After=network.target

    [Service]
    Environment=NODE_PORT=3001
    Type=simple
    User=$USER
    ExecStart=/usr/bin/node $installPath/service/build/index.js
    Restart=on-failure

    [Install]
    WantedBy=multi-user.target" > backup.service' && echo backup.service && sudo mv "backup.service" "/lib/systemd/system" &&  sudo mv /home/$USER/temp_backup380/* $dirPath && sudo systemctl daemon-reload && sudo systemctl start backup && sudo systemctl enable backup
  else
    echo "Error: could not find service"
  fi;
  
  
fi;