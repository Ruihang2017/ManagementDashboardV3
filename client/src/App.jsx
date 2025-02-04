import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
} from '@chakra-ui/react'
import { Sidebar } from './components/sidebar/Sidebar'
import initialTheme from './theme/theme'; //  { themeGreen }

/**
 * Create an HTTP link to the GraphQL server
 */
const httpLink = createHttpLink({
  uri: '/graphql',
});


/**
 * Construct request middleware that will attach the JWT token to every request as an `authorization` header.
 */
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

/**
 * Initialize Apollo Client with the authLink middleware and HTTP link.
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


/**
 * Main App component that sets up the ApolloProvider and ChakraProvider.
 * It includes the Sidebar and renders child route components using Outlet.
 */
function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={initialTheme}>
        <Box
        >
          <Box
            position={{ sm: "fixed" }}
          >
            <Sidebar />
          </Box>

          <Box width={"100%"} pl={{ sm: "300px" }}>
            {/* This is where the child route components will be rendered */}
            <Outlet />
          </Box>
        </Box>
      </ChakraProvider>
    </ApolloProvider >
  )
}

export default App;
