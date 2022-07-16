import { WebSocketLink } from "@apollo/client/link/ws";
import { createApolloProvider } from '@vue/apollo-option'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: '/api',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const username = localStorage.getItem('username');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: username,
    }
  }
});

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
})

export const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})
