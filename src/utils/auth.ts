import {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
} from "aws-amplify/auth";

export async function getUserDisplayName(): Promise<string> {
  try {
    const session = await fetchAuthSession();
    console.log("Current session:", session);

    const currentUser = await getCurrentUser();
    console.log("Current user:", currentUser);

    const attributes = await fetchUserAttributes();
    console.log("User attributes:", attributes);

    return attributes.name || attributes.email || currentUser.username;
  } catch (error) {
    console.error("Error getting user", error);
    return "User";
  }
}
