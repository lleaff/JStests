function countCharClosure(ch)
{
	function countChar(str) {
		var count = 0;
		for(var i = str.length; i >= 0; --i)
			if (ch === str.charAt(i)) ++count;
		return count;
	}
	return countChar;
}

var countB = countCharClosure("B");


/*========================*
 *        Testing         *
 *========================*/

var testC = 6;
var testStringSizeRange = [30, 50];

var testString = "";
var occurences;

function testCountCharWith(str)
{
	occurences = countB(str);
	console.log("The letter B " + (occurences ? "appears " + occurences + " time" + (occurences > 1 ? "s" : "") : "isn't") + " in the string:\n" + str);
}

var edgeCases = [
	"",
	"a",
	"B"
];
for (var j = 0; j < edgeCases.length; ++j) {
	testCountCharWith(edgeCases[j]);
}

/* Random tests */
for (var i = 0; i < testC; ++i) {
	testCountCharWith(randomString(testStringSizeRange));
}

function randomString(range)
{
	var str = "";
	for (var i = randomInt(range); i > 0; --i) {
		str += randomLetter();
	}
	return str;
}

function randomInt(range)
{
	if (typeof(range) !== "object") {
		range = [ 0, range ];
	}
	return Math.round((Math.random() * (range[1] - range[0])) + range[0]);
}

function randomChar(codeRanges)
{
	if ((codeRanges !== undefined && typeof(codeRanges) !== "object") || 
			codeRanges.length % 2 !== 0) {
		console.log("ERROR: codeRanges needs to be an integer array of even length");
		return;
	}

	var randNumRange = 0;
	for (var i = codeRanges.length - 1; i >= 1; i -= 2) {
		randNumRange += codeRanges[i] - codeRanges[i - 1];
	}

	var randNum = randomInt(randNumRange);

	var chCode;
	for (var j = 0; j <= codeRanges.length - 2; j += 2) {
		if (randNum <= codeRanges[j + 1] - codeRanges[j]) {
			chCode = randNum + codeRanges[j];
			break;
		} else {
			randNum -= (codeRanges[j + 1] - codeRanges[j]);
		}
	}

	return String.fromCharCode(chCode);
}
function randomLetter()
{
	function charCode(ch) 
	{
		return ch.charCodeAt(0);
	}
	codeRanges = [
		charCode("a"),
		charCode("z"),
		charCode("A"),
		charCode("Z"),
	];
	return randomChar(codeRanges);
}
