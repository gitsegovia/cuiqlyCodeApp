import {ApolloClient, InMemoryCache} from '@apollo/client';
import {BaseSetting} from 'config'

const ClientApollo = new ApolloClient({
  uri: BaseSetting.urlApi,
  cache: new InMemoryCache(),
});

export default ClientApollo;
