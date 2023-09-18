// react
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// apollo server set up caching and caching
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { setContext } from '@apollo/client/link/context';
// utilities
import OneSignal from 'react-onesignal';
import Auth from './utils/auth';
import { TodayContext } from './utils/TodayContext';
// pages and components
import MedicationReminder from './pages/MedicationReminder';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
// styling
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

if (process.env.NODE_ENV !== 'production') {
	// Adds messages only in a dev environment
	loadDevMessages();
	loadErrorMessages();
}

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const cache = new InMemoryCache();

// TODO uncomment when ready to cache // Set up cache persistance for offline usage
// await persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache,
});

await client.refetchQueries({
	include: "all", // Consider using "active" instead!
});

function App() {
	

	// const [today, setToday] = useState(new Date());

	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="flex-column bg-colour justify-flex-start min-100-vh">
					<Header />
					<div className="container">
						{/* <TodayContext.Provider value={{ today, setToday }}> */}
							<Routes>
								<Route path="/" element={Auth.loggedIn() ? <MedicationReminder /> : <Signup />} />
								<Route path="/medicationReminder" element={<MedicationReminder />} />
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<Signup />} />
								<Route path="/me" element={<Profile />} />
							</Routes>
						{/* </TodayContext.Provider> */}
					</div>
					<Footer />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
