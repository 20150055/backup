#!/bin/bash


if [ "$1" = "-update" ] || [ "$1" = "-u" ];
then
 dirPath=$(cat /Library/LaunchAgents/com.backup.daemon.plist|sed -n 's/<string>\(.*\)<\/string>/\1/p'|sed -n 3p);
sudo rm /Library/LaunchAgents/com.backup.daemon.plist; 
 
 if [ "$dirPath" != " " ];
then
 cd $dirPath;
 cd ..; 
 cd ..;
 mv ./service/Repository.db ./Repository.db;
 find ./* -prune  -not -name "Repository.db" -not -name "install" -not -name "uninstall" -exec rm -r "{}" \;
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
  cd $installPath && curl -LO 'https://github.com/20150055/backup/archive/gh-pages.zip'; unzip gh-pages.zip; rm gh-pages.zip;mv backup-gh-pages/* .;rm -r backup-gh-pages; curl -LO https://nodejs.org/dist/v10.13.0/node-v10.13.0.pkg; sudo installer -pkg node-v10.13.0.pkg -target /; cd service; npm install node-bin-setup; npm install --production; cd ../installService; npm install --production; cd ..; echo "<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>

    <key>Label</key>
    <string>com.backup.daemon.plist</string>

    <key>RunAtLoad</key>
    <true/>
    
    <key>KeepAlive</key>
    <true/>

    <key>EnvironmentVariables</key>
    <dict>
      <key>PATH</key>
      <string><![CDATA[/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin]]></string>
    </dict>

    <key>WorkingDirectory</key>
    <string>$PWD/service/build</string>

    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/node</string>
      <string>index.js</string>
    </array>
</dict></plist>" >> com.backup.daemon.plist; sudo mv "com.backup.daemon.plist" /Library/LaunchAgents; launchctl load /Library/LaunchAgents/com.backup.daemon.plist; mv ./Repository.db ./service/Repository.db 2> /dev/null