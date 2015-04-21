drawPyramid();
drawPyramid(10, "x", ".");

// drawPyramid(width, brickCharacter, spaceCharacter)
function drawPyramid(width, brick, space)
{
	if (width === undefined) width = 5;
	if (brick === undefined) brick = "@";
	if (space === undefined) space = " ";

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
	if (this.strbuffer === undefined) {
		this.strbuffer = "";
	}

	if (typeof(str) == "string") {
		this.strbuffer += str;
		/* When newline char is detected, output and clear buffer */
		if (this.strbuffer[this.strbuffer.length - 1] === "\n") {
			console.log(this.strbuffer.substring(
				0, this.strbuffer.length - 1));
			this.strbuffer = "";
		}
	} else {
		console.log("ERROR: print: \""+ str + "\" is not a string");
	}
}
