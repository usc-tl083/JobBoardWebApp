import { Button, Dropdown, DropdownItem, Transition } from "@windmill/react-ui";
import { useUser } from "context/UserContext";
import { useState } from "react";
import { LogOut, FileText, User } from "react-feather";
import { Link } from "react-router-dom";

const Nav = () => {
    const { isLoggedIn, userData, logout } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-2 lg:px-36 py-2 shadow-lg fixed w-full bg-white top-0 z-10">
            <Link to="/" className="text-gray-700 text-2xl font-bold dark:text-gray-400">
                <h1>JOB BOARD</h1>
            </Link>
            <ul className="flex space-x-4">
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to="/login">
                                <Button layout="link">
                                    <span>Login</span>
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button layout="link">
                                    <span>Sign up</span>
                                </Button>
                            </Link>
                        </li>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/applications">
                                <Button layout="link">
                                    <span className="lg:block hidden">Applications</span>
                                    <FileText className="lg:hidden" />
                                </Button>
                            </Link>
                            <Link to="/profile">
                                <Button layout="link">
                                    <span className="lg:block hidden">Profile</span>
                                    <User className="lg:hidden" />
                                </Button>
                            </Link>
                        </li>
                        <li className="relative">
                            <Button layout="link" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <span className="lg:block hidden">Account</span>
                                <LogOut className="lg:hidden" />
                            </Button>
                            <Transition
                                show={isDropdownOpen}
                                enter="transition ease-out duration-150 transform"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="transition ease-in duration-75 transform"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dropdown align="right" isOpen={isDropdownOpen} className="z-10">
                                    <DropdownItem className="cursor-not-allowed text-gray-400 border-b flex flex-col items-start justify-start">
                                        <p className="self-start">{userData?.fullname?.split(" ").join(" ")}</p>
                                        <p className="self-start">@{userData?.username}</p>
                                    </DropdownItem>
                                    <DropdownItem tag="a" className="border-t">
                                        <Link className="w-full" onClick={() => logout()} to="/login">
                                            <Button iconRight={LogOut} block>
                                                Logout
                                            </Button>
                                        </Link>
                                    </DropdownItem>
                                </Dropdown>
                            </Transition>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Nav;
