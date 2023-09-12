import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
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

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
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

export const FIND_NOTE = gql`
  query note($noteId: ID!) {
    notes {
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
`;
