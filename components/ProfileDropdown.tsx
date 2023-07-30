import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
}

export default function ProfileDropdown({ label }: Props) {
  const { logout } = useAuthContext();
  const router = useRouter();
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [showHideDropdown, setShowHideDropdown] = useState("hidden");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add event listener to document when component is mounted
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener from document when component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  }

  /**
   Alert if clicked on outside of element
   */
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsToggleOn(false);
    }
  }

  return (
    <div ref={ref} className="ml-3 relative">
      <div>
        <button onClick={() => setIsToggleOn(!isToggleOn)} className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:bg-gray-100 lg:p-2 lg:rounded-md lg:hover:bg-gray-100" id="user-menu" aria-label="User menu" aria-haspopup="true">
          <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="test" />
          <p className="hidden ml-3 text-cool-gray-700 text-sm leading-5 font-medium lg:block">{label}</p>
          {/* <!-- Heroicon name: chevron-down --> */}
          <svg className="hidden flex-shrink-0 ml-1 h-5 w-5 text-cool-gray-400 lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${!isToggleOn ? showHideDropdown : ""}`}>
        <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          <Link href="/" role="menuitem" className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150">Your Profile</Link>
          <Link href="/settings" className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Settings</Link>
          <Link href="" onClick={handleLogout} passHref className="block px-4 py-2 text-sm text-cool-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" role="menuitem">Logout</Link>
        </div>
      </div>
    </div>
  );
}