import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  color,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { FaRegCommentDots } from "react-icons/fa";
import { } from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import {
  MdOutlineFavoriteBorder,
  MdShare,
  MdBookmarkBorder,
  MdOutlineAttachment,
  MdOutlineTagFaces,
  MdImage,
  MdSend,
} from "react-icons/md";

// Custom @components
import Card from "@components/card/Card.jsx";
import CardWhite from "@components/card/CardWhite";

import { HSeparator } from "@components/separator/Separator";
import React from "react";
import SeeStory from "@components/actions/SeeStory";
import TransparentMenu from "@components/menu/TransparentMenu";
import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

Post.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.number,
    shares: PropTypes.number,
    saves: PropTypes.number,
    commentBlocks: PropTypes.node,
    you: PropTypes.string.isRequired,
    thoughtData: PropTypes.string.isRequired,
    thoughtTitle: PropTypes.string.isRequired,
    thoughtID: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
};

export default function Post(props) {
  const {
    avatar,
    name,
    username,
    image,
    likes,
    comments,
    shares,
    saves,
    commentBlocks,
    you,
    thoughtData,
    thoughtTitle,
    thoughtID,
    addComment,
    ...rest
  } = props;
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const [comment, setComment] = useState("");

  return (
    // <CardWhite>
    <Card p={{ base: "15px", md: "30px" }} {...rest} boxShadow="2xl"
      borderRadius="lg">
      <Box mb='45px' w='100%' >
        <Flex justify='space-between' align='center' w='100%'>
          <Flex>
            <SeeStory
              ps='0px'
              avatar={avatar}
              w='40px'
              h='40px'
              borderRadius='12px'
            />
            <Flex direction='column'>
              <Text fontSize='md' color={textColor} fontWeight='700'>
                {name}
              </Text>
              <Text fontSize='sm' color='gray.500' fontWeight='500'>
                {username}
              </Text>
            </Flex>
          </Flex>
          <TransparentMenu
            icon={
              <Icon
                as={IoEllipsisHorizontal}
                w='24px'
                h='24px'
                color={textColor}
              />
            }
          />
        </Flex>
        <Stack>
          <Text fontSize='md' px="1" color={textColor} fontWeight='600'>{"[" + thoughtTitle + "]"}</Text>

          <Text fontSize='md' px="1" color={textColor} fontWeight='600'>{thoughtData}</Text>
        </Stack>

      </Box>

      <Flex direction='column'>

        {/* <Image
          src={image}
          minW={{ sm: "270px" }}
          h='auto'
          borderRadius='16px'
          mb='30px'
        /> */}
        <Box px={{ md: "20px" }}>
          <Flex justify='space-between' align='center' mb='30px'>
            {/* <Flex align='center' color={textColor}>
              <Icon
                as={MdOutlineFavoriteBorder}
                w='18px'
                h='18px'
                me='4px'
                cursor='pointer'
              />
              <Text fontSize='md' fontWeight='500'>
                {likes}
                <Text
                  as='span'
                  display={{ base: "none", md: "unset" }}
                  fontSize='md'
                  fontWeight='500'>
                  {" "}
                  Likes
                </Text>
              </Text>
            </Flex> */}
            <Flex align='center' color={textColor}>
              <Icon
                as={FaRegCommentDots}
                w='18px'
                h='18px'
                me='4px'
                cursor='pointer'
              />
              <Text fontSize='md' fontWeight='500'>
                {comments}
                <Text
                  as='span'
                  display={{ base: "none", md: "unset" }}
                  fontSize='md'
                  fontWeight='500'>
                  {" "}
                  Comments
                </Text>
              </Text>
            </Flex>
            {/* <Flex align='center' color={textColor}>
              <Icon as={MdShare} w='18px' h='18px' me='4px' cursor='pointer' />
              <Text fontSize='md' fontWeight='500'>
                {shares}
                <Text
                  as='span'
                  display={{ base: "none", md: "unset" }}
                  fontSize='md'
                  fontWeight='500'>
                  {" "}
                  Shares
                </Text>
              </Text>
            </Flex>
            <Flex align='center' color={textColor}>
              <Icon
                as={MdBookmarkBorder}
                w='18px'
                h='18px'
                me='4px'
                cursor='pointer'
              />
              <Text fontSize='md' fontWeight='500' me='3px'>
                {saves}
                <Text
                  as='span'
                  display={{ base: "none", md: "unset" }}
                  fontSize='md'
                  fontWeight='500'>
                  {" "}
                  Saves
                </Text>
              </Text>
            </Flex> */}
          </Flex>
          <HSeparator mb='26px' />
          {commentBlocks}
          <Flex align='center' position='relative'>
            <Avatar
              display={{ base: "none", md: "unset" }}
              src={you}
              w='50px'
              h='50px'
              me='15px'
            />
            <Input
              variant='social'
              placeholder='Write your comment...'
              _focus={{ borderColor: "blue.500" }}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
            <Box position='absolute' right='0px'>
              {" "}
              {/* <IconButton me='2px' px='0px' variant='no-hover' bg='transparent'>
                <Icon
                  as={MdOutlineAttachment}
                  h='20px'
                  w='20px'
                  color='secondaryGray.700'
                  transform='rotate(270deg)'
                />
              </IconButton> */}
              <IconButton me='2px' px='0px' variant='no-hover' bg='transparent'
                onClick={() => {
                  addComment({
                    thoughtID: thoughtID,
                    commentContent: comment,
                  });
                }}>
                <Icon
                  as={MdSend}
                  h='20px'
                  w='20px'
                  color='secondaryGray.700'
                />
              </IconButton>
              {/* <IconButton me='2px' px='0px' variant='no-hover' bg='transparent'>
                <Icon
                  as={MdImage}
                  h='20px'
                  w='20px'
                  color='secondaryGray.700'
                />
              </IconButton> */}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card >
    // </CardWhite>

  );
}
