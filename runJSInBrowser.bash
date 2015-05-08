#!/bin/bash

######## User variables ########

# Default browser
BROWSERCMD=''
bodyBackgroundColor='#262626'
BASEDIR='/tmp'

####### Script variables #######

CALLINGDIR=$(pwd)
SCRIPTDIR=$(cd $(dirname $0) && pwd)
SCRIPTNAME=$(basename $0)
SCRIPTNAME=${SCRIPTNAME%.*}

# Shell output colors
nocolor='\033[0m'
errorcolor='\033[1;31m' #red
okcolor='\033[0;32m' #green
discreetcolor='\033[0;35m' #purple

# Detect Mac OS
if [[ $(uname -s) == "Darwin" ]]; then OSX=true; else unset OSX; fi

USAGE="Usage: $(basename $0) [FILE]... [OPTIONS]...${nocolor}
	-h, --help:
		Show this help
	-x, --extra:
		Include extra file in temporary folder (without any reference in the generated HTML file)
	-l, --nosymlink
		Copy the extra included file(s) instead of making symbolic links to them, useful if your script(s) modify their content
	-C, --copyjsfiles
		Copy the JavaScript(s) files instead of making symbolic links to them, you will have to rerun this script to apply updates to your script(s)
	-b, --browser:
		Command to launch the browser
	-c, --color:
		background-color CSS argument for body tag, default is \"$bodyBackgroundColor\"
	--install DIR [executable name]:
		copy the script file to DIR

Examples:
	$(basename $0) someFile.js anotherFile.js -b chromium-browser
Opens an html file in Chromium with someFile.js and anotherFile.js included in the same order
"

drawSeparator()
{
	if [[ $1 ]]; then sign=$1; else sign='-'; fi
	# Stupid but reliable method that works with '*'
	str=""
	i=$(tput cols); while [[ $i > 0 ]]; do str+="$sign"; i=$[$i-1]; done
	echo "$str"
}

################################

createDirIfNotExist() {
	if [[ ! -d $1 ]]; then
		if [[ ! $OSX ]]; then local STATFORMAT='--format=%U';
		else local STATFORMAT='-f %Su'; fi
		if [[ $(stat $STATFORMAT $BASEDIR) == "root" ]]; then
			NEEDSUDO=sudo
			echo "Need root permission to create folder in $BASEDIR, using \"sudo\"..."
		else 
			NEEDSUDO="" 
		fi

		$NEEDSUDO mkdir -p $1
		$NEEDSUDO chown $USER $1
	fi
}

TMPFILESDIR=$BASEDIR'/'$SCRIPTNAME'Files'

# Install script
inst()
{
	createDirIfNotExist $1
	# We can reuse NEEDSUDO since it isn't declared as local to the function
	$NEEDSUDO cp $0 "$1/$2"
	createDirIfNotExist $TMPFILESDIR
}

####### Process options ########

while [[ $1 ]]; do
	case $1 in
		"-h" | "--help" )
			echo "$USAGE"; exit 0 ;;
		"--install" )
			INSTALLDIR=$2; INSTALLNAME=$3;
			inst $INSTALLDIR $INSTALLNAME; exit 0 ;;
		"-b" | "--browser" ) 
			BROWSERCMD=$2; shift 2 ;;
		"-c" | "--color" )
			bodyBackgroundColor=$2; shift 2 ;;
		"-x" | "--extra" )
			extrafiles=$extrafiles' '$2; shift 2 ;;
		"-l" | "--nosymlink" )
			nosymlink=true; shift ;;
		"-C" | "--copyjsfiles" )
			copyjsfiles=true; shift ;;
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

