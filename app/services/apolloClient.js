import {ApolloClient, InMemoryCache} from '@apollo/client';

const dev = process.env.NODE_ENV === `development`;
const URI_GRAPHQL = 'https://graph.cuiqly.com/';
//const URI_GRAPHQL = 'http://192.168.1.101:5000/';

const ClientApollo = new ApolloClient({
  uri: URI_GRAPHQL,
  cache: new InMemoryCache(),
});

export default ClientApollo;
