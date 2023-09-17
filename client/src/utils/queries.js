import { gql } from "@apollo/client";

export const QUERY_MEDS = gql`
  query Meds {
    meds {
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
        doseScheduled
        doseLogged
      }
      mostRecentDose
      mostRecentTime
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email

      userMeds {
        _id
        userId
        medName
        maxDailyDoses
        minTimeBetween
        remindersBool
        mostRecentDose
        mostRecentTime
      }
    }
  }
`;
