#!/bin/bash

if [ $# -eq 0 ]
then
    echo "Required argument: name of branch to be deleted"
    echo "Exiting..."
    exit 1
fi

echo "Ensure that all your work is commited and merged."
echo "About to delete local branch and remote references to: $1. Continue? (y/n)"
read varname

if [ $varname != "y" ]
then
    echo "Aborting..."
    exit 1
else
    echo "Deleting local branch..."
    git branch -d $1
    echo "Deleting remote ref..."
    git remote prune origin
    echo "Finished successfully"
fi
