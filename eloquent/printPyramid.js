drawPyramid(7);
drawPyramid(10, "x", ".");

function drawPyramid()
{
	var width = (arguments.length < 1 ? 5 : arguments[0]);
	var brick = (arguments.length < 2 ? "@" : arguments[1]);
	var space = (arguments.length < 3 ? " " : arguments[2]);

	var height = width / 2 + 0.5;
	for (var y = 1; y <= height; ++y) {
		for (var x = 0; x < (width / 2) - y; ++x) {
			print(space);
		}
		for (; x < (width / 2) + y - 0.5; ++x) {
			print(brick);
		}
		for (; x < width; ++x) {
			print(space);
		}
		print("\n");
	}
}

// Wrapper for text output function
function print(str)
{
	if (print.strbuffer === undefined) {
		print.strbuffer = "";
	}

	if (typeof(str) == "string") {
		print.strbuffer += str;
		/* When newline char is detected, output and clear buffer */
		if (print.strbuffer[print.strbuffer.length - 1] === "\n") {
			console.log(print.strbuffer.substring(
				0, print.strbuffer.length - 1));
			print.strbuffer = "";
		}
	} else {
		console.log("ERROR: print: \""+ str + "\" is not a string");
	}
}
