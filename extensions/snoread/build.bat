@echo off && chcp 65001
REM 将文件或文件夹test压缩为test.zip
mkdir dist
powershell Compress-Archive -Path ./src -DestinationPath ./dist/SNOREAD_CHROME_EXTENSION.zip -Force
powershell mv ./dist/SNOREAD_CHROME_EXTENSION.zip ./dist/SNOREAD_CHROME_EXTENSION.crx
