drawPyramid(7);

function drawPyramid(width, brick = "@", space = " ")
{
	var height = width / 2;
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
			print.strbuffer[print.strbuffer.length - 1] = "";
			console.log(print.strbuffer + "<<<");
			print.strbuffer = "";
		}
	} else {
		console.log("ERROR: print: \""+ str + "\" is not a string");
	}
}
