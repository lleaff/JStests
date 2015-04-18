#!/bin/bash
BROWSER='sensible-browser'
bodyBackgroundColor='#262626'

################################

# Test if file given in argument really exist
if [ ! -f $1 ]; then
	echo "$1: file not found, aborting";
	exit;
fi

CALLINGDIR=$(pwd)
SCRIPTDIR=$(cd $(dirname $0) && pwd)
SCRIPTNAME=$(basename ${0%.*})
HTMLFILE=$SCRIPTDIR/$SCRIPTNAME'DummyPage.html'

echo "<!-- Temporary html file for executing a .js file -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset=\"utf-8\">
		<title>${1%.*}</title>
		<script src=\"$CALLINGDIR/$1\"></script>
		<style>
			body { background-color:$bodyBackgroundColor; }
		</style>
	</head>
	<body>
	</body>
</html>" > $HTMLFILE

$BROWSER $HTMLFILE > /dev/null 2>&1
