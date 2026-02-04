import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { MongoClient, ObjectId } from "mongodb";

import { authOptions } from "../pages/api/auth/[...nextauth]";

const getMongoDb = async () => {
  const client = new MongoClient(process.env.DATABASE_URL || '');
  await client.connect();
  return { client, db: client.db('netflix') };
};

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const { client, db } = await getMongoDb();
  
  try {
    // Find user in MongoDB
    let currentUser = await db.collection('User').findOne({
      email: session.user.email
    });
    
    // Auto-create user if doesn't exist (from OAuth login)
    if (!currentUser) {
      const result = await db.collection('User').insertOne({
        _id: new ObjectId(),
        email: session.user.email,
        name: session.user.name || 'User',
        image: session.user.image || null,
        emailVerified: new Date(),
        hashedPassword: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        favoriteIds: []
      });
      currentUser = await db.collection('User').findOne({
        _id: result.insertedId
      });
    }

    // Convert ObjectId to string and ensure favoriteIds exists
    const formattedUser = {
      id: currentUser?._id?.toString() || '',
      email: currentUser?.email || '',
      name: currentUser?.name || 'User',
      image: currentUser?.image || null,
      emailVerified: currentUser?.emailVerified || null,
      createdAt: currentUser?.createdAt || new Date(),
      updatedAt: currentUser?.updatedAt || new Date(),
      favoriteIds: currentUser?.favoriteIds || [],
      hashedPassword: null
    };
    
    return { currentUser: formattedUser };
  } finally {
    await client.close();
  }
}

export default serverAuth;
