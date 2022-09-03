#!/usr/bin/env sh

echo "Linting"

echo "\n"
echo "/auth"
cd ./auth && npm run lint && cd .. || exit 1

echo "\n"
echo "/todo"
cd ./todo && npm run lint && cd .. || exit 1

echo "\n"
echo "/user"
cd ./user && npm run lint && cd .. || exit 1

echo "\n"
echo "/web-client"
cd ./web-client && npm run lint && cd .. || exit 1
