// Check if jacques_journal.js is included
if (JOURNAL === undefined) {
	throw new Error("JOURNAL not found, no file to operate on");
}

var eventPhi = { eventName: "", phi: 0 };
var eventPhiArr = [];

// string: journalEvent
function hasEvent(journalEvent)
{
	// indexOf returns -1 if it doesn't find the element
	return JOURNAL.entry.indexOf(journalEvent) !== -1;
}
