export default function Settings() {
  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-2 bg-[#111115] p-1 rounded-lg w-fit mb-6">

        <button className="px-4 py-1.5 bg-purple-600 rounded-md">
          Profile
        </button>

        <button className="px-4 py-1.5 text-gray-400">
          Account
        </button>

        <button className="px-4 py-1.5 text-gray-400">
          Notifications
        </button>

        <button className="px-4 py-1.5 text-gray-400">
          Appearance
        </button>

        <button className="px-4 py-1.5 text-gray-400">
          Privacy
        </button>

        <button className="px-4 py-1.5 text-gray-400">
          Billing
        </button>

      </div>

      {/* PROFILE CARD */}
      <div className="bg-[#1a1a1f] border border-gray-800 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-1">
          Profile Information
        </h2>

        <p className="text-gray-400 mb-6">
          Update your profile information and public details
        </p>

        <div className="flex gap-8">

          {/* AVATAR */}
          <div className="flex flex-col items-center gap-4">

            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>

            <button className="border border-gray-700 px-4 py-2 rounded-lg text-sm">
              Change Photo
            </button>

          </div>

          {/* FORM */}
          <div className="flex-1 grid grid-cols-2 gap-4">

            {/* FIRST NAME */}
            <div>
              <label className="text-sm text-gray-400">
                First Name
              </label>

              <input
                defaultValue="John"
                className="w-full mt-1 bg-[#111115] border border-gray-700 rounded-lg px-3 py-2"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="text-sm text-gray-400">
                Last Name
              </label>

              <input
                defaultValue="Doe"
                className="w-full mt-1 bg-[#111115] border border-gray-700 rounded-lg px-3 py-2"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm text-gray-400">
                Email
              </label>

              <input
                defaultValue="johndoe@gmail.com"
                className="w-full mt-1 bg-[#111115] border border-gray-700 rounded-lg px-3 py-2"
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="text-sm text-gray-400">
                Role
              </label>

              <input
                defaultValue="Teacher"
                className="w-full mt-1 bg-[#111115] border border-gray-700 rounded-lg px-3 py-2"
              />
            </div>

            {/* BIO */}
            <div className="col-span-2">
              <label className="text-sm text-gray-400">
                Bio
              </label>

              <textarea
                rows="3"
                defaultValue="Science teacher with 10+ years of experience. Passionate about making learning fun and engaging through interactive quizzes"
                className="w-full mt-1 bg-[#111115] border border-gray-700 rounded-lg px-3 py-2"
              />
            </div>

          </div>

        </div>

        {/* SAVE BUTTON */}
        <div className="flex justify-end mt-6">
          <button className="bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>

      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-sm mt-6">
        Need help with your account settings? 
        <span className="text-purple-400 ml-1">
          Contact Support
        </span>
      </div>

    </div>
  );
}