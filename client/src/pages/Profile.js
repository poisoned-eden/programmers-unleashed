import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { QUERY_MEDS } from "../utils/queries";

import MedForm from "../components/MedForm";
import MedCard from "../components/MedCard";

import Auth from "../utils/auth";

const Profile = () => {
  const [medFormData, setMedFormData] = useState({
    medId: "",
    medName: "",
    maxDailyDoses: 0,
    minTimeBetween: 4,
    remindersBool: "off",
  });

  const { loading, data } = useQuery(QUERY_MEDS);
  if (loading) return <h1>loading your meds info...</h1>;

  const meds = data?.meds || [];

  console.log(meds);
  //  FIXME

  // const { loading, data } = useQuery(QUERY_ME);

  // if (loading) {
  // 	return <div>Loading...</div>;
  // }

  // const user = data.me;

  // if (!user?.username) {
  // 	return (
  // 		<h4>
  // 			You need to be logged in to see this. Use the navigation links
  // 			above to sign up or log in!
  // 		</h4>
  // 	);
  // }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        {/* <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
					Viewing {userParam ? `${user.username}'s` : 'your'}{' '}
					settings.
				</h2> */}
        {/* TODO move MedForm into modal that opens when push button to add new med */}
        <MedForm
          medFormData={medFormData}
          setMedFormData={setMedFormData}
          mutation="ADD_MED"
        />
        {/* TODO Account Settings */}
        {meds.map((note) => (
          <MedCard
            medId={note._id}
            medName={note.medName}
            maxDailyDoses={note.maxDailyDoses}
            minTimeBetween={note.minTimeBetween}
            remindersBool={note.remindersBool}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
