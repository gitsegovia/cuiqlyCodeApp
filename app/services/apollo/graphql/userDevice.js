import {gql} from '@apollo/client';

const USERDEVICE = {
  QUERY: {    
  },
  MUTATIONS: {
    createTokenUserDevice: gql`
      mutation createTokenUserDevice($input: CreateTokenUserDeviceInput!){
        createTokenUserDevice(input: $input)
      }
    `,
    syncTokenUserDevice: gql`
      mutation syncTokenUserDevice($input: SyncTokenUserDeviceInput!){
        syncTokenUserDevice(input: $input)
      }
    `,
    deleteTokenUserDevice: gql`
      mutation deleteTokenUserDevice($input: DeleteTokenUserDeviceInput!){
        deleteTokenUserDevice(input: $input)
      }
    `    
  },
};

export default USERDEVICE;
