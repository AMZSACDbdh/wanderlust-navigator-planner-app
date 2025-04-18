
import React from "react";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative flex items-center justify-center min-h-[500px] bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/random/1200x800/?travel')" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-600/60" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Plan Your Dream Adventure
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Create personalized travel itineraries tailored to your preferences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/create" variant="secondary">
              Create New Itinerary
            </Button>
            <Button to="/itineraries" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              View My Itineraries
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Use Wanderlust?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="text-blue-500 mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                Personalized Itineraries
              </h3>
              <p className="text-gray-600 text-center">
                Create custom travel plans based on your preferences and interests
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="text-blue-500 mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                Easy Organization
              </h3>
              <p className="text-gray-600 text-center">
                Keep all your travel plans in one place, accessible anytime
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="text-blue-500 mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                Discover New Places
              </h3>
              <p className="text-gray-600 text-center">
                Find inspiration for your next adventure with our curated destinations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Create your first travel itinerary in just a few clicks
          </p>
          <Button to="/create" variant="secondary" className="bg-orange-500 hover:bg-orange-600">
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
