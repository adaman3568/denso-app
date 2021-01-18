@echo off

cd c:\Users\Hiroshi\Documents\001_Work\Rst\denso-service\Source\Source
doskey mkcon=dotnet aspnet-codegenerator controller -name $1 -m $2 -dc $3 -outDir $4
echo mkconを有効にしました。mkconでスキャフォールドができます。
echo 第1引数：コントローラー名
echo 第2引数：スキャフォールドする元のModel名
echo 第3引数：上記ModelがDbSetされているDataContext名
echo 第4引数：作ったコントローラの排出先