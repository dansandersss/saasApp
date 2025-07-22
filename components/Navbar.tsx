import React from "react";
import NavItems from "./NavItems";
import {
  SignIn,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="flex items-center gap-2.5 cursor-pointer">
        <Link href="/" className="cursor-pointer">
          <Image src="/images/converso.svg" alt="logo" width={46} height={44} />
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">Sign In</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            <UserButton />
            <SignOutButton>
              <button className="cursor-pointer hover:text-orange-500 transition-colors ease-in-out duration-200">
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
