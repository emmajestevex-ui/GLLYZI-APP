@echo off
setlocal
cd /d "%~dp0"
set PORT=3105
start "" "http://127.0.0.1:%PORT%/"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 -m http.server %PORT% --bind 127.0.0.1
  exit /b
)
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server %PORT% --bind 127.0.0.1
  exit /b
)
echo No encontre Python para abrir el panel local.
echo Abre index.html manualmente o instala Python desde python.org.
pause
