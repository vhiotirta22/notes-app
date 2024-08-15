// components/NoteItem.js
import { Box, Heading, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const NoteItem = ({ note }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <NextLink href={`/${note.id}`} passHref>
        <Link>
          <Heading size="md">{note.title}</Heading>
          <Text>{new Date(note.createdAt).toLocaleDateString()}</Text>
          <Text>{note.body}</Text>
        </Link>
      </NextLink>
    </Box>
  );
};

export default NoteItem;
