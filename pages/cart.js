import Header from "@/components/Header";
import Center from "@/components/Center";
import { Input, Button, ChakraProvider } from "@chakra-ui/react";
import { CartContext } from "@/components/CartContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContextProvider } from "@/components/CartContext";
import { useRouter } from "next/router";
import Footer from "@/components/footer";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart, setIsSuccess]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <div className="bg-white shadow-md rounded-lg p-8 items-center text-center">
            <h1 className=" text-4xl font-bold">Thanks for your order!</h1>
            <p>We will contact you for the order details</p>
          </div>
        </Center>
      </>
    );
  }

  return (
    <>
      <CartContextProvider>
        <Header />
        <ChakraProvider>
          <Center>
            <div className="grid grid-cols-2 gap-10 mt-10">
              <div className="bg-white shadow-md rounded-lg p-8">
                <h2 className="text-lg py-4 font-medium">Cart</h2>
                {!cartProducts?.length && <div>Your Cart is empty</div>}
                {products?.length > 0 && (
                  <table className=" w-full  bg-white ">
                    <thead className=" bg-zinc-800 text-gray-200">
                      <tr className="">
                        <th className="  font-normal p-2 text-left">Product</th>
                        <th className=" font-normal text-left">Quantity</th>
                        <th className=" font-normal text-left"> Price</th>
                      </tr>
                    </thead>
                    <tbody className=" ">
                      {products.map((product) => (
                        <tr className="border-b border-zinc-100 " key={product.title}>
                          <td className="px-2 text-zinc-600 ">
                            <img className="max-h-24 max-w-full" src={product.images[0]} alt="" />

                            {product.title}
                          </td>
                          <td className="">
                            <button onClick={() => lessOfThisProduct(product._id)} className=" font-medium mx-2 text-center bg-zinc-200 rounded-md text-zinc-900 py-1 px-2">
                              -
                            </button>
                            {cartProducts.filter((id) => id === product._id).length}
                            <button onClick={() => moreOfThisProduct(product._id)} className=" mx-2 font-medium text-center bg-zinc-200 rounded-md text-zinc-900 py-1 px-2">
                              +
                            </button>
                          </td>
                          <td>${cartProducts.filter((id) => id === product._id).length * product.price}</td>
                        </tr>
                      ))}
                      <tr>
                        <td></td>
                        <td></td>
                        <td>${total}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
              {!!cartProducts?.length && (
                <div className="bg-white shadow-md rounded-lg p-8">
                  <h2 className="text-lg py-4 font-medium">Order info</h2>

                  <div className=" ">
                    <div className="grid grid-cols-1 gap-3">
                      <Input name="name" type="text" placeholder="Name" bg="#F4F4F4" value={name} onChange={(ev) => setName(ev.target.value)} />
                      <Input name="email" type="text" placeholder="Email" bg="#F4F4F4" value={email} onChange={(ev) => setEmail(ev.target.value)} />
                      <Input name="country" type="text" placeholder="Country" bg="#F4F4F4" value={country} onChange={(ev) => setCountry(ev.target.value)} />
                      <div className=" flex gap-2">
                        <Input name="city" type="text" placeholder="City" bg="#F4F4F4" value={city} onChange={(ev) => setCity(ev.target.value)} />
                        <Input name="postalCode" type="text" placeholder="Postal Code " bg="#F4F4F4" value={postalCode} onChange={(ev) => setPostalCode(ev.target.value)} />
                      </div>

                      <Input name="streetAddress" type="text" placeholder="Street Address" bg="#F4F4F4" value={streetAddress} onChange={(ev) => setStreetAddress(ev.target.value)} />
                    </div>

                    <Button onClick={goToPayment} type="submit" mt={4} backgroundColor="#1A1715" color="white" px={2} py={1} rounded="md" w="full" _hover={{ backgroundColor: "gray", color: "black" }}>
                      Continue to payment
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Center>
        </ChakraProvider>
      </CartContextProvider>
      <Footer />
    </>
  );
}
