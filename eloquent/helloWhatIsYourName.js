alert(prompt("Hello, what's your name?", "Robert") + "?\nWow that's a nice name!");

var age = prompt("And how old are you by the way?"); 

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
