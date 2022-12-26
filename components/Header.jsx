import React from "react";
import Image from "next/image";
// import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import Search from "./Search";
import { Icon, SearchIcon } from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";

function Header() {
  return (
    <div className="px-8 py-8 bg-[#282C37]">
      <div className="flex justify-between">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={150}
            height={150}
            alt={"logo"}
          ></Image>
        </Link>
        <ul className="flex space-x-4 text-white flex-wrap">
          <Link href={"/"}>
            <li className="bg-[#2E343E] hover:bg-lime-500 hover:text-black px-4 py-2 rounded-md">
              Home
            </li>
          </Link>
          <Link href={"/"}>
            <li className="bg-[#2E343E] hover:bg-lime-500 hover:text-black px-4 py-2 rounded-md">
              Genre
            </li>
          </Link>
          <Link href={"/"}>
            <li className="bg-[#2E343E] hover:bg-lime-500 hover:text-black px-4 py-2 rounded-md">
              Country
            </li>
          </Link>
          <Link href={"/movie"}>
            <li className="bg-[#2E343E] hover:bg-lime-500 hover:text-black px-4 py-2 rounded-md">
              Movies
            </li>
          </Link>
          <Link href={"/tv"}>
            <li className="bg-[#2E343E] hover:bg-lime-500 hover:text-black px-4 py-2 rounded-md">
              TV
            </li>
          </Link>
          <Link href={"/top-imdb"}>
            <li className="bg-[#2E343E] hover:bg-lime-500 hover:text-black px-4 py-2 rounded-md">
              Top IMDb
            </li>
          </Link>
        </ul>
        <ul className="flex space-x-4 flex-wrap">
          <li>
            <Search />
          </li>
          <li className="pt-2">
            <a
              className="bg-[#2E343E] hover:bg-lime-500 hover:text-black px-4 py-2 rounded-md text-white"
              href="#"
            >
              <Icon className="mr-2" as={AiOutlineUser} />
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
