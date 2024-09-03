import React from "react";

function Request() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-items-center">
        <div>
          <span className="font-semibold text-lg mr-3">Status:</span>
          <select>
            <option value="" selected>
              All
            </option>
            <option value="">Pending</option>
            <option value="">Approved</option>
            <option value="">Denied</option>
          </select>
        </div>
      </div>
      <div className="mt-7 overflow-x-auto">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-red-500 text-white">
            <tr>
              <th class="p-3 text-md border border-gray-400 rounded">Donor Name</th>
              <th class="p-3 text-md border border-gray-400 rounded">Reason</th>
              <th class="p-3 text-md border border-gray-400 rounded">
                Blood Group
              </th>
              <th class="p-3 text-md border border-gray-400 rounded">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-3 text-md border border-gray-400 rounded">
                Andhra Pradesh
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                Anantapur
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                123, XYZ Streets fnsbfhsdhfjsbdgdguhdg dgduhguhdg dfgdg hfjbgjdg
                rtrey
              </td>
              <td class="p-3 text-md border border-gray-400 rounded">
                9876543210
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Request;
