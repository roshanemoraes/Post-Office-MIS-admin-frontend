import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";
import { BellIcon } from "@heroicons/react/24/outline";

const NotificationMenu = ({ notifications }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-100">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open notifications menu</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <MenuItem key={index}>
              {({ focus }) => (
                <div
                  className={classNames(
                    focus ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700 no-underline"
                  )}
                >
                  {notification.message}
                </div>
              )}
            </MenuItem>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-700">
            No new notifications
          </div>
        )}
      </MenuItems>
    </Menu>
  );
};

export default NotificationMenu;
