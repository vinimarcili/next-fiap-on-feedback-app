const Header = () => {
  return (
    <div className="text-center mb-10">
      <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-3xl text-white font-bold">🛍️</span>
        </div>
      </div>

      <h1 className="text-xl font-extrabold text-gray-900 mb-8 leading-tight">
        Minha
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 block">
          Loja
        </span>
      </h1>
    </div>
  )
}

export default Header;