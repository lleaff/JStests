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
	if (print.strbuffer == undefined) {
		console.log("STRBUFFER INITIALIZATION");//DEBUG
		strbuffer = "";
	}

	console.log("str = " + str);//DEBUG
	if (typeof(str) == "string") {
		print.strbuffer += str;
		console.log("DEBUG:strbuffer>" + strbuffer);//DEBUG
		if (strbuffer[strbuffer.length - 1] === "\n") {
			alert("NEWLINE");//DEBUG
			strbuffer[strbuffer.length - 1] = '';
			console.log(strbuffer);
		}
	} else {
		console.log("ERROR: print: \""+ str + "\" is not a string");
	}
}
