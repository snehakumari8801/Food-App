import React from 'react';

function Error() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Not Found</h1>
        <p className="text-lg mb-6">Please log in first.</p>
        <button
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
          onClick={() => window.location.href = '/login'}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Error;
