#!/bin/bash
PATH=$PATH:/usr/local/bin

if [ "$#" -lt 1 ]; then
    echo "Illegal number of parameters: <-i|-u|-install|-update|-d|-download> <path> "
    exit;
fi;
if [ "$1" = "-install" ] || [ "$1" = "-i" ];
then
  
  installPath="$2";
  mkdir -p /Users/$USER/Documents/temp_backup380;
  cd  /Users/$USER/Documents/temp_backup380;
  curl -LO 'https://github.com/20150055/backup/archive/gh-pages.zip' && unzip gh-pages.zip && rm gh-pages.zip;mv backup-gh-pages/* "." && rm -r backup-gh-pages;
  version=$(curl -s "https://api.github.com/repos/restic/restic/releases/latest"| python -c 'import sys, json; print json.load(sys.stdin)["tag_name"]' | cut -d 'v' -f 2) &&  curl -L "https://github.com/restic/restic/releases/download/v$version/restic_${version}_darwin_386.bz2" -o "restic.bz2" && bzip2 -d restic.bz2 && chmod +x restic && rm -rf restic.bz2 && mv restic ./service/build;
  versionNode=$(curl https://nodejs.org/dist/latest/ | grep -o '>node.*pkg'|awk '{print substr($1,2); }');
  curl -LO https://nodejs.org/dist/latest/$versionNode && sudo installer -pkg $versionNode -target / && cd service && npm install node-bin-setup && npm install --production && cd ../installService && npm install --production && cd .. && echo "<?xml version="1.0" encoding="UTF-8"?>
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
    <string>$installPath/service/build</string>

    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/node</string>
      <string>index.js</string>
    </array>
</dict></plist>" >> com.backup.daemon.plist && sudo mv "com.backup.daemon.plist" /Library/LaunchAgents  && cd $installPath && mv /Users/$USER/Documents/temp_backup380/* $installPath && launchctl load /Library/LaunchAgents/com.backup.daemon.plist && mv ./Repository.db ./service/Repository.db 2> /dev/null && echo "Operation finished";; 
open "http://localhost:8380";
rm -rf /Users/$USER/Documents/temp_backup380;

fi;
if [ "$1" = "-download" ] || [ "$1" = "-d" ];
then
  
  mkdir -p /Users/$USER/Documents/temp_backup380 && cd /Users/$USER/Documents/temp_backup380 && curl -LO 'https://github.com/20150055/backup/archive/gh-pages.zip' && unzip gh-pages.zip && rm gh-pages.zip && mv backup-gh-pages/* "." && rm -r backup-gh-pages;
  versionNode=$(curl https://nodejs.org/dist/latest/ | grep -o '>node.*pkg'|awk '{print substr($1,2); }');
  version=$(curl -s "https://api.github.com/repos/restic/restic/releases/latest"| python -c 'import sys, json; print json.load(sys.stdin)["tag_name"]' | cut -d 'v' -f 2) &&  curl -L "https://github.com/restic/restic/releases/download/v$version/restic_${version}_darwin_386.bz2" -o "restic.bz2" && bzip2 -d restic.bz2 && chmod +x restic && rm -rf restic.bz2 && mv restic ./service/build;
  curl -LO https://nodejs.org/dist/latest/$versionNode && sudo installer -pkg $versionNode -target / && cd service && npm install node-bin-setup && npm install --production && cd ../installService && npm install --production && echo "Operation finished";;
  
fi;
if [ "$1" = "-u" ] || [ "$1" = "-update" ];
then
    dirPath=$(cat /Library/LaunchAgents/com.backup.daemon.plist|sed -n 's/<string>\(.*\)<\/string>/\1/p'|sed -n 3p);

    if [ "$dirPath" != " " ];
      then
      cd $dirPath && cd .. && cd .. && find ./* -prune  -not -name "Repository.db"  -exec rm -r "{}" \; 
      mv ./service/Repository.db ./Repository.db;
      mv /Users/$USER/Documents/temp_backup380/* ".";
      
      echo "<?xml version="1.0" encoding="UTF-8"?>
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
      <string>$dirPath</string>

      <key>ProgramArguments</key>
      <array>
        <string>/usr/local/bin/node</string>
        <string>index.js</string>
      </array>
      </dict></plist>" >> com.backup.daemon.plist && sudo mv "com.backup.daemon.plist" /Library/LaunchAgents && launchctl load /Library/LaunchAgents/com.backup.daemon.plist && echo "Operation finished";;
      rm -rf /Users/$USER/Documents/temp_backup380;
    fi;
fi;