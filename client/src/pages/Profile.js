import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_USER, FIND_ME } from "../utils/queries";

import MedForm from "../components/MedForm";
import MedCard from "../components/MedCard";

import Auth from "../utils/auth";

const Profile = () => {
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    email: "",
    userMeds: [],
  });

  const { data } = useQuery(FIND_ME, {
    onCompleted: () => {
      setUserData(data.findme);
    },
  });

  const [medFormData, setMedFormData] = useState({
    medId: "",
    medName: "",
    maxDailyDoses: "0",
    minTimeBetween: "4",
    remindersBool: "off",
  });

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
        {userData.userMeds.map((note) => (
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
