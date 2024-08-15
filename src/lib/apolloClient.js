// lib/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/notes", // Endpoint API
  cache: new InMemoryCache(),
});

export default client;
