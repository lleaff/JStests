function obj() {
	this.cprop = "c";
	this.ocprop = { yop: "hey" };
}

obj.prototype = {
	pprop: "p",
	opprop: { yop: "hai" } /* Modifications to opprop.yop will affect every instance of the object */
};

var objInst1 = new obj();
var objInst2 = new obj();


objInst1.cprop = "x";
console.log("1.cprop: "+objInst1.cprop+"\n 2.cprop: "+objInst2.cprop);

objInst1.pprop = "y";
console.log("1.pprop: "+objInst1.pprop+"\n 2.pprop: "+objInst2.pprop);

objInst1.ocprop.yop = "yyy";
console.log("1.ocprop.yop: "+objInst1.ocprop.yop+"\n 2.ocprop.yop: "+
			objInst2.ocprop.yop);

objInst1.opprop.yop = "xxx";
console.log("1.opprop.yop: "+objInst1.opprop.yop+"\n 2.opprop.yop: "+
			objInst2.opprop.yop);
