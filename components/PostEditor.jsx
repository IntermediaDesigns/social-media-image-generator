// components/PostEditor.js
import { useState, useEffect } from 'react'
import { databases } from '../utils/appwrite'

export default function PostEditor({ postId, onSave, onCancel }) {
    const [post, setPost] = useState(null)
    const [content, setContent] = useState('')
    const [platform, setPlatform] = useState('')
    const [scheduledTime, setScheduledTime] = useState('')

    useEffect(() => {
        // Fetch the post data when the component mounts
        const fetchPost = async () => {
            try {
                const fetchedPost = await databases.getDocument(
                    '[DATABASE_ID]',
                    '[SCHEDULED_POSTS_COLLECTION_ID]',
                    postId
                )
                setPost(fetchedPost)
                setContent(fetchedPost.content)
                setPlatform(fetchedPost.platform)
                setScheduledTime(new Date(fetchedPost.scheduledTime).toISOString().slice(0, 16))
            } catch (error) {
                console.error('Error fetching post:', error)
            }
        }
        fetchPost()
    }, [postId])

    const handleSave = async (e) => {
        e.preventDefault()
        try {
            const updatedPost = await databases.updateDocument(
                '[DATABASE_ID]',
                '[SCHEDULED_POSTS_COLLECTION_ID]',
                postId,
                {
                    content,
                    platform,
                    scheduledTime: new Date(scheduledTime).toISOString()
                }
            )
            onSave(updatedPost)
        } catch (error) {
            console.error('Error updating post:', error)
        }
    }

    if (!post) return <div>Loading...</div>

    return (
        <form onSubmit={handleSave}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
}