@echo off

cd c:\Users\Hiroshi\Documents\001_Work\Rst\denso-service\Source\Source
doskey mkcon=dotnet aspnet-codegenerator controller -name $1 -m $2 -dc $3 -outDir $4
echo mkcon��L���ɂ��܂����Bmkcon�ŃX�L���t�H�[���h���ł��܂��B
echo ��1�����F�R���g���[���[��
echo ��2�����F�X�L���t�H�[���h���錳��Model��
echo ��3�����F��LModel��DbSet����Ă���DataContext��
echo ��4�����F������R���g���[���̔r�o��