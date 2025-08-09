import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { SignedIn, UserButton } from "@clerk/nextjs";
import DashboardBtn from "./DashboardBtn";

function Navbar() {
  return (
    <nav className="border-b dark:border-neutral-800">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* LEFT SIDE - CREATIVE VH LOGO WITH TEXT */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          {/* Creative VH Logo */}
          <span className="relative flex h-8 w-8 items-center justify-center font-extrabold text-white text-2xl">
            <span className="absolute h-8 w-4 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-lg transform skew-x-[20deg] left-0 top-0"></span>
            <span className="absolute h-8 w-4 bg-gradient-to-l from-indigo-500 to-purple-400 rounded-lg transform skew-x-[-20deg] right-0 top-0"></span>
          </span>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-500 dark:from-indigo-500 dark:to-purple-400 bg-clip-text text-transparent">
            VirtueHire
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-4 ml-auto">
            <DashboardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;