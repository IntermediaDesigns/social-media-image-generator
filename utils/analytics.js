// utils/analytics.js
import { databases } from './appwrite';

export const updatePostAnalytics = async (postId, metrics) => {
    try {
        const response = await databases.updateDocument(
            '[DATABASE_ID]',
            '[SCHEDULED_POSTS_COLLECTION_ID]',
            postId,
            metrics
        );
        return response;
    } catch (error) {
        console.error('Error updating post analytics:', error);
        throw error;
    }
};

export const getPostAnalytics = async (postId) => {
    try {
        const post = await databases.getDocument(
            '[DATABASE_ID]',
            '[SCHEDULED_POSTS_COLLECTION_ID]',
            postId
        );
        return {
            views: post.views || 0,
            likes: post.likes || 0,
            shares: post.shares || 0,
            comments: post.comments || 0,
            postTime: post.postTime
        };
    } catch (error) {
        console.error('Error fetching post analytics:', error);
        throw error;
    }
};

export const getOverallAnalytics = async (startDate, endDate) => {
    try {
        const posts = await databases.listDocuments(
            '[DATABASE_ID]',
            '[SCHEDULED_POSTS_COLLECTION_ID]',
            [
                databases.Query.greaterThanEqual('postTime', startDate),
                databases.Query.lessThanEqual('postTime', endDate),
                databases.Query.equal('status', 'posted')
            ]
        );

        const analytics = posts.documents.reduce((acc, post) => {
            acc.totalViews += post.views || 0;
            acc.totalLikes += post.likes || 0;
            acc.totalShares += post.shares || 0;
            acc.totalComments += post.comments || 0;
            acc.postCount += 1;
            return acc;
        }, { totalViews: 0, totalLikes: 0, totalShares: 0, totalComments: 0, postCount: 0 });

        return analytics;
    } catch (error) {
        console.error('Error fetching overall analytics:', error);
        throw error;
    }
};