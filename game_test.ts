import { assertEquals } from "@std/assert";
import { Card, Rank, Suit } from "./cards.ts";
import { Deck } from "./deck.ts";
import { Game } from "./game.ts";

class MockDeck extends Deck {
  private cards: Card[];
  private index = 0;

  constructor(cards: Card[]) {
    super();
    this.cards = cards;
  }

  override shuffle(): void {}

  override play(): Card | null {
    if (this.index >= this.cards.length) return null;
    return this.cards[this.index++];
  }

  override getUnplayedCount(): number {
    return this.cards.length - this.index;
  }
}

const low = new Card(Suit.Rosen, Rank.Sechs);
const high = new Card(Suit.Eicheln, Rank.Ass);

Deno.test("correct 'h' bet when next card is higher gives a plus 0.05 to balance", () => {
  // Arrange
  const deck = new MockDeck([low, high]);
  const game = new Game(deck, () => "h");
  
  // Act
  const balance = game.playGame();

  // Assert
  assertEquals(balance, 1.05)
});

Deno.test("correct 't' bet when next card is lower gives a plus 0.05 to balance", () => {
  // Arrange
  const deck = new MockDeck([high, low]);
  const game = new Game(deck, () => "t");
  
  // Act
  const balance = game.playGame();

  // Assert
  assertEquals(balance, 1.05)
});

Deno.test("wrong bet results in losing 0.05 from balance", () => {
  // Arrange
  const deck = new MockDeck([low, high]);
  const game = new Game(deck, () => "t");
  
  // Act
  const balance = game.playGame();

  // Assert
  assertEquals(balance, 0.95)
});

Deno.test("game runs once per card pair until deck is empty", () => {
  // Arrange
  const cards = [
    new Card(Suit.Rosen, Rank.Sechs),
    new Card(Suit.Rosen, Rank.Sieben),
    new Card(Suit.Rosen, Rank.Acht),
    new Card(Suit.Rosen, Rank.Neun),
    new Card(Suit.Rosen, Rank.Banner),
    new Card(Suit.Rosen, Rank.Under),
  ];
  const deck = new MockDeck(cards);
  let callCount = 0;
  const game = new Game(deck, () => {
    callCount++;
    return "h";
  });

  // Act
  game.playGame();

  // Assert
  assertEquals(callCount, 5 * 2); // 5 pairs, each requires a bet and an enter
});

Deno.test("invalid input is re-prompted until valid", () => {
  // Arrange
  const deck = new MockDeck([low, high]);
  const inputs = ["x", "skip", "foo", "skip", "h", "skip"]; // two invalid, then valid + skips for enters
  let callCount = 0;
  const game = new Game(deck, () => inputs[callCount++] ?? "h");

  // Act
  game.playGame();

  // Assert
  assertEquals(callCount, 6);
});

Deno.test("game runs once per card pair until balance is 0", () => {
  // Arrange
  const cards = [
    new Card(Suit.Rosen, Rank.Sechs),
    new Card(Suit.Rosen, Rank.Sieben),
    new Card(Suit.Rosen, Rank.Acht),
    new Card(Suit.Rosen, Rank.Neun),
    new Card(Suit.Rosen, Rank.Banner),
    new Card(Suit.Rosen, Rank.Under),
  ];
  const deck = new MockDeck(cards);
  const game = new Game(deck, () => "t", 0.1);

  // Act
  const balance = game.playGame();

  // Assert
  assertEquals(balance, 0);
});
