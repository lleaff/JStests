drawPyramid(7);

function drawPyramid(width, brick = "@", space = " ")
{
	var height = width / 2;
	for (var y = 1; y <= height; ++y) {
		for (var x = 0; x < (width - y) / 2; ++x) {
			print(space);
		}
		for (; x < width; ++x) {
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
		if (print.strbuffer[print.strbuffer.length - 1] === "\n") {
			print.strbuffer[print.strbuffer.length - 1] = '';
			console.log(print.strbuffer);
		}
	} else {
		console.log("ERROR: print: \""+ str + "\" is not a string");
	}
}
