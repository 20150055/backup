#!/bin/bash

if [ "$1" = "-update" ] || [ "$1" = "-u" ];
then
  wget "https://github.com/florian4300/Demo/archive/master.zip" && unzip -o master.zip && rm master.zip
else

  wget "https://github.com/florian4300/Demo/archive/master.zip" && unzip -o master.zip && rm master.zip && sudo apt update && sudo apt-get -y install nodejs && sudo apt-get -y install npm
fi;

