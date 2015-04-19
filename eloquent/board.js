// Usage: makeCheckerBoard(size, blackChar, whiteChar)
function makeCheckerBoard() {
	var size = (arguments.length < 1) ? 8 : arguments[0];
	var blackChar = (arguments.length < 2) ? "#" : arguments[1];
	var whiteChar = (arguments.length < 3) ? "-" : arguments[2];

	var str = "";
	for (var y = 0; y < size; ++y) {
		for (var x = 0; x < size; ++x) {
			str += ((x + y) % 2) ? blackChar : whiteChar;
		}
		str += "\n";
	}
	return str;
}

console.log(makeCheckerBoard(15, "@", "-"));
