import { assertEquals } from "@std/assert/equals";
import { Game } from "./game.ts";

Deno.test("game test", () => {
    //Arrange
    const game = new Game();

    //Act
    const result = game.playGame();

    //Assert
    assertEquals(result, true)
})