import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const ids = req.body.ids;
  const products = await Product.find({ _id: { $in: ids } });
  res.json(products);
}
