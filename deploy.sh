#!/bin/bash

echo "Getting affected apps"
echo "Running ./node_modules/.bin/nx affected:apps --base=remotes/origin/main --plain"
apps="$(./node_modules/.bin/nx affected:apps --base=remotes/origin/main --plain)"
echo "$apps"

echo "Starting for loop"
for targetName in $apps
do
    echo "Printing target name"
    echo "$targetName"

    if [ -z $1 ]
    then
        echo "Local build"
        npm run firebase deploy -- --only hosting:$targetName
    else
        echo "Production build"
        npm run firebase deploy -- --token $1 --only hosting:$targetName
    fi
    # 
done
