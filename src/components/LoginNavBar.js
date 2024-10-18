import React from "react";
import { Disclosure } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LoginNavBar() {
  return (
    <Disclosure
      as="nav"
      className="bg-slate-100"
      style={{ marginTop: "5px", marginBottom: "5px" }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-10 items-center justify-between">
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
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
