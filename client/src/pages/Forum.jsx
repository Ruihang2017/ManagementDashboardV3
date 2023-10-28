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

import { QUERY_THOUGHTS, QUERY_EMPLOYEES_PROFILE_INFO, QUERY_EMPLOYEES } from '@utils/queries';


export default function Forum() {


    //  QUERY_EMPLOYEES_PROFILE_INFO  
    const { loading: loadingQueryEmployeesProfileInfo, data: dataQueryEmployeesProfileInfo } = useQuery(QUERY_EMPLOYEES_PROFILE_INFO);
    const employeesProfileInfo = dataQueryEmployeesProfileInfo?.employees || [];

    //  QUERY_TASKS  
    const { loading: loadingThoughts, data: dataThoughts } = useQuery(QUERY_THOUGHTS);
    const thoughts = dataThoughts?.thoughts || [];

    // populate the thoughtData with Employee data
    const thoughtData = thoughts.map(thought => {
        const populatedEmployee = employeesProfileInfo.find(employeesProfile => employeesProfile.employeeID === thought.EmployeeID);
        const populatedComments = thought.comments.map(comment => {
            const populatedCommentEmployee = employeesProfileInfo.find(employeesProfile => employeesProfile.employeeID === comment.EmployeeID);
            return {
                ...comment,
                EmployeeID: populatedCommentEmployee
            };
        });

        return {
            ...thought,
            EmployeeID: populatedEmployee,
            comments: populatedComments
        };
    });

    console.log(thoughtData);
    // useEffect(() => {
    //     // console.log(thoughtData);
    // }, [thoughtData]);

    // Chakra color mode
    const textColor = useColorModeValue("gray.700", "white");
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const white = useColorModeValue('white', 'navy.900');

    // const isMobile = useBreakpointValue({
    //     base: true,
    //     md: false,
    // })

    if (loadingThoughts || loadingQueryEmployeesProfileInfo) {
        return <div>Loading...</div>;
    }

    return (
        <Flex bgColor={paleGray} direction={{ base: "column", xl: "row" }} px={5} pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Flex direction='column' mb={{ base: "20px", xl: "unset" }} width={{ base: "25%", sm: "35%", md: "65%", xl: "100%", "2xl": "95%" }}>

                <Stories mb='50px' thoughts={thoughts} employeesprofileinfo={employeesProfileInfo} />
                <Flex mb='20px'>
                    <Text me='auto' ms='20px' fontSize='2xl' fontWeight='700' color={textColor}>
                        Forum
                    </Text>
                </Flex>
                {thoughtData.map((thought) => {
                    return (
                        <Post
                            key={thought.thoughtID}
                            likes='28.5k' comments={thought.comments.length}
                            avatar={thought.EmployeeID.avatarURI}

                            name={thought.EmployeeID.firstname + " " + thought.EmployeeID.lastname}
                            username={"@" + thought.EmployeeID.firstname + "." + thought.EmployeeID.lastname}
                            image={postImage}
                            shares='156' saves='20'
                            you={avatar4} my="10"
                            thoughtData={thought.description}
                            thoughtTitle={thought.title}
                            commentBlocks={
                                <Box>
                                    {thought.comments.map(comment => {
                                        return (<Comment
                                            key={comment.commentID}
                                            avatar={comment.EmployeeID.avatarURI}
                                            name={comment.EmployeeID.firstname + " " + comment.EmployeeID.lastname}
                                            text={comment.commentContent}
                                            tags={["photography", "portrait", "image"]}
                                            time={comment.postedTime}
                                            pe='20px'
                                        />)
                                    })}
                                </Box>
                            }
                        />
                    )
                })}
            </Flex>
            <VSeparator mx='20px' bg={paleGray} display={{ base: "none", xl: "flex" }} />
            {/* <Trending w={{ base: "100%", xl: "500px", "2xl": "400px" }} maxH={{ base: "100%", xl: "1170px", "2xl": "100%" }} /> */}
        </Flex>
    );
}
