import { assertEquals } from "@std/assert";
import { Deck } from "./deck.ts";
import { Rank, Suit } from "./cards.ts";

Deno.test("deck contains 36 cards", () => {
  const deck = new Deck();
  assertEquals(deck.getUnplayedCount(), 36);
  assertEquals(deck.getPlayedCount(), 0);
});

Deno.test("play removes card from unplayed", () => {
  const deck = new Deck();
  deck.play();
  assertEquals(deck.getUnplayedCount(), 35);
  assertEquals(deck.getPlayedCount(), 1);
});

Deno.test("play returns undefined when deck empty", () => {
  const deck = new Deck();
  for (let i = 0; i < 36; i++) deck.play();
  assertEquals(deck.play(), undefined);
});

Deno.test("reset restores deck", () => {
  const deck = new Deck();
  for (let i = 0; i < 10; i++) deck.play();
  deck.reset();
  assertEquals(deck.getUnplayedCount(), 36);
  assertEquals(deck.getPlayedCount(), 0);
});
