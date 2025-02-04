// Chakra imports
import {
  Button,
  Flex,
  LightMode,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "@components/card/Card";
import React from "react";
import PropTypes from "prop-types";

Delete.propTypes = {
    deleteEmployee: PropTypes.func.isRequired,
};

export default function Delete(props) {
  const { deleteEmployee, ...rest } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  // Chakra Color Mode
  return (
    <Card
      p='30px'
      py='34px'
      flexDirection={{ base: "column", md: "row", lg: "row" }}
      alignItems='center'
      {...rest}>
      <Flex direction='column'>
        <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
          Delete this account
        </Text>
        <Text fontSize='md' color={textColorSecondary}>
          Here you can permanently delete this account
        </Text>
      </Flex>
      <LightMode>
        <Button
          colorScheme='red'
          variant='outline'
          mt={{ base: "20px", md: "0", }}
          _hover={{ bg: "whiteAlpha.100" }}
          _focus={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
          p='15px 40px'
          fontSize='sm'
          h='44px'
          fontWeight='500'
          ms='auto'
          isDisabled={true}
        // onClick={deleteEmployee}
        >
          Delete account
        </Button>
      </LightMode>
    </Card>
  );
}
