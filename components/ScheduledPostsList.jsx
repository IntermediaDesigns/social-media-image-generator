// components/ScheduledPostsList.js
import { useState, useEffect } from 'react'
import { databases } from '../utils/appwrite'
import PostEditor from './PostEditor'

export default function ScheduledPostsList() {
    const [posts, setPosts] = useState([])
    const [editingPostId, setEditingPostId] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await databases.listDocuments(
                '[DATABASE_ID]',
                '[SCHEDULED_POSTS_COLLECTION_ID]',
                [
                    databases.Query.equal('status', 'scheduled'),
                    databases.Query.orderAsc('scheduledTime')
                ]
            )
            setPosts(response.documents)
        } catch (error) {
            console.error('Error fetching posts:', error)
        }
    }

    const handleEdit = (postId) => {
        setEditingPostId(postId)
    }

    const handleSave = (updatedPost) => {
        setPosts(posts.map(post => post.$id === updatedPost.$id ? updatedPost : post))
        setEditingPostId(null)
    }

    const handleCancel = () => {
        setEditingPostId(null)
    }

    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await databases.deleteDocument(
                    '[DATABASE_ID]',
                    '[SCHEDULED_POSTS_COLLECTION_ID]',
                    postId
                )
                setPosts(posts.filter(post => post.$id !== postId))
            } catch (error) {
                console.error('Error deleting post:', error)
            }
        }
    }

    return (
        <div>
            <h2>Scheduled Posts</h2>
            {posts.map(post => (
                <div key={post.$id}>
                    {editingPostId === post.$id ? (
                        <PostEditor
                            postId={post.$id}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <div>
                            <p>{post.content}</p>
                            <p>Platform: {post.platform}</p>
                            <p>Scheduled for: {new Date(post.scheduledTime).toLocaleString()}</p>
                            <button onClick={() => handleEdit(post.$id)}>Edit</button>
                            <button onClick={() => handleDelete(post.$id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}