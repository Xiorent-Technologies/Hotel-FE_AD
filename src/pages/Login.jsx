import React, { useState } from 'react';
import { useUserStore } from '../stores/useUserStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loginUser} = useUserStore();

  const handleSubmit = () => {
    console.log('Login attempted with:', { email, password },{ withCredentials: true });
    loginUser({ email, password });

  };

  return (
    <div className="flex flex-col h-screen">

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side - Login (55%) */}
        <div className="w-[55%] flex items-center justify-center p-8">
          <div className="w-full max-w-md text-center">
            
            {/* Flash Rooms Logo in Middle */}
            <img 
              src="/flashrooms.png" 
              alt="Flash Rooms Logo" 
              className="h-16 mx-auto mb-6"
            />

            {/* Login Header */}
            <h1 className="text-4xl font-bold text-red-600 mb-8">Log In</h1>

            {/* Terms Text */}
            <p className="text-sm text-gray-600 mb-6">
              By signing up, you agree to the{' '}
              <span className="text-blue-600 cursor-pointer hover:underline">Terms of use</span>
              {' '}and{' '}
              <span className="text-blue-600 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>

            {/* Login Inputs */}
            <div className="space-y-6 text-left">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-red-600 text-white py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Single Image (45%) */}
        <div className="w-[45%] overflow-hidden">
          <img
            src="/loginImage.jpeg"
            alt="Beautiful scenery"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}