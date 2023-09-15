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

export const ADD_NOTE = gql`
  mutation addNote($noteData: NoteInput!) {
    addNote(noteData: $noteData) {
      _id
      username
      email
      savedNotes {
        _id
        title
        medicine
        startTime
        period
        numberOfTime
        total
        userId
      }
    }
  }
`;

export const REMOVE_NOTE = gql`
  mutation removeNote($noteId: ID!) {
    removeNote(noteId: $noteId) {
      _id
      username
      email
      savedNotes {
        _id
        title
        medicine
        startTime
        period
        numberOfTime
        total
        userId
      }
    }
  }
`;

export const UPDATE_MED = gql`
  mutation updateMed($medId: ID!, $medData: MedUpdate!) {
    updateMed(medId: $medId, medData: $medData) {
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
