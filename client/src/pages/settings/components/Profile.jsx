// Chakra imports
import { Flex, Text, Avatar, useColorModeValue, Button } from "@chakra-ui/react";
import Card from "@components/card/Card";
import profileAvatar from "@assets/img/avatars/avatar4.png";
import React from "react";
import PropTypes from 'prop-types';

export default function Profile(props) {
  const { userData, selectANewAvatar, disclosure, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  // Chakra Color Mode
  return (
    <Card mb='20px' {...rest}>
      <Flex align='center'>
        <Avatar src={userData.avatarURI} h='87px' w='87px' me='20px'
          onClick={() => {
            // selectANewAvatar();
            disclosure.onOpen();
          }} />
        <Flex direction='column'>
          <Text color={textColorPrimary} fontWeight='bold' fontSize='2xl'>
            {userData.firstname + " " + userData.lastname}
          </Text>
          <Text mt='1px' color={textColorSecondary} fontSize='md'>
            {userData.email}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

Profile.propTypes = {
  userData: PropTypes.shape({
    avatarURI: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  selectANewAvatar: PropTypes.func.isRequired,
  disclosure: PropTypes.shape({
    onOpen: PropTypes.func.isRequired,
  }).isRequired,
};