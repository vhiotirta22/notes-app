import React from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel, FormErrorMessage, VStack } from '@chakra-ui/react';

export default function NoteForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = React.useState(initialData.title || '');
  const [body, setBody] = React.useState(initialData.body || '');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ title, body });
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Error submitting the form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTitleInvalid = title.trim() === '';
  const isBodyInvalid = body.trim() === '';

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="500px"
      mx="auto"
      mt={8}
      p={8}
      boxShadow="lg"
      borderRadius="md"
      bg="white"
    >
      <VStack spacing={4} align="stretch">
        <FormControl id="title" isRequired isInvalid={isTitleInvalid}>
          <FormLabel>Judul</FormLabel>
          <Input
            placeholder="Masukkan judul catatan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="filled"
            focusBorderColor="teal.500"
          />
          {isTitleInvalid && <FormErrorMessage>Judul wajib diisi.</FormErrorMessage>}
        </FormControl>

        <FormControl id="body" isRequired isInvalid={isBodyInvalid}>
          <FormLabel>Isi Catatan</FormLabel>
          <Textarea
            placeholder="Masukkan isi catatan"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            variant="filled"
            focusBorderColor="teal.500"
            resize="vertical"
            minH="150px"
          />
          {isBodyInvalid && <FormErrorMessage>Isi catatan wajib diisi.</FormErrorMessage>}
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          width="full"
          isLoading={isSubmitting}
          loadingText="Menyimpan..."
        >
          Simpan Catatan
        </Button>
      </VStack>
    </Box>
  );
}
