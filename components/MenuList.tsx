import Link from "next/link";
import menuData from "../utils/menuData.json";
import { useRouter } from 'next/router';

const MenuList: React.FC = () => {
    const router = useRouter();
    const renderMenus = menuData.map((item, index) => {
        const prefix = router.pathname.split('/')[1];
        return (
            <Link
                key={index}
                href={item.url}
                className={`first-letter:group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-white  ${(router.pathname === item.url) || (prefix == item.prefix)? 'bg-cyan-800' : ''} focus:outline-none transition ease-in-out duration-150 hover:text-white hover:bg-cyan-600`}>
                <svg
                    className="mr-4 h-6 w-6 text-cyan-100 group-hover:text-white group-focus:text-cyan-100 transition ease-in-out duration-150"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    {<path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.svgPath} />}
                </svg>
                {item.title}
            </Link>
        );
    });
    return (
        <>
            {renderMenus}
        </>
    );
}

export default MenuList;