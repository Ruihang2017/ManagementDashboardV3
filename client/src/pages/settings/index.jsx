// Chakra imports
import { Box, Flex, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import Connected from "./components/Connected";
import Delete from "./components/Delete";
import Information from "./components/Information";
import Newsletter from "./components/Newsletter";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Sessions from "./components/Sessions";
import Socials from "./components/Socials";
import TwoFactor from "./components/TwoFactor";

//react
import React from "react";
import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

//apollo
import { useQuery, useMutation } from '@apollo/client';

//utils
import Auth from '@utils/auth';
import { QUERY_ME } from '@utils/queries';
import { UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '@utils/mutations';


// other components
import { AvatarModal } from "@components/modal/AvatarModal";


export default function Settings() {

  // Chakra Color Mode
  if (!Auth.loggedIn()) {
    // Alert("Log in or sign up");
    return <Navigate to="/signup" />;
  }

  //  QUERY_ME  
  const { loading: loadingQueryMe, data: dataQueryMe } = useQuery(QUERY_ME);
  const userData = dataQueryMe?.me || [];

  //  UPDATE_EMPLOYEE  
  const [UpdateEmployee, { UpdateEmployeeError }] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  //  DELETE_EMPLOYEE  
  const [DeleteEmployee, { DeleteEmployeeError }] = useMutation(DELETE_EMPLOYEE);

  // modal disclosure
  const disclosure = useDisclosure()

  console.log(userData);

  //selectANewAvatar
  const selectANewAvatar = () => {
    console.log("selectANewAvatar");
  }

  const setUserAvatar = async (selectedAvatar) => {
    // console.log(data);
    const variables = {
      employee: {
        email: userData.email,
        employeeID: userData.employeeID,
        firstname: userData.firstname,
        lastname: userData.lastname,
        password: userData.password,
        roleID: userData.roleID,
        avatarURI: selectedAvatar,
      }
    }
    try {
      const { data } = await UpdateEmployee({
        variables: variables
      });
      Auth.reLogin(data.updateEmployee.token);

    } catch (err) {
      console.error(err);
    }
  }

  // addAThought
  const updateEmployee = async (data) => {
    // console.log(data);
    const variables = {
      employee: {
        email: data.email,
        employeeID: userData.employeeID,
        firstname: userData.firstname,
        lastname: userData.lastname,
        password: userData.password,
        roleID: userData.roleID
      }
    }
    try {
      const { data } = await UpdateEmployee({
        variables: variables
      });
      Auth.login(data.updateEmployee.token);

    } catch (err) {
      console.error(err);
    }
  }

  const deleteEmployee = async (data) => {
    const variables = {
      employeeId: userData.employeeID
    }
    try {
      const { data } = await DeleteEmployee({
        variables: variables
      });

      Auth.logout();

    } catch (err) {
      console.error(err);
    }
  }


  return (
    <Box
      pt={{ base: "130px", md: "80px", xl: "80px" }}
      px="5"
    >
      {/* Main Fields */}
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1, lg: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>

        <Flex direction='column'>
          <Profile userData={userData} selectANewAvatar={selectANewAvatar} disclosure={disclosure} />
          <Information userData={userData} updateEmployee={updateEmployee} />
          <Delete deleteEmployee={deleteEmployee} />
        </Flex>
      </SimpleGrid>
      <AvatarModal disclosure={disclosure} setUserAvatar={setUserAvatar} />

    </Box>
  );
}
