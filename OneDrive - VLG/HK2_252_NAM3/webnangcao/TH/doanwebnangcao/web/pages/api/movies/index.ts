import {NextApiRequest, NextApiResponse} from "next";
import { MongoClient } from "mongodb";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "GET"){
        return res.status(405).end();
    }
    try {
        // Movies endpoint doesn't need auth - public data
        
        // Fetch movies from MongoDB directly
        const dbUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/netflix';
        const client = new MongoClient(dbUrl, {
            connectTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });
        await client.connect();
        
        try {
            const db = client.db('netflix');
            const movies = await db.collection('Movie').find({}).toArray();
            
            // Format response to convert ObjectId to string
            const formattedMovies = movies.map((movie: any) => ({
                ...movie,
                id: movie._id.toString(),
                _id: undefined
            }));

            return res.status(200).json(formattedMovies);
        } finally {
            await client.close();
        }

    } catch (error) {
        console.error('[/api/movies] Error:', error);
        const msg = error instanceof Error ? error.message : 'Internal Server Error';
        const fullError = error instanceof Error ? error.stack : String(error);
        return res.status(500).json({ 
            error: msg,
            details: fullError,
            databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT SET'
        });
        
    }
}