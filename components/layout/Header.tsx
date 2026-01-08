export function Header() {
  return (
    <header className="bg-white shadow border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Gestion Électronique des Documents RH
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              🔔
            </button>
            
            <div className="relative">
              <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  👤
                </div>
                <span>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}