import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import serverAuth from "../../libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    if (!currentUser?.favoriteIds || currentUser.favoriteIds.length === 0) {
      return res.status(200).json([]);
    }

    const client = new MongoClient(process.env.DATABASE_URL || '');
    await client.connect();
    
    try {
      const db = client.db('netflix');
      
      // Convert favoriteIds strings to ObjectId
      const favoriteObjectIds = currentUser.favoriteIds.map((id: string) => 
        ObjectId.isValid(id) ? new ObjectId(id) : id
      );

      const favoritedMovies = await db.collection('Movie').find({
        _id: { $in: favoriteObjectIds }
      }).toArray();

      // Format response to convert ObjectId to string
      const formattedMovies = favoritedMovies.map((movie: any) => ({
        ...movie,
        id: movie._id.toString(),
        _id: undefined
      }));

      return res.status(200).json(formattedMovies);
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('[/api/favorites] Error:', error);
    const msg = error instanceof Error ? error.message : 'Internal Server Error';
    return res.status(500).json({ error: msg });
  }
}
