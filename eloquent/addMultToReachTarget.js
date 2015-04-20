console.log("You have two operations available:\n\tAdd 5\n\t Multiply by 3");
console.log("For each number, print the shortest sequence of operations required to go from 1 to the target");

var targets = [ 1, 3, 13, 15, 24, 511, 999, 1024, 9999999999999 ];

for (var i = 0, solution; i < targets.length; ++i) {
	solution = solveProblem(targets[i]);
	console.log(targets[i] + ':\n' + (solution === "none" ? "Can't reach" : solution));
}

function solveProblem(target) {
	var start = 1;
	var successfullOperationRoutes = ["none"];
	var currNum = 1;

	function find(currNum, prevOperations) {
		if (currNum === target) {
			successfullOperationRoutes.push(prevOperations);
			return null;
		} else if (currNum > target) {
			return null;
		} else {
			return find(currNum + 5, prevOperations + "+") ||
				find(currNum * 3, prevOperations + "*");
		}
	}
	find(start, "");

	if (successfullOperationRoutes.length === 1) {
		return "none";
	} else {

		// Need to find the maximum value to have something to compare the values to after
		var max = 0;
		for (var i = 1; i < successfullOperationRoutes.length; ++i) {
			if (successfullOperationRoutes[i].length > max) max = successfullOperationRoutes[i].length;
		}
		var min = max;
		var minIndex;
		for (i = 1; i < successfullOperationRoutes.length; ++i) {
			if (successfullOperationRoutes[i].length <= min) {
				min = successfullOperationRoutes[i];
				minIndex = i;
			}
		}
		return successfullOperationRoutes[minIndex];
	}
}
