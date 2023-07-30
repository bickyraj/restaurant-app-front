import Link from "next/link";
import MenuList from "./MenuList";

export default function Sidebar() {
    return (
        <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64">
                {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
                <div className="flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <h1 className="font-bold italic text-lg text-cyan-50">Codefly</h1>
                        {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/v1/easywire-logo-on-brand.svg" alt="Easywire logo" /> */}
                    </div>
                    <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
                        <div className="overflow-y-auto">
                            <nav className="px-2 space-y-1">
                                <MenuList/>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}