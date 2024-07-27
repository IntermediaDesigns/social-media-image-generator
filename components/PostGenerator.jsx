// components/PostGenerator.js
import { useState } from 'react'

export default function PostGenerator() {
    const [topic, setTopic] = useState('')
    const [tone, setTone] = useState('')
    const [keyPoints, setKeyPoints] = useState('')
    const [generatedPost, setGeneratedPost] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/api/generate-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                topic,
                brandGuidelines: { tone, keyPoints: keyPoints.split(',') }
            })
        })
        const data = await res.json()
        setGeneratedPost(data.post)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Topic"
            />
            <input
                type="text"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                placeholder="Tone"
            />
            <input
                type="text"
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                placeholder="Key Points (comma-separated)"
            />
            <button type="submit">Generate Post</button>
            {generatedPost && <div>{generatedPost}</div>}
        </form>
    )
}