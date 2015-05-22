/* =Array
 * ------------------------------------------------------------ */
function shuffleArray(arr) {
	for (var i = 0, len = arr.length, visited = []; i < len; ++i) {
		if (visited.indexOf(i) === -1) continue;
		var rand = Math.random()*len>>0;
		visited.push(rand);
		
		var tmp = arr[i];
		arr[i] = arr[rand];
		arr[rand] = tmp;
	}
}
