import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import {
  ChakraProvider,
  Box,
  extendTheme,
  Flex,
  SimpleGrid,
  Grid,
  GridItem
} from '@chakra-ui/react'


// import components
import { CardTwoBtn } from './components/card/CardTwoBtn';
import { Sidebar } from './components/sidebar/Sidebar'
import initialTheme from './theme/theme'; //  { themeGreen }



// // setting up the theme
// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

// const theme = extendTheme({ colors })




const httpLink = createHttpLink({
  uri: '/graphql',
});


// Construct request middleware that will attach the JWT token to every request as an `authorization` header
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

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



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

          <Box
            width={"100%"}
            pl={{ sm: "300px" }}
          >
            <Outlet />
          </Box>
        </Box>
      </ChakraProvider>
    </ApolloProvider >
  )
}

export default App;
