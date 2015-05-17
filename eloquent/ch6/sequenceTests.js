var testArr1 = [ "one", "two", "three", "four", "five", "six", "seven" ];
var testArr2 = [ "one", "two" ];

testArr1.next();

console.log("testArr1:"); logFive(testArr1);
console.log("testArr2:"); logFive(testArr2);

console.log(Array(61).join("-"));

var TwoToFiftyRange = new RangeSeq(2, 50);
var OneToFourRange = new RangeSeq(1, 4);

console.log("[2-50]:"); logFive(TwoToFiftyRange);
console.log("[1-4]:"); logFive(OneToFourRange);

console.log(Array(61).join("-"));

var aToZ = new RangeSeq("a", "z");

console.log("[a-z]:"); logFive(aToZ);

console.log(Array(61).join("-"));

console.log("all (reversed):"); logAll(aToZ, true);
