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

// user in db
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData,
  );
  return data;
};
