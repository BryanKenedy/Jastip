import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import { CartContextProvider } from "@/components/CartContext";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ featuredProduct, newProducts }) {
  console.log({ newProducts });
  return (
    <div>
      <CartContextProvider>
        <Header />
        <Featured product={featuredProduct} />
        <NewProducts products={newProducts} />
        <Footer />
      </CartContextProvider>
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "646c6cd4399787879aae5f23";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}).sort({ _id: -1 }).limit(10);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
