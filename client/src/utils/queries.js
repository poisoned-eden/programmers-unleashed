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
        doseDate
        doseTime
        doseLogged
      }
    }
  }
`;

export const QUERY_MED = gql`
  query Med($medId: ID) {
    med(medId: $medId) {
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
      }
    }
  }
`;

export const QUERY_DOSES = gql`
  query dosesByDate($doseDate: String) {
    dosesByDate(doseDate: $doseDate) {
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
    }
  }
`;
