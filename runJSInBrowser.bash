#!/bin/bash
BROWSER='sensible-browser'
bodyBackgroundColor='#262626'

################################
CALLINGDIR=$(pwd)
HTMLFILE=${0%.*}'DummyPage.html'

cd $(dirname $0)
echo "<!-- Temporary html file for executing a .js file -->
<!DOCTYPE html>
<html>
	<head>
		<meta charset=\"utf-8\">
		<title>${0%.*}</title>
		<script src=\"$CALLINGDIR/$1\"></script>
		<style>
			body { background-color:$bodyBackgroundColor; }
		</style>
	</head>
	<body>
	</body>
</html>" > $HTMLFILE

$BROWSER $HTMLFILE > /dev/null 2>&1
