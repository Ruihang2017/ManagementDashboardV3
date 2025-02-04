// Chakra imports
import {
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
  Button,
  HStack,
} from "@chakra-ui/react";
import Card from "@components/card/Card";
import InputField from "@components/fields/InputField";
import TextField from "@components/fields/TextField";
import React from "react";
import { useState, useEffect } from 'react'
import PropTypes from "prop-types";

NewThought.propTypes = {
    disclosure: PropTypes.shape({
        onClose: PropTypes.func.isRequired,
    }).isRequired,
    addAThought: PropTypes.func.isRequired,
};

export default function NewThought(props) {
  const { disclosure, addAThought, ...rest } = props;

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  // useEffect(() => {
  //   console.log(formData)
  // }, [formData])

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  // Chakra Color Mode
  return (
    <FormControl>
      <Card mb='20px' {...rest}>
        {/* <Flex direction='column' mb='30px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Share your thought
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can change user account information
          </Text>
        </Flex> */}
        <InputField id='title' label='Title' placeholder='I have a great thought'
          value={formData.title}
          onChange={(event) => {
            setFormData({
              ...formData,
              title: event.target.value
            })
          }}
        />
        <TextField
          id='description'
          label='Thought'
          h='100px'
          placeholder='Tell something about your thought in 150 characters!'
          value={formData.description}
          onChange={(event) => {
            setFormData({
              ...formData,
              description: event.target.value
            })
          }}
        />
      </Card>
      <HStack justifyContent='flex-end'>

        <Button
          onClick={() => {
            // updateTask(task);
            addAThought(formData);
            disclosure.onClose();
          }}

          colorScheme='blue' mr={3}>
          Post
        </Button>
      </HStack>
    </FormControl>
  );
}
