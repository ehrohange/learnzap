import mongoose, { Document, Schema } from "mongoose";
import { CreateDeckDto } from "../dtos/CreateDeck.dto";

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

const User = mongoose.model<IDeck>("Deck", deckSchema);

export default User;
