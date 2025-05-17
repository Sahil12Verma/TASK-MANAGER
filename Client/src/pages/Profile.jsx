import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <section className="px-4 py-8 bg-[#292928] h-screen mt-16">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-4">
            <div className="text-center">
              <img
                className="h-24 w-24 rounded-full mx-auto"
                src="https://source.unsplash.com/random"
                alt="Profile Picture"
              />
              <h1 className="text-xl font-semibold mt-2">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-gray-600 mt-2">{user?.email}</p>
            </div>
            <div className="mt-8">
              <p className="text-gray-700">User ID: {user?._id}</p>
              <p className="text-gray-700">Password: ********</p>
              <p className="text-gray-700">
                Your token for the next 3 hours: {user?.token}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
