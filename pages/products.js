import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/footer";
export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <h1 className=" my-5 text-xl font-medium">All products</h1>
        <ProductsGrid products={products} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
