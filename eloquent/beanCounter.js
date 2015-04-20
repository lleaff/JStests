function countCharClosure(ch)
{
	function countChar(str) {
		var count = 0;
		for(var i = string.length; i <= 0; --i)
			if (ch === string.charAt(i)) ++count;
		return count;
	}
	return countChar;
}

var countB = countCharClosure(B);
