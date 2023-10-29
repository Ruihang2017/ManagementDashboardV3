import React from "react";
// Chakra imports
import {
    Flex, Text, useColorModeValue, Box,
    useBreakpointValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';

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
import { ThoughtModal } from "@components/modal/ThoughtModal";
import Auth from '@utils/auth';
import { QUERY_THOUGHTS, QUERY_EMPLOYEES_PROFILE_INFO, QUERY_EMPLOYEES, QUERY_ME } from '@utils/queries';
import { CREATE_THOUGHT, CREATE_COMMENT } from '@utils/mutations';
import { v4 as uuidv4 } from 'uuid';


export default function Forum() {

    if (!Auth.loggedIn()) {
        // Alert("Log in or sign up");
        return <Navigate to="/signup" />;
    }

    //  CREATE_COMMENT  
    const [createComment, { createCommentError }] = useMutation(CREATE_COMMENT, {
        refetchQueries: [
            QUERY_THOUGHTS,
            'thoughts'
        ]
    });

    //  CREATE_THOUGHT  
    const [createThought, { createThoughtError }] = useMutation(CREATE_THOUGHT, {
        refetchQueries: [
            QUERY_THOUGHTS,
            'thoughts'
        ]
    });

    //  QUERY_ME  
    const { loading: loadingQueryMe, data: dataQueryMe } = useQuery(QUERY_ME);
    const me = dataQueryMe?.me || [];
    // console.log(me);

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

    // modal disclosure
    const disclosure = useDisclosure()

    // console.log(thoughtData);
    // Chakra color mode
    const textColor = useColorModeValue("gray.700", "white");
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
    const white = useColorModeValue('white', 'navy.900');

    // addAThought
    const addAThought = async (data) => {
        // console.log(data);
        const variables = {
            thought: {
                EmployeeID: me.employeeID,
                description: data.description,
                title: data.title,
                thoughtID: uuidv4()
            }
        }
        // console.log(variables);

        try {
            const { data } = await createThought({
                variables: variables
            });
            // console.log(data);
            // setTaskData([...taskData, data.createTask]);
            // setEmptyTask({
            //     ...emptyTask,
            //     taskID: uuidv4()
            // })
        } catch (err) {
            console.error(err);
        }
    }

    // addComment
    const addComment = async (data) => {
        const variables = {
            thoughtId: data.thoughtID,
            comment: {
                EmployeeID: me.employeeID,
                commentContent: data.commentContent,
                commentID: uuidv4()
            }
        }
        // console.log(variables);

        try {
            const { data } = await createComment({
                variables: variables
            });
            console.log(data);
            // setTaskData([...taskData, data.createTask]);
            // setEmptyTask({
            //     ...emptyTask,
            //     taskID: uuidv4()
            // })
        } catch (err) {
            console.error(err);
        }
    }

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

                <Stories mb='50px' thoughts={thoughts} employeesprofileinfo={employeesProfileInfo}
                    disclosure={disclosure} />
                <Flex mb='20px'>
                    <Text me='auto' ms='20px' fontSize='2xl' fontWeight='700' color={textColor}>
                        Forum
                    </Text>
                </Flex>
                {thoughtData.reverse().map((thought) => {
                    return (
                        <Post
                            key={thought.thoughtID}
                            likes='28.5k' comments={thought.comments.length}
                            avatar={thought.EmployeeID.avatarURI}

                            name={thought.EmployeeID.firstname + " " + thought.EmployeeID.lastname}
                            username={"@" + thought.EmployeeID.firstname + "." + thought.EmployeeID.lastname}
                            image={postImage}
                            shares='156' saves='20'
                            you={me.avatarURI} my="10"
                            thoughtData={thought.description}
                            thoughtTitle={thought.title}
                            thoughtID={thought.thoughtID}
                            addComment={addComment}
                            commentBlocks={
                                <Box>
                                    {thought.comments.reverse().map(comment => {
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
            <ThoughtModal disclosure={disclosure} addAThought={addAThought} />
        </Flex>
    );
}
