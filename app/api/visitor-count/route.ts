import { NextResponse } from "next/server";

// Simple in-memory counter (in production, use a database)
let visitorCount = 12547;

export async function GET() {
  visitorCount += Math.floor(Math.random() * 3) + 1; // Simulate visits
  return NextResponse.json({ count: visitorCount });
}
