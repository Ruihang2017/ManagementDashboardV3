import {
    Avatar,
    Box,
    Flex,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    StackDivider,
    Text,
    Link,
    Heading,
} from '@chakra-ui/react'
import {
    FiBookmark,
    FiClock,
    FiGrid,
    FiHelpCircle,
    FiMoreVertical,
    FiPieChart,
    FiSearch,
    FiSettings,
    FiFile,
    FiLogOut,
} from 'react-icons/fi'

import { Navigate } from 'react-router-dom';

import { DocumentCollapse } from './DocumentCollapse'
import { Logo } from './Logo'
import { SidebarButton } from './SidebarButton'

//apollo
import { useQuery, useMutation } from '@apollo/client';

// utils
import Auth from '@utils/auth';
import { QUERY_ME } from '@utils/queries';



export const Sidebar = () => {

    if (!Auth.loggedIn()) {
        // Alert("Log in or sign up");
        return;
        // return <Navigate to="/signup" />;
    }

    //  QUERY_ME  
    const { loading: loadingQueryMe, data: dataQueryMe } = useQuery(QUERY_ME);
    const me = dataQueryMe?.me || [];
    console.log(me);
    return (
        <Flex
            // pos="sticky"
            as="section"
            minH="100vh"
            // width="30vh"
            // boxShadow="10px 4px 12px 0 rgba( 0, 0, 0, 0.05)"
            // flexDir="column"
            justifyContent="space-between"
        >
            <Stack
                // position="fixed"
                // flex="1"
                // maxW={{
                //     base: 'full',
                //     sm: 'xs',
                // }}
                py={{
                    base: '6',
                    sm: '8',
                }}
                px={{
                    base: '4',
                    sm: '6',
                }}
                bg="bg.surface"
                borderRightWidth="1px"
                justifyContent="space-between"
            >
                <Stack spacing="8">
                    <Heading as='h4' size='md' noOfLines={1}>Employee Dashboard</Heading>
                    <InputGroup>
                        <InputLeftElement>
                            <Icon as={FiSearch} color="fg.muted" fontSize="lg" />
                        </InputLeftElement>
                        <Input placeholder="Search" />
                    </InputGroup>
                    <Stack spacing="1">

                        <SidebarButton leftIcon={<FiGrid />}><Link href='/'>Forum</Link></SidebarButton>
                        <SidebarButton leftIcon={<FiFile />}><Link href='/task'>Task</Link></SidebarButton>

                        <SidebarButton leftIcon={<FiPieChart />}><Link href='/analytics'>Analytics</Link></SidebarButton>

                    </Stack>
                </Stack>
                <Stack spacing="4" divider={<StackDivider />}>
                    <Box />
                    <Stack spacing="1">
                        <SidebarButton leftIcon={<FiSettings />}><Link href='/settings'>Settings</Link></SidebarButton>
                    </Stack>
                    <HStack spacing="3" justify="space-between">
                        <HStack spacing="3">
                            <Avatar boxSize="10" src={me.avatarURI} />
                            <Box height={"100%"}>
                                <Text
                                    fontSize="24px"
                                    margin="0"
                                    textStyle="md"
                                    fontWeight="medium"
                                >
                                    {me.firstname + " " + me.lastname}
                                </Text>

                            </Box>
                        </HStack>
                        <IconButton variant="tertiary" icon={<FiLogOut />} aria-label="Open Menu"
                            onClick={Auth.logout} />
                    </HStack>
                </Stack>
            </Stack>
        </Flex>
    )
}