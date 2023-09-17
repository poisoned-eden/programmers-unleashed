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
		type: Number,
		default: 0,
	},
	minTimeBetween: {
		type: Number,
		default: 0,
	},
	remindersBool: {
		type: Boolean,
		default: false,
	},
	doses: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Dose',
		},
	],
	mostRecentDose: {
		type: Schema.Types.ObjectId,
		ref: 'Dose',
	},
	mostRecentTime: {
		type: String,
	},

	// TODO add icon
});

const Med = model('Med', medSchema);

module.exports = Med;
