import React from "react";
import { useRouter } from "next/router";

interface NavbarItemProps {
    label: string;
}
const NavbarItem: React.FC<NavbarItemProps> = ({label}) => {
    const router = useRouter();

    const handleClick = () => {
        const routes: { [key: string]: string } = {
            "Home": "/",
            "Series": "/browse/series",
            "Films": "/browse/films",
            "New & Popular": "/browse/new",
            "My List": "/my-list",
            "Browse by Languages": "/browse/languages",
        };

        const route = routes[label] || "/";
        router.push(route);
    };

    return (
        <div 
            onClick={handleClick}
            className="
                text-white cursor-pointer hover:text-gray-300 transition
            "
        >
           {label}
        </div>
    )
}

export default NavbarItem