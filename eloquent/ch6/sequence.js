/* Sequence interface:
 * .current		-> current value
 * .next		-> step to the next item,
 * 						returns false if boundary was reached
 * .previous	-> step to the previous item,
 * 						returns false if boundary was reached */

/* =Array sequence implementation
 * ------------------------------------------------------------ */

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

Object.defineProperty(Array.prototype, "next", { 
	configurable: false, enumerable: false,
	value: function() {
		var prevIndex = this._currentIndex;
		this.currentIndex = prevIndex + 1;
		return prevIndex !== this._currentIndex;
	}
});

Object.defineProperty(Array.prototype, "previous", { 
	configurable: false, enumerable: false,
	value: function() {
		var prevIndex = this._currentIndex;
		this.currentIndex = prevIndex - 1;
		return prevIndex !== this._currentIndex;
	}
});


/* =RangeSeq object
 * ------------------------------------------------------------ */

function RangeSeq(from, to) {
	if (typeof from !== typeof to)
		throw new TypeError("'from' and 'to' must be of the same type");
	this.from = this._currentVal = from; this.to = to;
}

Object.defineProperty(RangeSeq.prototype, "current", {
	configurable: false, enumerable: false,
	get: function() { return this._currentVal; }
});

RangeSeq.prototype._move = function(distance) {
	if (typeof this.from === "number") { this_.currentVal += distance; }
	else if (typeof this.from === "string" && this.from.length === 1) {
		var curCharCode = this._currentVal.charCodeAt(0);
		if (curCharCode + distance > this.to.charCodeAt(0) ||
		    curCharCode + distance < this.from.charCodeAt(0)) {
			return false;
		} else {
			this._currentVal = String.fromCharCode(
				curCharCode + distance);
			return true;
		}
	}
};

RangeSeq.prototype.next = function() {
	return this._move(1);
};

RangeSeq.prototype.previous = function() {
	return this._move(-1);
};


/* =Sequence interface functions
 * ------------------------------------------------------------ */

/* Log the first five items in sequence */
function logFive(seq) {
	do {
		console.log(seq.current);
	} while(seq.next());
}
