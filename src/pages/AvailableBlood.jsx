import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function AvailableBlood() {
  const { id } = useParams();
  const [blooddata, setblooddata] = useState({});
  const getdata = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/bloodBank/getAvailableBlood/${id}`,
        {
          withCredentials: true,
        }
      );
      setblooddata(res.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 md:px-6">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Blood Type Data
          </h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Explore the distribution of blood types and their quantities in the
            population.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="px-4 py-3 font-medium">Blood Type</th>
                <th className="px-4 py-3 font-medium">Availability</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(blooddata).map(([key,value])=>(
                <tr>
                  <td className="px-4 py-3 font-medium">{key}</td>
                  <td className="px-4 py-3">{value>0?"Available":"Not Available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Blood Type Legend</h2>
            <ul className="space-y-2">
              <li>
                <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2" />
                A
              </li>
              <li>
                <span className="inline-block w-4 h-4 bg-orange-400 rounded-full mr-2" />
                B
              </li>
              <li>
                <span className="inline-block w-4 h-4 bg-green-400 rounded-full mr-2" />
                AB
              </li>
              <li>
                <span className="inline-block w-4 h-4 bg-blue-400 rounded-full mr-2" />
                O
              </li>
            </ul>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">About Blood Types</h2>
            <p className="text-muted-foreground">
              Blood types are determined by the presence or absence of certain
              antigens on the surface of red blood cells. The main blood types
              are A, B, AB, and O. Knowing your blood type is important for
              medical purposes, such as blood transfusions and organ
              transplants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableBlood;
