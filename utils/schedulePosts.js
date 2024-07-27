// utils/schedulePosts.js
import { client, databases } from './appwrite';

export const schedulePost = async (content, platform, scheduledTime) => {
    try {
        const response = await databases.createDocument(
            '[DATABASE_ID]',
            '[SCHEDULED_POSTS_COLLECTION_ID]',
            'unique()',
            {
                content,
                platform,
                scheduledTime,
                status: 'scheduled'
            }
        );
        return response;
    } catch (error) {
        console.error('Error scheduling post:', error);
        throw error;
    }
};