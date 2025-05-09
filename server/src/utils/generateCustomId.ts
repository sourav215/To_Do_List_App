import { CounterModel } from "../models/counter.model";

export const generateCustomId = async (): Promise<string> => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const counter = await CounterModel.findOneAndUpdate(
    {
      _id: "userCounter",
    },
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true }
  );

  const serialStr = String(counter.sequenceValue).padStart(4, "0");
  return `TDAPP${year}${month}${serialStr}`;
};
