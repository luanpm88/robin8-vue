#!/bin/sh
echo "开始编译打包"
npm run build  #打包

path=/home/deployer/apps/robin8_vue/dist
echo "部署到$path"

# deploy qa
cd dist && scp -r . qa:$path

