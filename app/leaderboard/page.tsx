'use client';

import { Button } from "@/components/ui/button";
import { Leaderboard } from "@/components/features/game";
import { ArrowLeft, Keyboard } from "lucide-react";
import Link from "next/link";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-supatyper-background via-supatyper-backgroundAlt to-supatyper-backgroundLight">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <Keyboard className="h-8 w-8 mr-2 text-supatyper-brightBlue" />
            <h1 className="text-4xl font-bold text-supatyper-darkBrown">
              SupaTyper Leaderboard
            </h1>
          </div>
          <p className="text-supatyper-oliveBrown max-w-lg mx-auto">
            See how you rank against other typists
          </p>
        </header>

        <div className="max-w-md mx-auto mb-8 flex justify-center">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Game
            </Button>
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
