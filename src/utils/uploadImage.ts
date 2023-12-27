import {
  getDownloadURL,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {storage} from "../config/fierbase";

export const uploadImage = async (
  buffer: Buffer,
  originalname: string
): Promise<string> => {
  const fileName = `images/${Date.now()}_${originalname}`;
  const storageRef = ref(storage, fileName);

  const metadata = {
    contentType: "image/jpeg",
  };

  await uploadBytesResumable(storageRef, buffer, metadata);
  const imageUrl = await getDownloadURL(storageRef);

  return imageUrl;
};

export const getAllImageUrls = async (): Promise<string[]> => {
  const files = await list(ref(storage, "images"));

  const imageUrlPromises = files.items.map(async (file) => {
    const imageUrl = await getDownloadURL(file);
    return imageUrl;
  });

  const imageUrlList = await Promise.all(imageUrlPromises);

  return imageUrlList;
};
