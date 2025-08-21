
export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Wegmans Produce Trivia</h1>
          <p className="text-lg text-gray-600"> 4 Teams in Mt.Laural Produce !</p>
        </div>

        {/* Creator Info */}
        <div className="text-center">
          <p className="text-base text-gray-700">Created by <span className="font-semibold">Adnan Khaleeli</span></p>
          <p className="text-base text-gray-700">
            Email: <a href="mailto:khaleeliadnan10@gmail.com" className="text-green-600 hover:text-green-800 transition">khaleeliadnan10@gmail.com</a>
          </p>
        </div>

        {/* Terms and Conditions Section */}
        <div className="bg-gray-100 rounded-md shadow-md p-6 transition hover:shadow-lg">
          <h2 className="text-center text-3xl font-semibold text-gray-800 mb-4">Terms and Conditions</h2>
          <p className="text-gray-600"> 1) Adnan is Number 1!</p>
        </div>
      </div>
    </div>
  );
}