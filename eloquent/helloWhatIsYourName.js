var name;
var defaultName = "Robert";
var timesAsked = 1;
while (true) {
	name = prompt("Hello, what's your name?");

	/* Test result and react accordingly */
	if (!isNaN(name)) {
		if (timesAsked++ <= 2) {
			alert("Ok that's not really your name...");
		} else {
			name = defaultName;
			alert("Ok let's just name you " + name + "...");
			break;
		}
	} else {
		alert(name + "?\nWow that's a nice name!");
		break;
	}
}

var age = "string";
timesAsked = 1;
while (true) {
	age = prompt("And how old are you " + name + "?"); 

	/* Test result and react accordingly */
	if (isNaN(age) || age == 0) {
		if (timesAsked++ <= 2) {
			alert("What?" + ((timesAsked === 3) ? "!" : ""));
		} else {
			alert("I'm done with you, hopeless human.");
			break;
		}
	} else {
		break;
	}
}

if (!isNaN(age) && age != 0) {
	/* Reveal the real age */
	age *= 1.6;
	/* Truncate */
	age -= age % 1

		/* Build reaction string */
		var ageReaction = age + " year" + (age > 1 ? "s" : "") + " old?\nThat's ";
		if (age < 20) {
			ageReaction += "pretty young!";
		} else if (age < 50) {
			ageReaction += "pretty old!";
		} else if (age < 80) {
			ageReaction += "unhuman...";
		}

		alert(ageReaction);
}
