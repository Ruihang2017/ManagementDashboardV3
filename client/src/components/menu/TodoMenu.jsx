import React from "react";

// Chakra imports
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorModeValue,
  Flex,
  Icon,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
// Assets
import {
  MdOutlinePerson,
  MdOutlineCardTravel,
  MdOutlineLightbulb,
  MdOutlineSettings,
} from "react-icons/md";


export default function TodoMenu(props) {
  const { taskEmployees, addToDoEmployee, icon, ...rest } = props;

  // Ellipsis modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  // Chakra color mode

  const textColor = useColorModeValue("secondaryGray.500", "white");
  const textHover = useColorModeValue(
    { color: "secondaryGray.900", bg: "unset" },
    { color: "secondaryGray.500", bg: "unset" }
  );
  const bgList = useColorModeValue("white", "whiteAlpha.100");
  const bgShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton {...rest} onClick={onOpen1}>
        {icon}
      </MenuButton>
      <MenuList w='150px' minW='unset' maxW='150px !important' border='transparent'
        backdropFilter='blur(63px)' bg={bgList} boxShadow={bgShadow} borderRadius='20px' p='15px'>
        {taskEmployees.map((data) => {
          return (< MenuItem key={data.employeeID} transition='0.2s linear' color={textColor} _hover={textHover}
            p='0px' borderRadius='8px' _active={{ bg: "transparent", }
            } _focus={{ bg: "transparent", }} mb='10px'>
            {/* <Button onClick={() => addToDoEmployee(data)}> */}
            <Flex onClick={() => addToDoEmployee(data)} align='center'>
              {/* <Icon as={MdOutlinePerson} h='16px' w='16px' me='8px' /> */}
              <Avatar me='8px' size="sm" name="Christoph Winston" src={data.avatarURI} />
              <Text fontSize='sm' fontWeight='400'>
                {data.firstname} {data.lastname}
              </Text>
            </Flex>
            {/* </Button> */}
          </MenuItem>)
        })}
      </MenuList>
    </Menu >
  );
}
