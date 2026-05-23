import axios from "axios";

export const imageUpload = async (profileImg) => {
  const formData = new FormData();
  formData.append("image", profileImg);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
    formData,
  );

  return res?.data?.data?.url;
};

