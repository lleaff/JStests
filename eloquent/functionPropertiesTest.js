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
