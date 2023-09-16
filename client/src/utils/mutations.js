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
  mutation AddMed($medSettings: MedInput!) {
    addMed(medSettings: $medSettings) {
      _id
      userId
      medName
      maxDailyDoses
      minTimeBetween
      remindersBool
      iconType
    }
  }
`;

export const ADD_DOSE = gql`
  mutation AddDose($medId: ID!, $doseScheduled: String, $doseLogged: String) {
    addDose(
      medId: $medId
      doseScheduled: $doseScheduled
      doseLogged: $doseLogged
    ) {
      _id
      userId
      medId
      doseScheduled
      doseLogged
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(thoughtId: $thoughtId, commentText: $commentText) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
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
        doseScheduled
        doseLogged
      }
    }
  }
`;

export const UPDATE_DOSE = gql`
  mutation updateDose($doseId: ID!, $doseData: DoseUpdate!) {
    updateDose(doseId: $doseId, doseData: $doseData) {
      _id
      userId
      medId
      doseScheduled
      doseLogged
    }
  }
`;
