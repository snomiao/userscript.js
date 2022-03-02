
@REM # sync snoread
git subtree pull --prefix extensions/snoread git@github.com:snolab/snoread master --squash
git subtree push --prefix extensions/snoread git@github.com:snolab/snoread master
