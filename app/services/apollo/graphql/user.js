import {gql} from '@apollo/client';

const USER = {
  QUERYS: {
    checkTokenUserValid: gql`
      query checkTokenUserValid($input: CheckTokenUserInput!){
        checkTokenUserValid(input: $input)
      }
    `,
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
            position
          }
          TokenUser{
            codeUser
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
          nameUser
          codeUser
          active
          numberUser
          token
        }
      }
    `,
    createTokenSecurity: gql`
      mutation  createTokenSecurity($input: RegisterTokenInput!){
        createTokenSecurity(input: $input){
          id
          codeActivation
          status
          typeUse
          createdAt
        }
      }
    `,
  },
};

export default USER;
