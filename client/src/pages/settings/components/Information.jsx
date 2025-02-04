// Chakra imports
import {
    Flex,
    FormControl,
    SimpleGrid,
    Text,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import Card from "@components/card/Card";
import InputField from "@components/fields/InputField";
import TextField from "@components/fields/TextField";
import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

Information.propTypes = {
    userData: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
    updateEmployee: PropTypes.func.isRequired,
};

export default function Information(props) {
    const { userData, updateEmployee, ...rest } = props;

    const [formData, setFormData] = useState({
        email: userData.email,
        // avatarURI: userData.avatarURI
    });
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "secondaryGray.600";
    // Chakra Color Mode
    return (
        <FormControl>
            <Card mb="20px" {...rest}>
                <Flex direction="column" mb="30px" ms="10px">
                    <Text
                        fontSize="xl"
                        color={textColorPrimary}
                        fontWeight="bold"
                    >
                        Account Settings
                    </Text>
                    <Text fontSize="md" color={textColorSecondary}>
                        Here you can change user account information
                    </Text>
                </Flex>
                <SimpleGrid
                    columns={{ sm: 1, md: 1 }}
                    spacing={{ base: "20px", xl: "20px" }}
                >
                    {/* <InputField
            mb='0px'
            me='30px'
            id='username'
            label='Username'
            placeholder='@simmmple.web'
          /> */}
                    <InputField
                        mb="30px"
                        id="email"
                        label="Email Address"
                        placeholder="mail@simmmple.com"
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                email: event.target.value,
                            });
                        }}
                    />
                </SimpleGrid>
                <TextField
                    id="about"
                    label="About Me"
                    h="100px"
                    placeholder="Tell something about yourself in 150 characters!"
                />
                <Button
                    variant="brand"
                    minW="183px"
                    fontSize="sm"
                    fontWeight="500"
                    ms="auto"
                    onClick={() => {
                        updateEmployee(formData);
                        // createTask();
                        // creatTaskDisclosure.onOpen();
                    }}
                >
                    Update Information
                </Button>
            </Card>
        </FormControl>
    );
}
