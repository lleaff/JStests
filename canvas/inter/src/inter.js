var multiple = R.curry((of, x) => !(x % of));

var multiple2 = multiple(2);

console.log(multiple2(6));
console.log(multiple2(7));
