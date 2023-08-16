import { Box, Divider, Text, VStack, Image } from "@chakra-ui/react";
import CommentForm from "./Comments";
import { useState } from "react";
const { v4: uuidv4 } = require('uuid');

type Post = {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
};
type Comment = {
  id: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  postId: number;
};
interface PostCardProps {
  post: Post;
}
function PhotoCard({ post }: PostCardProps) {
  const [postComments, setPostComments] = useState<Comment[]>(post.comments);

  const handlePostComment = async (postId: any, comment: any) => {
    try {
      let tempComments: Comment[] = [...postComments]
      const currentDate = new Date();

      tempComments.push({
        id: uuidv4(),
        comment: comment,
        createdAt: currentDate.toString(),
        updatedAt: currentDate.toString(),
        postId: postId
      })
      setPostComments(tempComments)
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Box p="4" borderWidth="1px" borderColor="gray.200" borderRadius="md">
      <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${post.imageUrl}`} alt={post.name} />
      <Divider my="2" />
      <Text fontSize="lg" fontWeight="bold">
        {post.name}
      </Text>
      <VStack spacing="2" align="start" mt="2">
        {postComments.map((comment: Comment, index: number) => (
          <Text key={index} fontSize="sm">
            {comment.comment}
          </Text>
        ))}
      </VStack>
      <Divider my="2" />
      <CommentForm postId={post.id} onPostComment={handlePostComment}
      />
    </Box>
  );
}

export default PhotoCard;
