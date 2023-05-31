import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ products }) {
  return (
    <Center>
      <div className="my-6 text-3xl font-medium text-zinc-700">Latest Products</div>
      <div className="gap-5 py-5 grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        <ProductsGrid products={products} />
      </div>
    </Center>
  );
}
