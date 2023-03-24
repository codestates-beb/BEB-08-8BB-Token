import { ThirdwebStorage } from "@thirdweb-dev/storage";

const storage = new ThirdwebStorage();

export default storage;

export async function uploadFile(file: unknown): Promise<any> {
  // if (Array.isArray(file)) {
  //   return file.map(uploadFile);
  // } else {
  const uri = await storage.upload(file);
  return storage.resolveScheme(uri);
  // }
}
