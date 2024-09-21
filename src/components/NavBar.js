import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import personIcon from "./person-circle.svg";
import NotificationMenu from "./NotificationMenu";
import { Link, useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

const notifications = [
  { id: 1, message: "You have a new message." },
  { id: 2, message: "Your order has been shipped." },
  { id: 3, message: "Update available for your app." },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ role }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <Disclosure
      as="nav"
      className="bg-slate-100 "
      style={{ marginTop: "5px", marginBottom: "5px" }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-start">
                <div className="flex-1">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex">
                      <span style={{ fontWeight: "bold" }}>
                        POST OFFICE MIS
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="hidden sm:block"
                    style={{ textAlign: "center" }}
                  >
                    <span>NEGOMBO PO</span>
                  </div>
                </div>
                <div className="flex-1">{/* Right aligned items if any */}</div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
                <NotificationMenu notifications={notifications} />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-100">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={personIcon}
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      {({ focus }) => {
                        return (
                          <Link
                            to={`/admin/${role}/profile`}
                            className={classNames(
                              focus ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 no-underline"
                            )}
                          >
                            <i className="bx bxs-user mr-[8px]"></i>
                            Your Profile
                          </Link>
                        );
                      }}
                    </MenuItem>

                    <MenuItem>
                      {({ focus }) => (
                        <Link
                          to="/admin/login"
                          onClick={handleSignOut}
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 no-underline"
                          )}
                        >
                          <i className="bx bx-log-out mr-[8px]"></i>
                          Sign out
                        </Link>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
