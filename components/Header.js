import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/client";
import React, { useRef } from "react";

function Header() {
    const [session] = useSession();
    const searchInput = useRef(null);

    function handleFocus() {
        searchInput.current.focus();
    }

    return (
        <header className="backdrop-blur sticky top-0 z-10 flex items-center px-4 py-2 shadow-sm">
            <div className="flex items-center flex-1">
                <Button
                    color="gray"
                    buttonType="outline"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className="hidden md:inline-flex h-14 w-14 border-0"
                >
                    <Icon name="menu" size="3xl" color="gray" />
                </Button>
                <Button
                    color="gray"
                    buttonType="outline"
                    iconOnly={true}
                    ripple="dark"
                    className="border-0 h-18"
                >
                    <Icon name="description" size="5xl" color="blue"></Icon>
                </Button>
                <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl mr-auto ">
                    Docsh
                </h1>
            </div>
            <div
                className="flex-1 max-w-3xl overflow-hidden flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-800 focus-within:shadow-lg hover:shadow-lg transition-all"
                onClick={handleFocus}
            >
                <Icon name="search" size="3xl" color="gray" />
                <input
                    type="text"
                    placeholder="Search"
                    className="flex-grow px-5 text-base bg-transparent outline-none"
                    ref={searchInput}
                />
            </div>
            <div className="flex items-center flex-1">
                <Button
                    color="gray"
                    buttonType="outline"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className="hidden md:inline-flex ml-auto h-14 w-14 border-0"
                >
                    <Icon name="apps" size="3xl" color="gray" />
                </Button>
                <Button
                    color="gray"
                    buttonType="outline"
                    iconOnly={true}
                    rounded={true}
                    ripple="dark"
                    className="ml-auto md:ml-2 border-0 h-14"
                >
                    <img
                        onClick={signOut}
                        loading="lazy"
                        src={session?.user?.image}
                        alt=""
                        className="cursor-pointer rounded-full"
                    />
                </Button>
            </div>
        </header>
    );
}

export default Header;
