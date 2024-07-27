// components/AnalyticsDashboard.js
import { useState, useEffect } from 'react';
import { getOverallAnalytics } from '../utils/analytics';

export default function AnalyticsDashboard() {
    // ... (previous code remains the same)

    return (
        <div>
            <h2>Content Analytics</h2>
            {/* ... (previous code remains the same) */}
            <div>
                <h3>Twitter Analytics</h3>
                <p>Total Retweets: {analytics.twitterMetrics.totalRetweets}</p>
                <p>Total Likes: {analytics.twitterMetrics.totalLikes}</p>
                <p>Total Replies: {analytics.twitterMetrics.totalReplies}</p>
            </div>
            <div>
                <h3>Facebook Analytics</h3>
                <p>Total Reactions: {analytics.facebookMetrics.totalReactions}</p>
                <p>Total Comments: {analytics.facebookMetrics.totalComments}</p>
                <p>Total Shares: {analytics.facebookMetrics.totalShares}</p>
            </div>
        </div>
    );
}