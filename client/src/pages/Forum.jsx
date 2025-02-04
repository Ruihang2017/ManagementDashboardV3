import {
    Flex, Text, useColorModeValue, Box,
    useDisclosure,
} from "@chakra-ui/react";
import { useQuery, useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import postImage from "@assets/img/profile/postImage.png";
import { VSeparator } from "../components/separator/Separator";
import Stories from "./forum/components/Stories";
import Post from "./forum/components/Post";
import Comment from "@components/dataDisplay/Comment";
import { ThoughtModal } from "@components/modal/ThoughtModal";
import Auth from '@utils/auth';
import { QUERY_THOUGHTS, QUERY_EMPLOYEES_PROFILE_INFO, QUERY_ME } from '@utils/queries';
import { CREATE_THOUGHT, CREATE_COMMENT } from '@utils/mutations';
import { v4 as uuidv4 } from 'uuid';

/**
 * Forum component that checks if the user is logged in and renders the ForumContent component.
 * If the user is not logged in, the user is redirected to the signup page.
 * @returns <ForumContent />
 */
export default function Forum() {
    if (!Auth.loggedIn()) {
        return <Navigate to="/signup" />;
    }

    return <ForumContent />;
}

/**
 * ForumContent component that fetches data using GraphQL queries and displays various UI elements such as posts, comments, and stories.
 */
function ForumContent() {
    // Mutation for creating a comment
    const [createComment, { createCommentError }] = useMutation(CREATE_COMMENT, {
        refetchQueries: [
            QUERY_THOUGHTS,
        ]
    });

    // Mutation for creating a thought
    const [createThought, { createThoughtError }] = useMutation(CREATE_THOUGHT, {
        refetchQueries: [
            QUERY_THOUGHTS,
        ]
    });

    //  Query for fetching user data  
    const {data: dataQueryMe } = useQuery(QUERY_ME);
    const me = dataQueryMe?.me || [];

    //  Query for fetching employees profile info  
    const { loading: loadingQueryEmployeesProfileInfo, data: dataQueryEmployeesProfileInfo } = useQuery(QUERY_EMPLOYEES_PROFILE_INFO);
    const employeesProfileInfo = dataQueryEmployeesProfileInfo?.employees || [];

    // Query for fetching thoughts
    const { loading: loadingThoughts, data: dataThoughts } = useQuery(QUERY_THOUGHTS);
    const thoughts = dataThoughts?.thoughts || [];

    // Populate the thoughtData with employee data
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

    // Modal disclosure
    const disclosure = useDisclosure()

    // Chakra color mode
    const textColor = useColorModeValue("gray.700", "white");
    const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");

    // Function to add a thought
    const addAThought = async (data) => {
        const variables = {
            thought: {
                EmployeeID: me.employeeID,
                description: data.description,
                title: data.title,
                thoughtID: uuidv4()
            }
        };

        try {
            await createThought({
                variables: variables
            });
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

        try {
            await createComment({
                variables: variables
            });
        } catch (err) {
            console.error(err);
        }
    }

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
                                    {[...thought.comments].reverse().map(comment => {
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
            {createCommentError && <Text color="red.500">Error creating comment: {createCommentError.message}</Text>}
            {createThoughtError && <Text color="red.500">Error creating thought: {createThoughtError.message}</Text>}
        </Flex>
    );
}
