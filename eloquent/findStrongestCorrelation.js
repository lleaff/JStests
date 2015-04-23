// Check if jacques_journal.js is included
if (JOURNAL === undefined) {
	throw new Error("JOURNAL not found, no file to operate on");
}

// string: journalEvent
function hasEvent(journalEvent)
{
	// indexOf returns -1 if it doesn't find the element
	return JOURNAL.entry.indexOf(journalEvent) !== -1;
}
