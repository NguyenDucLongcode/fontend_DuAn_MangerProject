import { GetUserReloadPage } from "@/services/auth.services/auth.services";
import { decodeToken } from "./jwt";

export async function findUserFromToken(token: string) {
  const decodeJWT = decodeToken(token);
  const userId = decodeJWT?.sub;
  if (userId) {
    try {
      const dataUser = await GetUserReloadPage(userId);
      return dataUser.data.user;
    } catch (error) {
      console.error("Error fetching user detail:", error);
      return null;
    }
  }

  return null;
}
