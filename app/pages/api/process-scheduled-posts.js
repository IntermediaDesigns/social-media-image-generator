// pages/api/process-scheduled-posts.js
import { databases } from "../../utils/appwrite";
import {
  postToTwitter,
  postToFacebook,
  getTwitterAnalytics,
  getFacebookAnalytics,
} from "../../utils/socialMedia";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const now = new Date();

      const posts = await databases.listDocuments(
        "[DATABASE_ID]",
        "[SCHEDULED_POSTS_COLLECTION_ID]",
        [
          databases.Query.lessThanEqual("scheduledTime", now),
          databases.Query.equal("status", "scheduled"),
        ]
      );

      for (const post of posts.documents) {
        try {
          let result;
          if (post.platform === "twitter") {
            result = await postToTwitter(post.content, post.mediaUrls);
            const analytics = await getTwitterAnalytics(result.data.id);
            await updatePostAnalytics(post.$id, analytics);
          } else if (post.platform === "facebook") {
            result = await postToFacebook(post.content, post.mediaUrls);
            const analytics = await getFacebookAnalytics(result.id);
            await updatePostAnalytics(post.$id, analytics);
          }

          await databases.updateDocument(
            "[DATABASE_ID]",
            "[SCHEDULED_POSTS_COLLECTION_ID]",
            post.$id,
            {
              status: "posted",
              platformSpecificData: result,
            }
          );
        } catch (error) {
          console.error(`Error posting to ${post.platform}:`, error);
          await databases.updateDocument(
            "[DATABASE_ID]",
            "[SCHEDULED_POSTS_COLLECTION_ID]",
            post.$id,
            { status: "failed" }
          );
        }
      }

      res
        .status(200)
        .json({ message: "Scheduled posts processed successfully" });
    } catch (error) {
      console.error("Error processing scheduled posts:", error);
      res.status(500).json({ error: "Failed to process scheduled posts" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
