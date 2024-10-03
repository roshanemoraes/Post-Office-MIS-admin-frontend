const ProfilePage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/4 px-4 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="account-settings text-center">
              <div className="user-avatar mb-4">
                <img
                  className="w-24 h-24 rounded-full mx-auto"
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="Maxwell Admin"
                />
              </div>
              <h5 className="text-lg font-semibold">Yuki Hayashi</h5>
              <h6 className="text-gray-500 text-sm">yuki@Maxwell.com</h6>
            </div>
            <div className="about mt-6">
              <h5 className="text-blue-500 mb-2">About</h5>
              <p className="text-gray-700 text-sm">
                I am a dedicated member of the postal service team, committed to
                ensuring efficient, reliable, and customer-focused operations.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h6 className="text-blue-500 mb-4">Personal Details</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter User Name"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="eMail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    readOnly
                    type="email"
                    id="eMail"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter email ID"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h6 className="text-blue-500 mb-4">Employee Details</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label
                    htmlFor="empId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Employee ID
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="v"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter Employee ID"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="dateJoined"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Joined
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="dateJoined"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter Date Joined"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="roles"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Roles
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="roles"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    placeholder="Enter Roles"
                  />
                </div>
              </div>
            </div>

            <div className="text-right">
              <button className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


