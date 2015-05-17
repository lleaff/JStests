function buildSequenceInterfaceOn(prototypeObject) {
	Object.defineProperty(prototypeObject, "sequenceInterface", {
		configurable: false, enumerable: false, 
		value: {  
			currentIndex: 0,
			self: null
		}
	});

	Object.defineProperty(prototypeObject, "initSequenceInterface", {
		configurable: false, enumerable: false, 
		value: function() { 
			console.log("init: ", this);
			this.sequenceInterface.self = this; return this; }
	});
}
buildSequenceInterfaceOn(Array.prototype);

Object.defineProperty(Array.prototype.sequenceInterface, "length", {
	get: function() { return this.self && this.self.length; }
});

Array.prototype.next = function() {

};

Array.prototype.previous = function() {

};

var testArr = [ "one", "two", "three", "four", "five" ];
