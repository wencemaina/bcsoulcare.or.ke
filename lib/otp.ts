import { connectToDatabase } from "./mongodb";

export interface VerificationCode {
    email: string;
    code: string;
    expiresAt: Date;
    createdAt: Date;
}

export const generateOTP = (): string => {
    // Generate a 6-digit number as a string
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOTP = async (email: string, code: string) => {
    const db = await connectToDatabase();
    const collection = db.collection<VerificationCode>("verification_codes");

    // Ensure TTL index exists for expiresAt (expires after 0 seconds of that time)
    await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await collection.updateOne(
        { email },
        {
            $set: {
                code,
                expiresAt,
                createdAt: new Date(),
            },
        },
        { upsert: true }
    );
};

export const verifyOTP = async (email: string, code: string): Promise<boolean> => {
    const db = await connectToDatabase();
    const collection = db.collection<VerificationCode>("verification_codes");

    const record = await collection.findOne({
        email,
        code,
        expiresAt: { $gt: new Date() },
    });

    return !!record;
};

export const deleteOTP = async (email: string) => {
    const db = await connectToDatabase();
    const collection = db.collection<VerificationCode>("verification_codes");
    await collection.deleteOne({ email });
};
