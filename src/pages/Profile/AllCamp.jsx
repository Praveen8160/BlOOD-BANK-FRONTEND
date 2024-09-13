import React, { useState } from "react";
function AllCamp() {
  const mockCamps = [
    {
      id: 1,
      name: "Summer Blood Drive",
      date: "2023-07-15",
      location: "Central Park",
      state: "New York",
      district: "Manhattan",
      members: [
        { id: 1, name: "John Doe", bloodType: "A+" },
        { id: 2, name: "Jane Smith", bloodType: "O-" },
        { id: 3, name: "Mike Johnson", bloodType: "B+" },
      ],
    },
    {
      id: 2,
      name: "Community Health Fair",
      date: "2023-08-22",
      location: "City Hall",
      state: "California",
      district: "Los Angeles",
      members: [
        { id: 4, name: "Emily Brown", bloodType: "AB+" },
        { id: 5, name: "David Wilson", bloodType: "A-" },
      ],
    },
    {
      id: 3,
      name: "University Donation Event",
      date: "2023-09-10",
      location: "State University Campus",
      state: "Texas",
      district: "Austin",
      members: [
        { id: 6, name: "Sarah Davis", bloodType: "O+" },
        { id: 7, name: "Tom Anderson", bloodType: "B-" },
        { id: 8, name: "Lisa Martinez", bloodType: "A+" },
        { id: 9, name: "Chris Taylor", bloodType: "AB-" },
      ],
    },
    
  ];
  const [expandedCamp, setExpandedCamp] = useState(null);

  const toggleCamp = (campId) => {
    setExpandedCamp(expandedCamp === campId ? null : campId);
  };
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 text-center mb-10">
          Blood Donation Camps
        </h1>

        {mockCamps.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
          >
            <div
              className="px-6 py-4 cursor-pointer flex justify-between items-center bg-gradient-to-r from-red-500 to-pink-500 text-white"
              onClick={() => toggleCamp(camp.id)}
            >
              <h2 className="text-xl font-semibold">{camp.name}</h2>
              <span className="text-2xl">
                {expandedCamp === camp.id ? "−" : "+"}
              </span>
            </div>

            <div
              className={`px-6 py-4 ${
                expandedCamp === camp.id ? "block" : "hidden"
              }`}
            >
              <p className="text-gray-700">
                <strong>Date:</strong> {camp.date}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {camp.location}
              </p>
              <p className="text-gray-700">
                <strong>State:</strong> {camp.state}
              </p>
              <p className="text-gray-700">
                <strong>District:</strong> {camp.district}
              </p>

              <h3 className="text-lg font-semibold mt-4 mb-2 text-red-600">
                Registered Members
              </h3>
              <div className="bg-gray-100 rounded-md p-4">
                {camp.members.length > 0 ? (
                  <ul className="space-y-2">
                    {camp.members.map((member) => (
                      <li
                        key={member.id}
                        className="flex justify-between items-center"
                      >
                        <span>{member.name}</span>
                        <span className="px-2 py-1 bg-red-500 text-white rounded-full text-sm">
                          {member.bloodType}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">
                    No members registered yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCamp;
