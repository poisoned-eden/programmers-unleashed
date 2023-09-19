const { AuthenticationError } = require('apollo-server-express');
const { User, Med, Dose } = require('../models');
const { signToken } = require('../utils/auth');
// const {
// 	DateScalar,
// 	TimeScalar,
// 	DateTimeScalar,
// } = require('graphql-date-scalars');

const resolvers = {
	// Date: DateScalar,
	// Time: TimeScalar,
	// DateTime: DateTimeScalar,

	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				try {
					const userData = await User.findOne({
						_id: context.user._id,
					}).populate('userMeds');
					console.log(userData);
					return userData;
				} catch (err) {
					console.error(err);
				}
			}
			throw new AuthenticationError('You need to be logged in!');
		},
		// TODO
		meds: async (parent, args, context) => {
			if (context.user) {
				try {
					const medsData = await Med.find({
						userId: context.user._id,
					})
						.populate('mostRecentDose')
						.populate({
							path: 'doses',
							options: {
								sort: {
									doseLogged: -1,
								},
							},
						});
					console.log(medsData);

					return medsData;
				} catch (err) {
					console.log('meds caught an error');
					console.error(err);
				}
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		med: async (parent, { medId }, context) => {
			if (context.user) {
				try {
					const medData = await Med.findOne({
						_id: medId,
						userId: context.user._id,
					}).populate('doses');

					return medData;
				} catch (err) {
					console.error(err);
				}
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		dosesByDate: async (parent, { doseDate }, context) => {
			if (context.user) {
				try {
					const doseData = await Dose.find({
						userId: context.user._id,
						doseDate: doseDate,
					}).populate('medId'); 
					// TODO if this is populated, do we need the medName in the Dose model?  Does it cause any problems to keep it?

					console.log(doseData);

					return doseData;
				} catch (err) {
					console.error(err);
				}
			}
			throw new AuthenticationError('You need to be logged in!');
		},
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
			if (!user) {
				throw new AuthenticationError('No user found with this email address');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Incorrect credentials');
			}

			const token = signToken(user);

			return { token, user };
		},
		// WORKS
		addMed: async (parent, { medSettings }, context) => {
			console.log('addMed resolver');
			console.log(medSettings);
			const { medId, medName, maxDailyDoses, minTimeBetween, remindersBool } = medSettings;
			try {
				const newMed = await Med.create({
					userId: context.user._id,
					medName: medName,
					maxDailyDoses: maxDailyDoses,
					minTimeBetween: minTimeBetween,
					remindersBool: remindersBool,
				});
				console.log(newMed);

				try {
					const userUpdate = await User.findOneAndUpdate(
						{ _id: context.user._id },
						{ $addToSet: { userMeds: newMed._id } },
						{ new: true, runValidators: true },
					).populate('userMeds');

					console.log(userUpdate);
				} catch (err) {
					console.log('update user failed');
					throw new Error(err);
				}

				return newMed;
			} catch (err) {
				console.log('add med failed');
				throw new Error(err);
			}
		},

		addDose: async (parent, { doseData }, context) => {
			const { medId, medName, doseDate, doseTime, doseLogged, mostRecentBool } = doseData;

			console.log('addDose resolver');
			console.log({ medId, medName, doseDate, doseTime, doseLogged, mostRecentBool });
			if (context.user) {
				console.log('context.user exists');
				try {
					const newDose = await Dose.create({
						userId: context.user._id,
						medId: medId,
						medName: medName,
						doseDate: doseDate,
						doseTime: doseTime,
						doseLogged: doseLogged,
					});
					console.log(newDose);

					// if the dose is logged at a time before the mostRecent time, just update normally
					if (mostRecentBool) {
						const updateMed = await Med.findOneAndUpdate(
							{ _id: medId },
							{
								$set: { mostRecentDose: newDose._id },
								$addToSet: { doses: newDose._id },
							},
							{ new: true },
						)
							.populate('mostRecentDose')
							.populate({
								path: 'doses',
								options: {
									sort: {
										doseLogged: -1,
									},
								},
							});
						console.log(updateMed);
						return newDose;
					} else {
						const updateMed = await Med.findOneAndUpdate(
							{ _id: medId },
							{
								$addToSet: { doses: newDose._id },
							},
							{ new: true },
						)
							.populate('mostRecentDose')
							.populate({
								path: 'doses',
								options: {
									sort: {
										doseLogged: -1,
									},
								},
							});
						console.log(updateMed);

						return newDose;
					}
				} catch (err) {
					throw new Error(err);
				}
			}
			throw new AuthenticationError('You need to be logged in!');
		},

		updateMed: async (parent, { medData }) => {
			const { medId, medName, maxDailyDoses, minTimeBetween, remindersBool } = medData;

			const med = await Med.findOneAndUpdate(
				{
					_id: medId,
				},
				{
					$set: {
						medName: medName,
						maxDailyDoses: maxDailyDoses,
						minTimeBetween: minTimeBetween,
						remindersBool: remindersBool,
					},
				},
				{ new: true, runValidators: true },
			);

			return med;
		},

		updateDose: async (parent, { doseData }) => {
			const { doseId, doseDate, doseTime, doseLogged } = doseData;

			const dose = await Dose.findOneAndUpdate(
				{
					_id: doseId,
				},
				{
					$set: {
						doseDate: doseDate,
						doseTime: doseTime,
						doseLogged: doseLogged,
					},
				},
				{ new: true, runValidators: true },
			);

			return dose;
		},
	},
};

module.exports = resolvers;
