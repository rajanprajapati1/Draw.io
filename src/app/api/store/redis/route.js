import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN, 
});

export async function POST(request) {
    try {
        const { diagramData } = await request.json();

        if (!diagramData) {
            return NextResponse.json(
                { error: "Prompt and diagramData are required" },
                { status: 400 }
            );
        }

        const key = `diagram:${prompt}`;

        const scene = {
      
            output: diagramData,
            createdAt: new Date().toISOString(),
        };

        await redis.set(key, JSON.stringify(scene), { ex: 3600 });

        console.log(`Stored diagram for prompt: ${prompt}`);

        return NextResponse.json({
            message: "Diagram stored successfully",
            key,
            data: scene,
        });
    } catch (error) {
        console.error("Error storing in Redis:", error);
        return NextResponse.json(
            { error: "Failed to store diagram" },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const prompt = searchParams.get("prompt");

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required in query parameters" },
                { status: 400 }
            );
        }

        const key = `diagram:${prompt}`;

        const storedData = await redis.get(key);

        if (!storedData) {
            return NextResponse.json(
                { message: "No diagram found for this prompt" },
                { status: 404 }
            );
        }

        const scene = JSON.parse(storedData);

        console.log(`Retrieved diagram for prompt: ${prompt}`);

        return NextResponse.json({
            message: "Diagram retrieved successfully",
            key,
            data: scene,
        });
    } catch (error) {
        console.error("Error retrieving from Redis:", error);
        return NextResponse.json(
            { error: "Failed to retrieve diagram" },
            { status: 500 }
        );
    }
}