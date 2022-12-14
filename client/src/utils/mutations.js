import { gql } from '@apollo/client';

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
    mutation addUsser($username: String!, $email: String!, $password: String!){
        addUser($username: String!, $email: String!, $password: String!) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($user: ID!, $savedBook: String!){
        saveBook(userId: $userId, savedBook: $savedBook){
            _id
            username
            savedBooks
        }
    }     
`

export const REMOVE_BOOK = gql`
    mutation removeBook($savedBook: String!){
        removeBook(savedBook: $savedBook){
            _id
            username
            savedBooks
        }
    }
`