# Take window title from name of last file argument
HTMLDOCTITLE=${jsfiles##* }
HTMLDOCTITLE=${HTMLDOCTITLE%.*}

################################

# Create script work directory if it doesn't exist
createDirIfNotExist $TMPFILESDIR

# Clean script work directory
if [[ "$(ls -A $TMPFILESDIR)" ]]; then
	for file in $TMPFILESDIR/*; do
		found=false
		for folderfile in $extrafiles; do
			if [[ "($basename $folderfile)" == $(basename $file) ]]; then
				found=true
			fi
		done
		if [[ $found == false ]]; then 
			rm $file; deletedfiles=$deletedfiles' '$(basename $file);
		fi 
	done
	if [[ $deletedfiles ]]; then
		echo -e "${discreetcolor}Removed old temporary files in $TMPFILESDIR:\n$deletedfiles${nocolor}";
	fi
fi

# Populate script work directory
if [[ ! $copyjsfiles ]]; then linkOperationForjsfiles='ln -s';
else linkOperationForjsfiles='cp'; fi
if [[ ! $nosymlink ]]; then linkOperationForextrafiles='ln -s';
else linkOperationForextrafiles='cp'; fi

for file in $jsfiles; do
	$linkOperationForjsfiles "$(pwd)/$file" "$TMPFILESDIR/$(basename $file)"
done
for file in $extrafiles; do
	$linkOperationForextrafiles "$(pwd)/$file" "$TMPFILESDIR/$(basename $file)"
done

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
				BROWSERCMD='chromium-browser'
			else 
				echo "${errorcolor}No supported browser found, please specify one with the -b option or modify the first appearance of BROWSERCMD in the script to include yours to make it permanent, or install either Firefox or Chromium"; exit 1;
			fi
		fi
	elif [[ $(uname -s) == "Darwin" ]]; then 
		# For OSX
		BROWSERCMD='firefox'
	fi
fi

# Find out what family of browser BROWSERCMD refers to
BROWSER=""
case "$BROWSERCMD" in
	"sensible-browser" )
		if [[ -n "$(sensible-browser --help 2>/dev/null |
			grep firefox)" ]]; then
			BROWSER="firefox"
		elif [[ -n "$(sensible-browser --help 2>/dev/null | 
			grep chromium\|chrome)" ]]; then
			BROWSER="chromium"
		fi ;;
	"firefox" )
		BROWSER="firefox" ;;
	"chromium-browser" | "Google Chrome" )
		BROWSER="chromium" ;;
esac

case "$BROWSER" in
	"firefox" )
		BROWSEROPTIONS='--foreground --jsconsole'
esac

HTMLFILE=$TMPFILESDIR'/'$SCRIPTNAME'DummyPage.html'

SCRIPTTAGS=""
for jsfile in $jsfiles; do
	SCRIPTTAGS=$SCRIPTTAGS"<script src=\"$jsfile\"></script>"$'\n\t\t'
done

echo "<!DOCTYPE html>
<!-- Temporary html file for executing JavaScript files -->

<html>
	<head>
		<meta charset=\"utf-8\">
		<title>$HTMLDOCTITLE</title>
		<style>
			body { background-color:$bodyBackgroundColor; }
		</style>
		$SCRIPTTAGS
	</head>
	<body>
	</body>
</html>" 1> $HTMLFILE 2> /dev/null


# Launch the browser
echo -e "${okcolor}Opening page in $BROWSER...${nocolor}"
eval "${OSX:+open -a }'$BROWSERCMD' $HTMLFILE ${OSX:+--args }$BROWSEROPTIONS > /dev/null 2>&1 &"
if [[ ! $OSX ]]; then disown; fi


# if X is detected
if hash xset 2>/dev/null; then
	# Send keystrokes to open the JavaScript console
	if hash xdotool 2>/dev/null; then
		xdotoolBrowserWindow=$(echo $(xdotool search --name "$HTMLDOCTITLE") | awk '{print $1}')
		xdotool windowactivate $xdotoolBrowserWindow
		case $BROWSER in
			"firefox" )
				xdotool keydown Shift keydown Ctrl key --window $xdotoolBrowserWindow K keyup Shift keyup Ctrl; ;;
			"chromium" )
				xdotool keydown Shift keydown Ctrl key --window $xdotoolBrowserWindow J keyup Shift keyup Ctrl; ;;
		esac
	else
		echo "You should install xdotool so this script can open your browser's JavaScript console automatically"
	fi
fi

exit 0
