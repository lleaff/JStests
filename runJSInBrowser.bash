#!/bin/bash

######## User variables ########

BROWSERCMD='sensible-browser' # Default browser
bodyBackgroundColor='#262626'
HTMLFILEDIR='/tmp'

################################

CALLINGDIR=$(pwd)
SCRIPTDIR=$(cd $(dirname $0) && pwd)
SCRIPTNAME=$(basename ${0%.*})
WINDOWTITLE=${1%.*}

errorcolor='\033[1;31m'
# Test if a file was given as argument
if (( $# < 1 )); then 
	echo -e "${errorcolor}Usage: $(basename $0) myScript.js"; exit 1; fi
# Test if file given in argument really exists
if [ ! -f $1 ]; then 
	echo -e "${errorcolor}$1: file not found, aborting"; exit 1; fi

HTMLFILE=$HTMLFILEDIR'/'$SCRIPTNAME'DummyPage.html'

echo "<!-- Temporary html file for executing a .js file -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset=\"utf-8\">
		<title>$WINDOWTITLE</title>
		<style>
			body { background-color:$bodyBackgroundColor; }
		</style>
		<script src=\"$CALLINGDIR/$1\"></script>
	</head>
	<body>
	</body>
</html>" > $HTMLFILE

$BROWSERCMD $HTMLFILE > /dev/null 2>&1


# Send keystrokes to open the JavaScript console
if hash xdotool 2>/dev/null; then
	# if firefox is detected
	if [[ -n $(ps aux | grep firefox | grep -v grep) ]]; then
		xdotool keydown Shift keydown Ctrl key --window "$(xdotool search --name \"$WINDOWTITLE\")" K keyup Shift keyup Ctrl;
	# else if chromium is detected
	elif [[ -n $(ps aux | grep chromium | grep -v grep) ]]; then
		xdotool keydown Shift keydown Ctrl key --window "$(xdotool search --name \"$WINDOWTITLE\")" J keyup Shift keyup Ctrl;
	fi
else
	echo "You should install xdotool so this script can open your browser's JavaScript console automatically"
fi

exit 0
