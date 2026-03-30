import { assertEquals } from "@std/assert";
import { Card, Rank, Suit } from "./cards.ts";

Deno.test("bigger card beats smaller card", () => {
  //Arrange
  const firstCard = new Card(Suit.Rosen, Rank.Sieben);
  const secondCard = new Card(Suit.Schellen, Rank.Sechs);

  //Act
  const result = firstCard.beats(secondCard);

  //Assert
  assertEquals(result, true);
});

Deno.test("smaller card does not beat bigger card", () => {
  //Arrange
  const firstCard = new Card(Suit.Rosen, Rank.Sechs);
  const secondCard = new Card(Suit.Schellen, Rank.Sieben);

  //Act
  const result = firstCard.beats(secondCard);

  //Assert
  assertEquals(result, false);
});

Deno.test("better suit card beats worse suit card", () => {
  //Arrange
  const firstCard = new Card(Suit.Schellen, Rank.Sechs);
  const secondCard = new Card(Suit.Rosen, Rank.Sechs);

  //Act
  const result = firstCard.beats(secondCard);

  //Assert
  assertEquals(result, true);
});

Deno.test("worse suit card does not beat better suit card", () => {
  //Arrange
  const firstCard = new Card(Suit.Rosen, Rank.Sechs);
  const secondCard = new Card(Suit.Schellen, Rank.Sechs);

  //Act
  const result = firstCard.beats(secondCard);

  //Assert
  assertEquals(result, false);
});