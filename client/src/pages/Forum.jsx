import React from "react";
// Chakra imports
import {
    Flex, Text, useColorModeValue, Box,
    useBreakpointValue,
} from "@chakra-ui/react";

// Assets
import postImage from "@assets/img/profile/postImage.png";
import avatar10 from "@assets/img/avatars/avatar10.png";
import avatar2 from "@assets/img/avatars/avatar2.png";
import avatar4 from "@assets/img/avatars/avatar4.png";
// Custom components
import { VSeparator } from "../components/separator/Separator";
import Trending from "./forum/components/Trending";
import Stories from "./forum/components/Stories";
import Post from "./forum/components/Post";
import Filter from "./forum/components/Filter";
import Comment from "@components/dataDisplay/Comment";
import { Stack } from "react-bootstrap";

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_THOUGHTS, QUERY_EMPLOYEES_PROFILE_INFO } from '@utils/queries';


export default function Forum() {

    //  QUERY_TASKS  
    const { loading: loadingThoughts, data: dataThoughts } = useQuery(QUERY_THOUGHTS);
    const thoughts = dataThoughts?.thoughts || [];

    //  QUERY_EMPLOYEES_PROFILE_INFO  
    const { loading: loadingQueryEmployeesProfileInfo, data: dataQueryEmployeesProfileInfo } = useQuery(QUERY_EMPLOYEES_PROFILE_INFO);
    const employeesProfileInfo = dataQueryEmployeesProfileInfo?.employees || [];

    const [thoughtData, setThoughtData] = useState();

    // populate thoughtData
    useEffect(() => {
        const newThoughts = thoughts.map(thought => {
            const employee = employeesProfileInfo.find(employeesProfile => employeesProfile.employeeID === thought.EmployeeID);
            return {
                ...thought,
                EmployeeID: employee
            }
        })
        console.log(newThoughts);
        setThoughtData(newThoughts);
    }, [thoughts, employeesProfileInfo]);

    // Chakra color mode
    const textColor = useColorModeValue("gray.700", "white");
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const white = useColorModeValue('white', 'navy.900');

    const isMobile = useBreakpointValue({
        base: true,
        md: false,
    })

    if (loadingThoughts || loadingQueryEmployeesProfileInfo) {
        return <div>Loading...</div>;
    }

    return (
        <Flex bgColor={paleGray} direction={{ base: "column", xl: "row" }} px={5} pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Flex direction='column' mb={{ base: "20px", xl: "unset" }} maxW={{ xl: "100%", "2xl": "95%" }}>
                <Stories mb='50px' thoughts={thoughts} employeesprofileinfo={employeesProfileInfo} />
                <Flex mb='20px'>
                    <Text me='auto' ms='20px' fontSize='2xl' fontWeight='700' color={textColor}>
                        Forum
                    </Text>
                </Flex>
                {thoughtData.map((thought) => {
                    return (
                        <Post
                            likes='28.5k' comments='34'
                            avatar={thought.EmployeeID.avatarURI}
                            name={thought.EmployeeID.firstname + " " + thought.EmployeeID.lastname}
                            username={"@" + thought.EmployeeID.firstname + "." + thought.EmployeeID.lastname}
                            image={postImage}
                            shares='156' saves='20'
                            you={avatar4} my="10"
                            thoughtData={thought.description}
                            thoughtTitle={thought.title}
                            commentBlocks={[]}
                        />
                    )
                })}
                <Post
                    likes='28.5k' comments='34' avatar={avatar10} name='Esthera William' username='@esthera.william'
                    image={postImage} shares='156' saves='20' you={avatar4} my="10"
                    commentBlocks={
                        <Box>
                            <Comment
                                avatar={avatar10}
                                name='@esthera.william'
                                text="I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down by their perception of themselves. If you're taught you can’t do anything, you won’t do anything. I was taught I could do everything."
                                tags={["photography", "portrait", "image"]}
                                time='24 mins ago'
                                pe='20px'
                            />
                            <Comment
                                avatar={avatar2}
                                name='@roberto.michael91  '
                                text='Wow! This is an amazing point of view! The time is now for it to be okay to be great! 🙏🏼😁'
                                time='21 mins ago'
                                pe='20px'
                            />{" "}
                        </Box>
                    } />


            </Flex>
            <VSeparator mx='20px' bg={paleGray} display={{ base: "none", xl: "flex" }} />
            {/* <Trending w={{ base: "100%", xl: "500px", "2xl": "400px" }} maxH={{ base: "100%", xl: "1170px", "2xl": "100%" }} /> */}
        </Flex>
    );
}
