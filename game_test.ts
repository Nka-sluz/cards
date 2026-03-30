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

Deno.test("playGame returns true", () => {
  const deck = new MockDeck([low, high]);
  const game = new Game(deck, () => "h");
  assertEquals(game.playGame(), true);
});

Deno.test("correct 'h' bet when next card is higher gives a point", () => {
  // low is played first, high is next → next beats played → "h" is correct
  const deck = new MockDeck([low, high]);
  let points = 0;
  const game = new Game(deck, () => "h");

  // Spy on console.log to count "Richtig!"
  const original = console.log;
  console.log = (...args: unknown[]) => {
    if (args[0] === "Richtig!") points++;
  };
  game.playGame();
  console.log = original;

  assertEquals(points, 1);
});

Deno.test("correct 't' bet when next card is lower gives a point", () => {
  // high is played first, low is next → next does NOT beat played → "t" is correct
  const deck = new MockDeck([high, low]);
  let points = 0;
  const game = new Game(deck, () => "t");

  const original = console.log;
  console.log = (...args: unknown[]) => {
    if (args[0] === "Richtig!") points++;
  };
  game.playGame();
  console.log = original;

  assertEquals(points, 1);
});

Deno.test("wrong bet gives no point", () => {
  // low is played first, high is next → "h" is correct, so "t" is wrong
  const deck = new MockDeck([low, high]);
  let points = 0;
  const game = new Game(deck, () => "t");

  const original = console.log;
  console.log = (...args: unknown[]) => {
    if (args[0] === "Richtig!") points++;
  };
  game.playGame();
  console.log = original;

  assertEquals(points, 0);
});

Deno.test("game runs once per card pair until deck is empty", () => {
  // 6 cards → 5 comparisons → promptFn called 5 times
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
  game.playGame();
  assertEquals(callCount, 5);
});

Deno.test("invalid input is re-prompted until valid", () => {
  const deck = new MockDeck([low, high]);
  const inputs = ["x", "foo", "h"]; // two invalid, then valid
  let callCount = 0;
  const game = new Game(deck, () => inputs[callCount++] ?? "h");

  game.playGame();

  assertEquals(callCount, 3);
});
