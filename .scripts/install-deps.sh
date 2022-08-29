#!/usr/bin/env sh

echo "Installing Dependencies"

echo "\n"
echo "/auth"
cd ./auth && npm ci && cd .. || exit 1

echo "\n"
echo "/todo"
cd ./todo && npm ci && cd .. || exit 1

echo "\n"
echo "/user"
cd ./user && npm ci && cd .. || exit 1
