import { Button, Flex, Input, VStack, Text, useStyleConfig } from "@chakra-ui/react";
import { useState } from "react";
import { uploadPhoto } from "../services/content_photo";

function PhotoUploadForm({ onPostUploadComplete }: { onPostUploadComplete: () => void }) {
  const styles = useStyleConfig("Button", { colorScheme: "blue" });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      console.log("No image selected.");
      return;
    }
    setLoading(true)
    try {
      const payload = {
        photo: selectedImage,
        title: caption,
        description: ''
      }
      let response = await uploadPhoto(payload)
      setSelectedImage(null);
      setCaption("");
      onPostUploadComplete()
      setLoading(false)
      console.log("Photo uploaded successfully!");
    } catch (error) {
      setLoading(false)
      console.error("Error uploading photo:", error);
    }
  };

  return (
    <VStack spacing="4">
      <Flex direction="column" alignItems="center">
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: "100%", marginBottom: "1rem" }}
          />
        ) : (
          <Text fontSize="sm" color="gray.500">
            Select an image
          </Text>
        )}
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          display="none"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button as="span" colorScheme="blue">
            Choose Image
          </Button>
        </label>
      </Flex>
      <Input
        placeholder="Add a caption..."
        type="text"
        value={caption}
        onChange={handleCaptionChange}
      />
      <Button
        sx={{ ...styles, cursor: loading ? "not-allowed" : "pointer" }}
        onClick={handleUpload}
        disabled={loading}
        mb="5"
      >
        Upload</Button>
    </VStack>
  );
}
export default PhotoUploadForm