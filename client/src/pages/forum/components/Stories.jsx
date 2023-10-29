import { Flex, Button, Text, Icon, useColorModeValue } from "@chakra-ui/react";
// Assets
import avatar1 from "@assets/img/avatars/avatar1.png";
import avatar10 from "@assets/img/avatars/avatar10.png";
import avatar2 from "@assets/img/avatars/avatar2.png";
import avatar3 from "@assets/img/avatars/avatar3.png";
import avatar4 from "@assets/img/avatars/avatar4.png";
import avatar5 from "@assets/img/avatars/avatar5.png";
import avatar6 from "@assets/img/avatars/avatar6.png";
import avatar7 from "@assets/img/avatars/avatar7.png";
import avatar8 from "@assets/img/avatars/avatar8.png";
import avatar9 from "@assets/img/avatars/avatar9.png";
import { MdAdd } from "react-icons/md";
// Custom components
import SeeStory from "@components/actions/SeeStory";
import Card from "@components/card/Card";
import React from "react";
import {
  storiesRenderThumb,
  storiesRenderTrack,
  storiesRenderView,
} from "@components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";


import { useState, useEffect } from 'react';


export default function Stories(props) {
  const { ...rest } = props;

  const [thoughts, setThoughts] = useState(props.thoughts);
  const [employeesProfileInfo, setEmployeesProfileInfo] = useState(props.employeesprofileinfo);
  const [employeeWithThoughts, setEmployeeWithThoughts] = useState([]);
  useEffect(() => {
    const newEmployeeWithThoughts = employeesProfileInfo.filter(employee => {
      if (thoughts.find(thought => thought.EmployeeID === employee.employeeID)) {
        return true;
      }
    })
    // console.log(newEmployeeWithThoughts);

    setEmployeeWithThoughts(newEmployeeWithThoughts);
  }, [thoughts, employeesProfileInfo]);


  // console.log(employeesProfileInfo);
  // console.log(thoughts);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgAdd = useColorModeValue("white", "navy.800");

  return (
    <Card
      flexDirection='row'
      justifyContent={{ lg: "space-between" }}
      pb='0px'
      {...props}>
      <Scrollbars autoHide
        renderTrackHorizontal={storiesRenderTrack}
        renderThumbHorizontal={storiesRenderThumb}
        renderView={storiesRenderView}>
        <Flex minW={{ base: "1090px", "2xl": "unset" }} w='100%' justifyContent='space-between' pb='20px'>

          <Button
            bg='transparent' variant='no-hover' fontWeight='700' display='flex' h='max-content'
            w='max-content' minW='max-content' boxShadow='unset' flexDirection='column'
            onClick={() => {
              props.disclosure.onOpen();
            }}
          >
            <Flex mx='auto' h='max-content' w='max-content' p='3px'
              borderRadius='50%' bg='linear-gradient(179.78deg, #7A64FF 0.23%, #FF508B 66.58%, #FD6D53 99.75%, #FD6D53 99.75%);                            '>
              <Flex borderRadius='50px' align='center' justify='center' bg={bgAdd} w='54px' h='54px'>
                <Icon as={MdAdd} color={textColor} w='24px' h='24px' />
              </Flex>
            </Flex>
            <Text mt='10px' textAlign='center' color={textColor} fontSize='sm' fontWeight='500'>
              Add a thought
            </Text>
          </Button>
          {employeeWithThoughts.map((employee) => {
            return (
              <SeeStory key={employee.employeeID} my='auto' name={employee.firstname + " " + employee.lastname}
                avatar={employee.avatarURI} />
            )
          })}
        </Flex>
      </Scrollbars>
    </Card>
  );
}
