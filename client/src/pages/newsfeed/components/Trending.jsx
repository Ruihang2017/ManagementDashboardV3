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
