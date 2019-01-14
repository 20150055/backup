#!/bin/bash


if [ "$1" = "-update" ] || [ "$1" = "-u" ];
then
 curl -LO 'https://github.com/florian4300/Demo/archive/master.zip'; unzip master.zip; rm master.zip;
else
  curl -LO 'https://github.com/florian4300/Demo/archive/master.zip'; unzip master.zip; rm master.zip; curl -LO https://nodejs.org/dist/v10.13.0/node-v10.13.0.pkg; sudo installer -pkg node-v10.13.0.pkg -target /;
fi