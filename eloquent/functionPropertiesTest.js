function myDummyFunc(dumArg)
{
	if (myDummyFunc.dumProp === undefined) {
		console.log("INITIALIZING dumProp");
		myDummyFunc.dumProp = 11;
	}

	++myDummyFunc.dumProp;

	return myDummyFunc.dumProp;
}

for (var i = 0; i < 5; ++i) {
	console.log(myDummyFunc());
}


function myDummyStrFunc(ch)
{
	if (myDummyStrFunc.dumStrProp === undefined) {
		console.log("INITIALIZING dumStrProp");
		myDummyStrFunc.dumStrProp = "";
	}

	myDummyStrFunc.dumStrProp += ch;

	return myDummyStrFunc.dumStrProp;
}

for (var i = 0, ch = "a"; i < 5; ++i) {
	console.log(myDummyStrFunc(ch));
	ch = String.fromCharCode(ch.charCodeAt() + 1); // Increment character
}
