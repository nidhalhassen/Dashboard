function Dashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
          <div className="text-2xl font-semibold">2</div>
          <div className="text-sm font-medium text-gray-400">Users</div>
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
          <div className="text-2xl font-semibold">100</div>
          <div className="text-sm font-medium text-gray-400">Companies</div>
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md">
          <div className="text-2xl font-semibold">100</div>
          <div className="text-sm font-medium text-gray-400">Blogs</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
