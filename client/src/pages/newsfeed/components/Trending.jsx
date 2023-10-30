import React from "react";

// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Image,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom components
import Card from "@components/card/Card";
import Follow from "@components/actions/Follow";
// Assets
import avatar1 from "@assets/img/avatars/avatar1.png";
import avatar10 from "@assets/img/avatars/avatar10.png";
import avatar2 from "@assets/img/avatars/avatar2.png";
import avatar3 from "@assets/img/avatars/avatar3.png";
import avatar4 from "@assets/img/avatars/avatar4.png";
import avatar5 from "@assets/img/avatars/avatar5.png";
import avatar7 from "@assets/img/avatars/avatar7.png";
import avatar6 from "@assets/img/avatars/avatar6.png";
import avatar8 from "@assets/img/avatars/avatar8.png";
import avatar9 from "@assets/img/avatars/avatar9.png";
import image1 from "@assets/img/profile/image1.png";
import image2 from "@assets/img/profile/image2.png";
import image3 from "@assets/img/profile/image3.png";
import image4 from "@assets/img/profile/image4.png";
import image5 from "@assets/img/profile/image5.png";
import image6 from "@assets/img/profile/image6.png";

export default function Trending(props) {
  const { ...rest } = props;

  // Chakra Color Modev
  const boxBg = useColorModeValue("#F4F7FE !important", "#1B254B !important");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  return (
    <Card height='max-content' {...rest}>
      <Text fontSize='lg' color={textColor} fontWeight='700' mb='20px'>
        Trending Feeds
      </Text>
      <SimpleGrid columns='3' mb='40px' gap='8px'>
        <Link href='#'>
          <Image borderRadius='8px' src={image1} />
        </Link>
        <Link href='#'>
          <Image borderRadius='8px' src={image2} />
        </Link>
        <Link href='#'>
          <Image borderRadius='8px' src={image3} />
        </Link>
        <Link href='#'>
          <Image borderRadius='8px' src={image4} />
        </Link>
        <Link href='#'>
          <Image borderRadius='8px' src={image5} />
        </Link>
        <Link href='#'>
          <Image borderRadius='8px' src={image6} />
        </Link>
      </SimpleGrid>

    </Card>
  );
}

{/* <Box borderRadius='20px' bg={boxBg} p='30px'>
        <AvatarGroup flexWrap='wrap' mb='20px'>
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar1}
          />
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar2}
          />
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar3}
          />
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar4}
          />
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar5}
          />
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar6}
          />
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar7}
          />
          <Avatar
            h='42px'
            w='42px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar8}
          />
          <Avatar
            h='44px'
            w='44px'
            border='3px solid'
            borderColor={boxBg}
            src={avatar9}
          />
        </AvatarGroup>
      </Box> */}