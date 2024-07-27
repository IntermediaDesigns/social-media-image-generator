// components/PostGenerator.js
import { useState } from 'react';
import { schedulePost } from '../utils/schedulePosts';

export default function PostGenerator() {
    const [content, setContent] = useState('');
    const [platform, setPlatform] = useState('twitter');
    const [scheduledTime, setScheduledTime] = useState('');
    const [mediaUrls, setMediaUrls] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schedulePost(content, platform, new Date(scheduledTime), mediaUrls);
            alert('Post scheduled successfully!');
            // Reset form
            setContent('');
            setPlatform('twitter');
            setScheduledTime('');
            setMediaUrls([]);
        } catch (error) {
            alert('Failed to schedule post: ' + error.message);
        }
    };

    const handleMediaUpload = (e) => {
        // In a real application, you would upload these files to a storage service
        // and use the returned URLs. For this example, we'll use fake URLs.
        const newMediaUrls = [...mediaUrls, ...Array.from(e.target.files).map((_, index) => `https://fake-url.com/media-${index + mediaUrls.length + 1}`)];
        setMediaUrls(newMediaUrls);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                cols={50}
            />
            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
            </select>
            <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
            />
            <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleMediaUpload}
            />
            {mediaUrls.length > 0 && (
                <div>
                    <p>Attached media:</p>
                    <ul>
                        {mediaUrls.map((url, index) => (
                            <li key={index}>{url}</li>
                        ))}
                    </ul>
                </div>
            )}
            <button type="submit">Schedule Post</button>
        </form>
    );
}