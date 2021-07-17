import {gql} from '@apollo/client';

const USER = {
  QUERY: {
    checkPinTokenUser: gql`
      query checkPinTokenUser($input: CheckPinTokenUserInput!) {
        checkPinTokenUser(input: $input)
      }
    `,
    listTokenUsed: gql`
      query listTokenUsed($input: ListTokenUsedInput!) {
        listTokenUsed(input: $input) {
          id
          codeActivation
          typeUse
          createdAt
          Employee {
            firstName
            lastName
          }
        }
      }
    `,
  },
  MUTATIONS: {
    loginTokenUser: gql`
      mutation loginTokenUser($input: LoginTokenUserInput!) {
        loginTokenUser(input: $input) {
          id
          email
          pin
          active
          numberUser
          token
        }
      }
    `,
  },
};

export default USER;
