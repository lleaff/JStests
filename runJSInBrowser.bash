#!/bin/bash

######## User variables ########

# Default browser
BROWSERCMD=''
bodyBackgroundColor='#262626'
HTMLFILEDIR='/tmp'

####### Script variables #######

CALLINGDIR=$(pwd)
SCRIPTDIR=$(cd $(dirname $0) && pwd)
SCRIPTNAME=$(basename $0)
SCRIPTNAME=${SCRIPTNAME%.*}

# Shell output colors
nocolor='\033[0m'
errorcolor='\033[1;31m'

USAGE="Usage: $(basename $0) [FILE]... [OPTION]...${nocolor}
	-b, --browser:
		Command to launch the browser
	-B, --background:
		background-color argument in body tag, default is \"$bodyBackgroundColor\"

Examples:
	$(basename $0) someFile.js anotherFile.js -b chromium-browser
Opens an html file in Chromium with someFile.js and anotherFile.js included in this order
"

####### Process options ########

while [[ $1 ]]; do
	case $1 in
		"-h" | "--help" )
			echo "$USAGE"; exit 0 ;;
		"-b" | "--browser" ) 
			BROWSERCMD=$2; shift 2 ;;
		"-B" | "--background" )
			OPENINBACKGROUND='&'; shift ;;
		"-c" | "--color" )
			bodyBackgroundColor=$2; shift 2 ;;
		* )
			jsfiles=$jsfiles' '$1; shift ;;
	esac
done

# Test if a file was given as argument
if [[ $jsfiles == "" ]]; then 
	echo -e "${errorcolor}$USAGE"; exit 1; 
fi
# Test if files given in argument really exists
for f in $jsfiles; do
	if [ ! -f $f ]; then 
		echo -e "${errorcolor}$f: file not found, aborting${nocolor}"; exit 1; 
	fi
done

# Take window title from name of first file argument
read -r WINDOWTITLE _ <<< $jsfiles 
WINDOWTITLE=${WINDOWTITLE%.*}

################################

# If no user-specified browser cmd, try to find the most appropriate one
if [[ ! $BROWSERCMD ]]; then
	if [[ $(uname -s) == Linux ]]; then
		# For Debian based GNU/Linux distros
		if [[ -f /etc/debian_version ]]; then
			BROWSERCMD='sensible-browser' 
		else
			if [[ ! $(hash firefox) ]]; then
				BROWSERCMD='firefox'
			elif [[ ! $(hash chromium-browser) ]]; then
				BROWSERCMD='chromium browser'
			else 
				echo "${errorcolor}No supported browser found, please modify the script to include yours or install Firefox or Chromium"; exit 1;
			fi
		fi
	elif [[ $(uname -s) == "Darwin" ]]; then 
		# For OSX
		BROWSERCMD='open -a firefox'
	fi
fi


HTMLFILE=$HTMLFILEDIR'/'$SCRIPTNAME'DummyPage.html'

SCRIPTTAGS=""
for jsfile in $jsfiles; do
	SCRIPTTAGS=$SCRIPTTAGS"<script src=\"$CALLINGDIR/$jsfile\"></script>"$'\n\t\t'
done

echo "<!-- Temporary html file for executing a .js file -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset=\"utf-8\">
		<title>$WINDOWTITLE</title>
		<style>
			body { background-color:$bodyBackgroundColor; }
		</style>
		$SCRIPTTAGS
	</head>
	<body>
	</body>
</html>" > $HTMLFILE

$BROWSERCMD $HTMLFILE > /dev/null 2>&1


# if X is detected
if hash xset 2>/dev/null; then
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
fi

exit 0
