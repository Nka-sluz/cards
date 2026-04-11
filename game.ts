import { Card, Rank, Suit } from "./cards.ts";
import { Deck } from "./deck.ts";

export class Game {
  private playedCard: Card | null = null;
  private nextCard: Card | null = null;
  private deck: Deck;
  private bet: string | null = null;
  private balance: number = 0;

  constructor(
    private injectedDeck?: Deck,
    private promptFn: (msg: string) => string | null = (msg) => prompt(msg),
    startingBalance?: number
  ) {
    this.deck = injectedDeck ?? new Deck();
    this.balance = startingBalance ?? 1.0;
  }

  public playGame(): number {
    this.setStartingValues();
    while (this.deck.getUnplayedCount() > 0 && this.balance > 0) {
      console.clear();
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
            this.changeBalance(0.1);
          } else {
            console.log("Falsch");
          }
          this.playedCard = this.nextCard;
        }
        this.promptFn("Drücke Enter um fortzufahren...");
      }
    }
    console.log(`Spiel beendet. Geld: ${this.balance.toFixed(2)}`);
    return this.balance;
  }

  private setStartingValues() {
    this.playedCard = null;
    this.nextCard = null;
    if (this.balance <= 0) {
      this.balance = 1.0;
    }
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
        if (this.playedCard) this.showCard(this.playedCard);
        console.log("Bitte entweder 'h' oder 't' eingeben");
      }
    }
    this.changeBalance(-0.05);
  }

  private changeBalance(amount: number) {
    this.balance += amount;
    if (this.balance <= 0) {
      this.balance = 0;
      console.log("Du hast kein Geld mehr. Spiel vorbei.");
    }
  }
}
