export function splitDate(dateTime) {
	const dtObj = new Date(dateTime).toISOString();
	// console.log(typeof dtObj);
	// console.log(dtObj);
	return dtObj.split('T')[0];
}

export function addMinTimeBetween(dateTime, minTimeBetween) {
	const dtObj = new Date(dateTime);
	let newHrs = splitTime(dtObj).hrs + minTimeBetween;
	let dtIncrement = 0;

	// console.log(dateTime);
	// console.log(minTimeBetween);

	while (newHrs > 24) {
		newHrs -= 24;
		dtIncrement += 1;
	}

	const newDate = dtObj.getDate() + dtIncrement;
	const newDateSet = new Date(dtObj).setDate(newDate);

	const newDateTime = new Date(newDateSet).setHours(newHrs);
	return newDateTime.toString();
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
