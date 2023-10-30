import {
    Box,
    Button,
    ButtonGroup,
    Container,
    HStack,
    Icon,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useColorModeValue,
    SimpleGrid,
    Link,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { TaskFrom } from '../TaskFrom'
import { useQuery, useMutation } from '@apollo/client';
// import { UPDATE_TASK } from '@utils/mutations';
import NewThought from '@pages/forum/components/NewThought'
// client\src\pages\forum\components\NewThought.jsx
import Card from "@components/card/Card";
import { QUERY_ME } from '@utils/queries';

//auth
import Auth from '@utils/auth';

//asset
import avatarSimmmple from "@assets/img/avatars/avatarSimmmple.png";
import avatar1 from "@assets/img/avatars/avatar1.png";
import avatar2 from "@assets/img/avatars/avatar2.png";
import avatar3 from "@assets/img/avatars/avatar3.png";
import avatar4 from "@assets/img/avatars/avatar4.png";
import avatar5 from "@assets/img/avatars/avatar5.png";
import avatar6 from "@assets/img/avatars/avatar6.png";
import avatar7 from "@assets/img/avatars/avatar7.png";
import avatar8 from "@assets/img/avatars/avatar8.png";
import avatar9 from "@assets/img/avatars/avatar9.png";
import avatar10 from "@assets/img/avatars/avatar10.png";



export const AvatarModal = (props) => {

    if (!Auth.loggedIn()) {
        // Alert("Log in or sign up");
        return <Navigate to="/signup" />;
    }

    //  QUERY_ME  
    const { loading: loadingQueryMe, data: dataQueryMe } = useQuery(QUERY_ME);
    const user = dataQueryMe?.me || [];

    const { disclosure, setUserAvatar, ...rest } = props;

    // const isMobile = useBreakpointValue({
    //     base: true,
    //     md: false,
    // })
    const boxBg = useColorModeValue("#F4F7FE !important", "#1B254B !important");
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const brandColor = useColorModeValue("brand.500", "white");
    const textColorSecondary = useColorModeValue("secondaryGray.700", "white");

    const avatarImages = [
        avatarSimmmple,
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
        avatar7,
        avatar8,
        avatar9,
        avatar10,
    ];

    const [selectedAvatar, setSelectedAvatar] = useState(() => {
        const avatarImage = avatarImages.find(avatarImage => avatarImage === user.avatarURI);
        if (!avatarImage) {
            return avatarImages[0];
        }
        return avatarImage;
    })
    // console.log(selectedAvatar);

    return (
        <>
            <Modal closeOnOverlayClick={false}
                isOpen={disclosure.isOpen}
                onClose={disclosure.onClose}
            >
                <ModalOverlay />
                <ModalContent maxW="800px">
                    <ModalHeader>Avatar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} >
                        {/* <NewThought {...rest} /> */}
                        {/* <TaskFrom selectedTask={selectedTask} employeesProfileInfo={employeesProfileInfo}
                            disclosure={disclosure} isNewTask={isNewTask}
                            taskData={taskData} setTaskData={setTaskData} /> */}
                        <Card height='max-content' {...rest}>
                            <Text fontSize='lg' color={textColor} fontWeight='700' mb='20px'>
                                Select your avatar
                            </Text>
                            <SimpleGrid columns='6' mb='40px' gap='8px'>
                                {avatarImages.map(avatarImage => {
                                    return (
                                        <Image
                                            key={avatarImage}
                                            borderRadius='8px'
                                            src={avatarImage}
                                            border={avatarImage === selectedAvatar ? "4px solid rgba(200, 100, 255, 0.5)" : "none"}
                                            onClick={() => setSelectedAvatar(avatarImage)}
                                        />)
                                })}
                            </SimpleGrid>
                            <Button variant='brand' minW='100px' fontSize='sm' fontWeight='500' ms='auto'
                                onClick={() => {
                                    setUserAvatar(selectedAvatar);
                                    disclosure.onClose();
                                }}
                            >
                                Update
                            </Button>
                        </Card>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>

    )
}