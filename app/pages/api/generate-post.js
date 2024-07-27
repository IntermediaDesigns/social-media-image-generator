// pages/api/generate-post.js
import { NextApiRequest, NextApiResponse } from 'next'
import { Client, Databases } from 'appwrite'
import { HfInference } from '@huggingface/inference'

const client = new Client()
    .setEndpoint('https://[HOSTNAME]/v1')
    .setProject('[PROJECT_ID]')

const databases = new Databases(client)

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { topic, brandGuidelines } = req.body

        try {
            // Generate post using Hugging Face API
            const prompt = `Create a social media post about ${topic} that is ${brandGuidelines.tone} and mentions ${brandGuidelines.keyPoints.join(', ')}`
            
            const response = await hf.textGeneration({
                model: 'gpt2',  // or any other suitable model
                inputs: prompt,
                parameters: {
                    max_new_tokens: 280,
                    temperature: 0.7,
                    top_p: 0.95,
                }
            })

            const generatedPost = response.generated_text

            // Store post in Appwrite database
            const result = await databases.createDocument(
                '[DATABASE_ID]',
                '[COLLECTION_ID]',
                'unique()',
                { content: generatedPost, topic, brandGuidelines }
            )

            res.status(200).json({ post: generatedPost, id: result.$id })
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate post' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}