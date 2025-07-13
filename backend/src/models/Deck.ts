import mongoose, { Document, Schema } from "mongoose";
import { CreateDeckDto } from "../dtos/deck.dto";

export interface IDeck extends Document, CreateDeckDto {
  createdAt: Date;
  updatedAt: Date;
}

const deckSchema = new Schema<IDeck>(
  {

  },
  {
    timestamps: true,
    collection: "deck",
  }
);

const Deck = mongoose.model<IDeck>("Deck", deckSchema);

export default Deck;
