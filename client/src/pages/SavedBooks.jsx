import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Alert
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import { Navigate } from 'react-router-dom';

// import { getMe, deleteBook } from '../utils/API';
// import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';
import { QUERY_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';


const SavedBooks = () => {
  if (!Auth.loggedIn()) {
    // Alert("Log in or sign up");
    return <Navigate to="/" />;
  }
  // const [userData, setUserData] = useState({});

  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || [];

  const [deleteBook, { error }] = useMutation
    (DELETE_BOOK, {
      refetchQueries: [
        QUERY_ME,
        // 'me'
      ]
    });

  // const userDataLength = Object.keys(userData).length;

  // // update the userData when user is updated
  // useEffect(() => {
  //   if (user.savedBooks) {
  //     setUserData(bookIds);
  //     console.log(`setUserData ${bookIds}`)

  //   }
  // }, [user])
  // const { username: userParam } = useParams();
  // console.log(1);
  // if (userData.me) {
  //   console.log(userData.me)
  // }
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userData.me.username) {
  //   return <Navigate to="/" />;
  // }

  // // use this to determine if `useEffect()` hook needs to run again

  // useEffect(() => {
  //   if (data.me) {
  //     setUserData(data.me);
  //   }
  // const getUserData = async () => {
  //   try {
  //     const token = Auth.loggedIn() ? Auth.getToken() : null;

  //     if (!token) {
  //       return false;
  //     }

  //     const response = await getMe(token);

  //     if (!response.ok) {
  //       throw new Error('something went wrong!');
  //     }

  //     const user = await response.json();
  //     setUserData(user);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // getUserData();
  // }, [data]);

  // // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // const handleDeleteBook = async (bookId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  // try {
  //   const response = await deleteBook(bookId, token);

  //   if (!response.ok) {
  //     throw new Error('something went wrong!');
  //   }

  //   const updatedUser = await response.json();
  //   setUserData(updatedUser);
  //   // upon success, remove book's id from localStorage
  //   removeBookId(bookId);
  // } catch (err) {
  //   console.error(err);
  // }


  // };
  const handleDeleteBook = async (bookId) => {
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;

      if (!token) {
        return false;
      }

      const { data } = await deleteBook({
        variables: { bookId: bookId },
      });

    } catch (err) {
      console.error(err);
    }


    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    // try {
    //   const response = await deleteBook(bookId, token);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const updatedUser = await response.json();
    //   setUserData(updatedUser);
    //   // upon success, remove book's id from localStorage
    //   removeBookId(bookId);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
