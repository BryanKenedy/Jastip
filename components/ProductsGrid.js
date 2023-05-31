import ProductBox from "./ProductBox";

export default function ProductsGrid({ products }) {
  return (
    <div style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }} className=" grid grid-cols-5 gap-5">
      {products?.length > 0 && products.map((product) => <ProductBox key={product._id} {...product} />)}
    </div>
  );
}
