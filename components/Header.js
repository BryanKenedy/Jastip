import { useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { ChakraProvider, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Center from "./Center";
import { CartContext } from "./CartContext";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [showNav, setShowNav] = useState(false);

  const handleNavToggle = () => {
    setShowNav(!showNav);
  };

  return (
    <ChakraProvider>
      <header className="sticky bg-zinc-800 text-white z-50">
        <Center>
          <div className="relative flex justify-between py-5">
            <Link className="text-lg font-medium items-center" href={"/"}>
              Jastip
            </Link>

            {/* <InputGroup maxW="md" display={{ base: "none", md: "flex" }}>
              <Input bg="white" placeholder="Search..." />
              <InputRightElement>
                <SearchIcon color="gray.300" />
              </InputRightElement>
            </InputGroup> */}

            <nav
              className={`absolute top-full left-0 right-0 bg-zinc-500 md:bg-zinc-800 text-white flex flex-col gap-4 p-4 md:p-0 md:relative md:flex md:justify-between md:items-center md:flex-row md:gap-4 ${
                showNav ? "flex" : "hidden"
              }`}
            >
              <Link href={"/"}>Home</Link>
              <Link href={"/products"}>All Products</Link>

              <Link href={"/account"}>Account</Link>
              <Link href={"/cart"}>Cart ({cartProducts.length})</Link>
            </nav>
            <div className="md:hidden">
              <FaBars onClick={handleNavToggle} className="cursor-pointer" />
            </div>
          </div>
        </Center>
      </header>
    </ChakraProvider>
  );
}
