import { Button, Flex, Textarea, useStyleConfig } from "@chakra-ui/react";
import { addComment } from "../services/content_photo";
import { useState } from "react";
interface CommentFormProps {
  postId: number | string;
  onPostComment: onPostComment
}
type CommentPayload = {
  postId: number | string;
  comment: string;
};
type onPostComment = (postId: number | string, comment: string) => void;

function CommentForm({ postId, onPostComment }: CommentFormProps) {
  const styles = useStyleConfig("Button", { colorScheme: "green" });

  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = async () => {
    if (loading) {
      return
    }
    if (!comment) {
      console.log("Please enter a comment.");
      return;
    }

    setLoading(true)
    try {
      const payload: CommentPayload = {
        postId,
        comment: comment
      }
      await addComment(payload);
      onPostComment(postId, comment)
      setLoading(false)
      console.log("Comment posted successfully!");
      setComment("");
    } catch (error) {
      setLoading(false)
      console.error("Error posting comment:", error);
    }
  };
  return (
    <Flex direction="column">
      <Textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={handleCommentChange}
        mb="2"
      />
      <Button
        sx={{ ...styles, cursor: loading ? "not-allowed" : "pointer" }}
        onClick={handlePostComment}
        disabled={loading} // The button is now conditionally disabled based on the loading state
      >
        Post Comment
      </Button>
    </Flex>
  );
}

export default CommentForm;
