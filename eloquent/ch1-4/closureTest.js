function warehouse(good) {
	if(this.i === undefined || this.i < 0) this.i = 0;

	if(this.box === undefined) this.box = ["empty"];

	if(good !== undefined) box[++i] = good;

	var curIndex = i;

	return function() {
		return (good === undefined) ? box[curIndex--] : undefined;
	};
}

var out = [];
out[0] = warehouse("sheep");
out[1] = warehouse();
out[2] = warehouse("pig");

console.log(out[0]());
console.log(out[1]());
