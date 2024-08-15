import { useState, useEffect } from 'react';
import { 
  Box, Heading, Grid, GridItem, Text, Spinner, Button, useToast, 
  VStack, HStack, IconButton, Divider 
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleOpenEditModal = (note) => {
    setTitle(note.title);
    setBody(note.body);
    setCreatedAt(note.createdAt);
    setNoteId(note.id); // Simpan ID catatan yang ingin diedit
    setIsOpen(true); // Buka modal
  };

  
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter((note) => note.id !== id));
      toast({
        title: 'Catatan Terhapus',
        description: 'Catatan Anda telah dihapus.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Terjadi Kesalahan',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="1200px" mx="auto" p={10}>
      <Heading mb={8} textAlign="center" color="teal.500">Daftar Catatan</Heading>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" h="500px">
          <Spinner size="xl" color="teal.500" />
        </Box>
      ) : error ? (
        <Box p={4} bg="red.100" color="red.700" borderRadius="md" mb={8}>
          <Text>{error}</Text>
        </Box>
      ) : notes.length === 0 ? (
        <Box p={4} bg="gray.100" borderRadius="md" mb={8}>
          <Text>Tidak ada catatan</Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
          {notes.map((note) => (
            <GridItem key={note.id}>
              <Box 
                bg="grey" 
                boxShadow="lg" 
                p={6} 
                borderRadius="md" 
                h="100%" 
                display="flex" 
                flexDirection="column" 
                justifyContent="space-between"

              >
                <VStack align="start">
                  <Heading size="md" mb={10} color="black">{note.title}</Heading>
                  <Divider />
                  <Text color="black" mt={10}>{note.body}</Text>
                </VStack>
                <HStack spacing={4} mt={10} justifyContent="flex-end">
                  <IconButton 
                    icon={<EditIcon />} 
                    aria-label="Edit Note" 
                    variant="outline" 
                    colorScheme="blue" 
                    size="sm" 
                  />
                  <IconButton 
                    icon={<DeleteIcon />} 
                    aria-label="Delete Note" 
                    variant="outline" 
                    colorScheme="red" 
                    size="sm" 
                    onClick={() => handleDelete(note.id)}
                  />
                </HStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
}
