#!/bin/bash

apps="$(./node_modules/.bin/nx affected:apps --plain)"
echo "$apps"

for targetName in $apps
do
    echo "$targetName"
    if [ -z $1 ]
    then
        firebase deploy --only hosting:$targetName
    else
        firebase deploy --token $1 --only hosting:$targetName
    fi
    # 
done