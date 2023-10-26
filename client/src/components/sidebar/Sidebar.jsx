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
} from 'react-icons/fi'
import { DocumentCollapse } from './DocumentCollapse'
import { Logo } from './Logo'
import { SidebarButton } from './SidebarButton'

export const Sidebar = () => (
    <Flex as="section" minH="100vh">
        <Stack
            flex="1"
            maxW={{
                base: 'full',
                sm: 'xs',
            }}
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
                <Logo alignSelf="start" />
                <InputGroup>
                    <InputLeftElement>
                        <Icon as={FiSearch} color="fg.muted" fontSize="lg" />
                    </InputLeftElement>
                    <Input placeholder="Search" />
                </InputGroup>
                <Stack spacing="1">
                    {/* <SidebarButton leftIcon={<FiHelpCircle />}><Link href='/forum'>Forum</Link></SidebarButton> */}

                    <SidebarButton leftIcon={<FiGrid />}><Link href='/'>Forum</Link></SidebarButton>
                    <SidebarButton leftIcon={<FiFile />}><Link href='/task'>Task</Link></SidebarButton>

                    <SidebarButton leftIcon={<FiPieChart />}><Link href='/analytics'>analytics</Link></SidebarButton>
                    {/* <DocumentCollapse /> */}
                    <SidebarButton leftIcon={<FiClock />}><Link href='/'>History</Link></SidebarButton>
                    <SidebarButton leftIcon={<FiBookmark />}><Link href='/'>Favorites</Link></SidebarButton>
                </Stack>
            </Stack>
            <Stack spacing="4" divider={<StackDivider />}>
                <Box />
                <Stack spacing="1">
                    <SidebarButton leftIcon={<FiSettings />}><Link href='/setting'>Settings</Link></SidebarButton>
                </Stack>
                <HStack spacing="3" justify="space-between">
                    <HStack spacing="3">
                        <Avatar boxSize="10" src="https://i.pravatar.cc/300" />
                        <Box>
                            <Text textStyle="sm" fontWeight="medium">
                                John Doe
                            </Text>
                            <Text textStyle="sm" color="fg.muted">
                                john@chakra-ui.com
                            </Text>
                        </Box>
                    </HStack>
                    <IconButton variant="tertiary" icon={<FiMoreVertical />} aria-label="Open Menu" />
                </HStack>
            </Stack>
        </Stack>
    </Flex>
)