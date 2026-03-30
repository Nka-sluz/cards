import { Card, Rank, Suit } from "./cards.ts";
import { Deck } from "./deck.ts";

export class Game {
  private playedCard: Card | null = null;
  private nextCard: Card | null = null;
  private points: number = 0;
  private deck: Deck;
  private bet: string | null = null;

  constructor(
    private injectedDeck?: Deck,
    private promptFn: (msg: string) => string | null = (msg) => prompt(msg),
  ) {
    this.deck = injectedDeck ?? new Deck();
  }

  public playGame(): boolean {
    this.setStartingValues();
    while (this.deck.getUnplayedCount() > 0) {
      this.playedCard = this.nextCard ?? this.deck.play();
      if (this.playedCard) {
        this.showCard(this.playedCard);
        this.bet = null;
        this.getBet();
        this.nextCard = this.deck.play();
        if (this.nextCard) {
          this.showCard(this.nextCard);
          const isHigher = this.nextCard.beats(this.playedCard);
          if (
            (this.bet === "h" && isHigher) ||
            (this.bet === "t" && !isHigher)
          ) {
            console.log("Richtig!");
            this.points++;
          } else {
            console.log("Falsch");
          }
          this.playedCard = this.nextCard;
        }
      }
    }
    console.log(`Spiel beendet. Punkte: ${this.points}`);
    return true;
  }

  private setStartingValues() {
    this.playedCard = null;
    this.nextCard = null;
    this.points = 0;
    if (this.injectedDeck) {
      this.deck = this.injectedDeck;
      this.deck.shuffle();
    } else {
      this.deck = new Deck();
    }
    this.bet = null;
  }

  private showCard(card: Card) {
    console.log(`Gespielte Karte: ${Rank[card.rank]} of ${Suit[card.suit]}`);
  }

  private getBet() {
    while (this.bet !== "h" && this.bet !== "t") {
      this.bet = this.promptFn(
        "Wird die nächste Karte höher(h) oder tiefer(t)?",
      );
      if (this.bet !== "h" && this.bet !== "t") {
        console.clear();
        if (this.playedCard) this.showCard(this.playedCard);
        console.log("Bitte entweder 'h' oder 't' eingeben");
      }
    }
  }
}
