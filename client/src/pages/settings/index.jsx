// Chakra imports
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import Connected from "./components/Connected";
import Delete from "./components/Delete";
import Information from "./components/Information";
import Newsletter from "./components/Newsletter";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Sessions from "./components/Sessions";
import Socials from "./components/Socials";
import TwoFactor from "./components/TwoFactor";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1, lg: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* Column Left */}
        <Flex direction='column'>
          <Profile />
          <Information />
          <Socials />
          <Password />
        </Flex>
        {/* Column Right */}
        <Flex direction='column'>
          <TwoFactor mb='20px' />
          <Newsletter mb='20px' />
          <Sessions mb='20px' />
          <Connected mb='20px' />
          <Delete />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
