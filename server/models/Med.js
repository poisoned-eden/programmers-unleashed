const { Schema, model } = require('mongoose');

const medSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	medName: {
		type: String,
		required: true,
	},
	maxDailyDoses: {
		type: String,
		default: "0",
	},
	minTimeBetween: {
		type: String,
		default: "0",
	},
	remindersBool: {
		type: String,
		default: "off",
	},
	mostRecentDose: {
		type: Schema.Types.ObjectId,
		ref: 'Dose',
	},
	mostRecentTime: {
		type: String,
	},
	doses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Dose',
		},
	],

	// TODO add icon
});

const Med = model('Med', medSchema);

module.exports = Med;
