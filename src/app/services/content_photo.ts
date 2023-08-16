const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type UploadPostPayload = {
  photo: File;
  title: string;
  description: string;
};

export const uploadPhoto = async (payload: UploadPostPayload) => {
  const { photo, title, description } = payload;
  try {
    const formData = new FormData();
    formData.append("image", photo);
    formData.append("title", title);
    formData.append("description", description);

    const response = await fetch(`${baseUrl}/v1/posts/upload-photo`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload photo");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error uploading photo:", error.message);
    return null;
  }
};

type CommentPayload = {
  postId: number | string;
  comment: string;
};

export const addComment = async (payload: CommentPayload) => {
  const { postId, comment } = payload;
  try {
    const response = await fetch(`${baseUrl}/v1/posts/add-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to add comment");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error adding comment:", error.message);
    return null;
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(baseUrl + "/v1/posts/get-all-posts");

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
};
