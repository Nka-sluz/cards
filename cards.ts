export class Card {
    constructor(public suit: Suit, public rank: Rank) {}

    public beats(other: Card) {
      if (this.rank > other.rank) {
        return true;
      }
      else if (this.rank == other.rank) {
        if (this.suit > other.suit) {
          return true;
        }
      }
      return false;
    }
}

export enum Suit {
    Rosen = 1,
    Schellen = 2,
    Schilten = 2,
    Eicheln = 3
}

export enum Rank {
    Sechs = 6,
    Sieben = 7,
    Acht = 8,
    Neun = 9,
    Banner = 10,
    Under = 11,
    Ober = 12,
    König = 13,
    Ass = 14
}