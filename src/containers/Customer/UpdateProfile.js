import * as React from "react";

export default function UpdateProfile() {
  const [firstName, setFirstName] = React.useState("Sarath");
  const [lastName, setLastName] = React.useState("Alwis");
  const [email, setEmail] = React.useState("sarathalwis@gmail.com");
  const [address, setAddress] = React.useState("12/34, Galle Road, Weligama");
  const [contact, setContact] = React.useState("0767777768");
  const [city, setCity] = React.useState("Weligama");
  const [state, setState] = React.useState("Matara");

  const handleSubmit = () => {
    // Submit updated profile data to the API
    console.log({ firstName, lastName, email, address, contact, city, state });
  };

  return (
    <>
      <div className="flex flex-center justify-center bg-#a3a3a3">
        <div className="max-w-full w-[885px]">
          <div className="text-[20px] font-semibold text-black max-md:max-w-full items-center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                fontWeight: "bold",
                marginBottom: "10px",
                marginTop: "10px",
                backgroundColor: "#a3a3a3",
                width: "100%",
              }}
            >
              Update profile
            </div>
            {/*<div className="mt-6">Update profile</div>*/}
          </div>

          {/* First Name and Last Name */}
          <div className="text-[20px] mt-9 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-6/12 mt-6">
                <label className="font-semibold text-zinc-900 text-[15px]">
                  First Name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px]"
                />
              </div>
              <div className="flex flex-col w-6/12 mt-6">
                <label className="font-semibold text-zinc-900 text-[15px]">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px]"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col w-6/12 mt-6">
            <label className="font-semibold text-zinc-900">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col w-6/12 mt-6">
            <label className="font-semibold text-zinc-900">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
            />
          </div>

          {/* Contact Number */}
          <div className="mt-6">
            <label className="font-semibold text-zinc-900">
              Contact Number
            </label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px] w-full"
            />
          </div>

          {/* City and State */}
          <div className="flex gap-5 mt-6 max-md:flex-col">
            <div className="flex flex-col w-6/12">
              <label className="font-semibold text-zinc-900 text-[20px]">
                City
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px]"
              />
            </div>
            <div className="flex flex-col w-6/12">
              <label className="font-semibold text-zinc-900">District</label>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-2.5 px-4 py-3 border-2 rounded-md text-[22px]"
              />
            </div>
          </div>
          {/* Save and Cancel Buttons with Hover Effects */}
          <div className="flex gap-10 self-start mt-12 text-3xl whitespace-nowrap max-md:mt-10">
            <button className="px-12 py-3 text-blue-900 bg-white rounded-md border-2 border-blue-900 hover:bg-red-900 hover:text-white transition-colors duration-300">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-16 py-3 font-semibold text-white bg-blue-900 rounded-md hover:bg-red-900 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "90px" }}></div>
    </>
  );
}
