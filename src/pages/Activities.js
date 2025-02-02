function Activities() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Activities</h1>
      <div className="bg-white p-6 rounded-md shadow-md">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Activity</th>
              <th className="p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">John Doe</td>
              <td className="p-2">Logged in</td>
              <td className="p-2">2025-02-02</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">Jane Smith</td>
              <td className="p-2">Added a new user</td>
              <td className="p-2">2025-02-02</td>
            </tr>
            <tr>
              <td className="p-2">Alice Brown</td>
              <td className="p-2">Updated settings</td>
              <td className="p-2">2025-02-01</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
