import { Card, Suit, Rank } from "./cards.ts";

export class Deck {
    private unplayed: Card[];
    private played: Card[] = [];

    constructor() {
        this.unplayed = this.createAllCards();
        this.shuffle();
    }

    private createAllCards(): Card[] {
        const cards: Card[] = [];
        const suits = Object.keys(Suit).filter(k => typeof Suit[k as keyof typeof Suit] === "number") as (keyof typeof Suit)[];
        const ranks = Object.keys(Rank).filter(k => typeof Rank[k as keyof typeof Rank] === "number") as (keyof typeof Rank)[];

        for (const suitKey of suits) {
            for (const rankKey of ranks) {
                cards.push(new Card(Suit[suitKey], Rank[rankKey]));
            }
        }
        return cards;
    }

    shuffle(): void {
        for (let i = this.unplayed.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.unplayed[i], this.unplayed[j]] = [this.unplayed[j], this.unplayed[i]];
        }
    }

    play(): Card | null {
        if (this.unplayed.length === 0) return null;
        const card = this.unplayed.pop()!;
        this.played.push(card);
        return card;
    }

    getUnplayedCount(): number {
        return this.unplayed.length;
    }

    getPlayedCount(): number {
        return this.played.length;
    }

    reset(): void {
        this.unplayed = this.createAllCards();
        this.played = [];
        this.shuffle();
    }
}
