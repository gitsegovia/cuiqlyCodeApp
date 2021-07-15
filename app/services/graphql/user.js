import {gql} from '@apollo/client';

const USER = {
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
    createTokenSecurity: gql`
      mutation createTokenSecurity($input: RegisterTokenInput!) {
        createTokenSecurity(input: $input) {
          id
          codeActivation
          status
          typeUse
          Employee {
            id
            firstName
            lastName
            typeDni
            idnDni
            gender
            birthDate
            phoneNumber
            address
            position
            role
            signature
            nameMessage
            photo
            numberEmployee
          }
        }
      }
    `,
  },
};

export default USER;
