import * as mongoose from 'mongoose';

export const TransaccionSchema = new mongoose.Schema({
  method: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  result: { type: Object, required: true },
  date: { type: Date, default: Date.now },
});
