Object.defineProperty(Array.prototype, "_length", {
	configurable: false, enumerable: false,
	get: function() { return this.length; }
});

Object.defineProperty(Array.prototype, "currentIndex", {
	configurable: false, enumerable: false,
	get: function() { 
		if (this._currentIndex === undefined) this._currentIndex = 0;
		return this._currentIndex; },
	set: function(a) { 
		if (a >= 0 && a < this._length) this._currentIndex = a; }
});

Object.defineProperty(Array.prototype, "current", {
	configurable: false, enumerable: false,
	get: function() { return this[this.currentIndex]; },
	set: function(a) { this[this.currentIndex] = a; }
});

Array.prototype.next = function() {
	var prevIndex = this._currentIndex;
	this.currentIndex = prevIndex + 1;
	return prevIndex !== this._currentIndex;
};

Array.prototype.previous = function() {
	var prevIndex = this._currentIndex;
	this.currentIndex = prevIndex - 1;
	return prevIndex !== this._currentIndex;
};
