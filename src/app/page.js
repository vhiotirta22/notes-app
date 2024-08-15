"use client";
import { useState } from "react";
import { Box, Heading, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import NoteList from "../components/NoteList";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date().toISOString());
  const [noteId, setNoteId] = useState(null); // Tambahkan state untuk menyimpan ID catatan yang diedit

  // Fungsi untuk membuka modal dalam mode edit
  const handleOpenEditModal = (note) => {
    setTitle(note.title);
    setBody(note.body);
    setCreatedAt(note.createdAt);
    setNoteId(note.id); // Simpan ID catatan yang ingin diedit
    setIsOpen(true); // Buka modal
  };

  // Fungsi untuk menyimpan atau mengedit catatan
  const handleSubmit = async () => {
    try {
      const method = noteId ? "PUT" : "POST";
      const url = noteId ? `/api/notes?id=${noteId}` : "/api/notes";

      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, createdAt }),
      });

      // Reset form setelah penyimpanan
      setTitle("");
      setBody("");
      setCreatedAt(new Date().toISOString());
      setIsOpen(false);
      setNoteId(null); // Reset ID catatan
    } catch (err) {
      console.error(err);
    }
  };
<Heading mb={5} textAlign="center">Aplikasi Catatan</Heading>
  return (
    <Box maxW="800px" mx="auto" p={5}>
      <Heading mb={50} textAlign="center">Aplikasi Catatan</Heading>
      <Button colorScheme="blue" mb={50} onClick={() => setIsOpen(true)}>
        Tambah Catatan
      </Button>
      <NoteList onEdit={handleOpenEditModal} /> {/* Pass handleOpenEditModal to NoteList */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{noteId ? "Edit Catatan" : "Tambah Catatan"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Judul</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Isi</FormLabel>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Tanggal Pembuatan</FormLabel>
              <Input type="datetime-local" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={10} onClick={handleSubmit}>
              Simpan
            </Button>
            <Button onClick={() => setIsOpen(false)}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
