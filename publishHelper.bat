git add .
git commit -a -m "publish"
git push
start "" npm version patch

@REM publish
start "" chrome --new-window https://greasyfork.org/import
@REM start "" chrome --new-window https://openuserjs.org/user/add/scripts

@REM gh raw file
start "" chrome --new-window https://github.com/snomiao/userscript.js/raw/master/%~n1%~x1