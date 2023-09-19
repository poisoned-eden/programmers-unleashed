export function splitDate(dateTime) {
	const dtObj = new Date(dateTime).toISOString();
	// console.log(typeof dtObj);
	// console.log(dtObj);
	return dtObj.split('T')[0];
}

export function addMinTimeBetween(input, minTimeBetween) {
	return new Date(input).getTime() + (minTimeBetween * 60 * 60 * 1000)
}

export function splitHours(dateTime) {
	const dtObj = new Date(dateTime);
	return dtObj.getHours();
}

export function splitMins(dateTime) {
	const dtObj = new Date(dateTime);
	return `${dtObj.getMinutes()}`;
}

export function splitTime(dateTime) {
	if (!dateTime) {
		dateTime = new Date();
	}
	// const dtObj = new Date(dateTime);
	let hrs = splitHours(dateTime);
	let mins = splitMins(dateTime);

	mins = mins.padStart(2, '0');

	return `${hrs}:${mins}`.padStart(5, '0');
}

// export function dateTimeFormat(dateTime) {
// 	return `${splitDate(dateTime)} ${splitTime(dateTime).string}`;
// }

export function setDoseLoggedTime(doseTime) {
	const hr = doseTime.split(':')[0];
	const mn = doseTime.split(':')[1];

	const loggedTime = new Date().setHours(hr, mn);
	// console.log(new Date(loggedTime).toString());
	return new Date(loggedTime).toString();
}

export function splitDateTime(dateTime) {
	const dtObj = new Date(dateTime);
	// console.log(dtObj);
	const ISOString = dtObj.toISOString();
	// console.log(typeof dtObj);
	// console.log(ISOString);
	const split = ISOString.split(':');
	// console.log(split);
	const dtSplitString = `${split[0]}:${split[1]}`
	// console.log(dtSplitString);
	return dtSplitString;
}