'use client'
import { Box, Container, Heading, SimpleGrid, TableContainer } from "@chakra-ui/react";
import PhotoUploadForm from "./components/UploadForm";
import PhotoCard from "./components/ImageCard";
import { getPosts } from "./services/content_photo";
import React, { useState } from "react";

type Comment = {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  postId: number;
};


type post = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
};

type PostArray = post[];

export default function Home() {
  const [posts, setPosts] = useState<PostArray>([])
  React.useEffect(() => {
    getPostsFn()
  }, [])

  const getPostsFn = async () => {
    try {
      let response = await getPosts()
      setPosts(response.data)
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };
  return (
    <main>
      <Container maxW="xl" mt="4">
        <Heading mb="4">Photo Upload and Comments</Heading>
        <PhotoUploadForm onPostUploadComplete={getPostsFn}/>
        {posts?.map((post) => (
          <PhotoCard key={post.id} post={post} />
        ))}
      </Container>
    </main>
  )
}
