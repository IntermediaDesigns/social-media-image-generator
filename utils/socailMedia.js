// utils/socialMedia.js
import Twitter from 'twitter-api-v2';
import FB from 'fb';

// Initialize clients (you'll need to set up proper authentication)
const twitterClient = new Twitter({ /* your Twitter API credentials */ });
const fbClient = new FB.Facebook({ /* your Facebook API credentials */ });

export const postToTwitter = async (content, mediaUrls = []) => {
    try {
        let tweet = { text: content };
        if (mediaUrls.length > 0) {
            const mediaIds = await Promise.all(mediaUrls.map(url => twitterClient.v1.uploadMedia(url)));
            tweet.media = { media_ids: mediaIds };
        }
        const result = await twitterClient.v2.tweet(tweet);
        return result;
    } catch (error) {
        console.error('Error posting to Twitter:', error);
        throw error;
    }
};

export const postToFacebook = async (content, mediaUrls = []) => {
    try {
        let post = { message: content };
        if (mediaUrls.length > 0) {
            post.attached_media = mediaUrls.map(url => ({ media_fbid: url }));
        }
        const result = await new Promise((resolve, reject) => {
            fbClient.api('/me/feed', 'POST', post, (res) => {
                if(!res || res.error) {
                    reject(res.error);
                } else {
                    resolve(res);
                }
            });
        });
        return result;
    } catch (error) {
        console.error('Error posting to Facebook:', error);
        throw error;
    }
};

export const getTwitterAnalytics = async (tweetId) => {
    try {
        const result = await twitterClient.v2.get(`tweets/${tweetId}`, {
            expansions: ['public_metrics'],
        });
        return result.data.public_metrics;
    } catch (error) {
        console.error('Error fetching Twitter analytics:', error);
        throw error;
    }
};

export const getFacebookAnalytics = async (postId) => {
    try {
        const result = await new Promise((resolve, reject) => {
            fbClient.api(`/${postId}/insights`, (res) => {
                if(!res || res.error) {
                    reject(res.error);
                } else {
                    resolve(res);
                }
            });
        });
        return result;
    } catch (error) {
        console.error('Error fetching Facebook analytics:', error);
        throw error;
    }
};