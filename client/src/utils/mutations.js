import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MED = gql`
  mutation addMed($medSettings: MedInput!) {
    addMed(medSettings: $medSettings) {
      _id
      userId
      medName
      maxDailyDoses
      minTimeBetween
      remindersBool
    }
  }
`;

export const ADD_DOSE = gql`
  mutation addDose($doseData: DoseInput!) {
    addDose(doseData: $doseData) {
      _id
      userId
      medId
      doseDate
      doseTime
      doseLogged
    }
  }
`;

export const UPDATE_MED = gql`
  mutation updateMed($medData: MedUpdate!) {
    updateMed(medData: $medData) {
      _id
      userId
      medName
      maxDailyDoses
      minTimeBetween
      remindersBool
      doses {
        _id
        userId
        medId
        doseDate
        doseTime
        doseLogged
      }
      mostRecentDose
      mostRecentTime
    }
  }
`;

export const UPDATE_DOSE = gql`
  mutation updateDose($doseData: DoseUpdate!) {
    updateDose(doseData: $doseData) {
      _id
      userId
      medId
      doseDate
      doseTime
      doseLogged
    }
  }
`;
