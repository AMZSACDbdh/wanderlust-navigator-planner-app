
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useItineraryContext } from "../hooks/useItineraryContext";
import Button from "../components/Button";
import { Calendar, MapPin, Users, Tag, ArrowLeft } from "lucide-react";

const ItineraryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItinerary } = useItineraryContext();
  
  // Get itinerary by ID
  const itinerary = getItinerary(Number(id));
  
  // Format the date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  
  if (!itinerary) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary Not Found</h2>
        <p className="text-gray-600 mb-6">The itinerary you're looking for doesn't exist or has been removed.</p>
        <Button to="/itineraries" variant="primary">
          Back to Itineraries
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/itineraries")}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Itineraries
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Image */}
        <div className="relative h-64 w-full">
          <img
            src={itinerary.image || `https://source.unsplash.com/800x400/?${itinerary.destination}`}
            alt={`${itinerary.destination} travel`}
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white">{itinerary.destination}</h1>
            <div className="flex items-center text-white/90 mt-2">
              <Calendar size={18} className="mr-2" />
              <span>
                {formatDate(itinerary.startDate)}
                {itinerary.endDate ? ` - ${formatDate(itinerary.endDate)}` : ""}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={20} className="mr-3 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Destination</h3>
                    <p className="text-gray-600">{itinerary.destination}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={20} className="mr-3 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Dates</h3>
                    <p className="text-gray-600">
                      {formatDate(itinerary.startDate)}
                      {itinerary.endDate ? ` - ${formatDate(itinerary.endDate)}` : ""}
                    </p>
                    {itinerary.endDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        {Math.ceil(
                          (new Date(itinerary.endDate).getTime() - new Date(itinerary.startDate).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Tag size={20} className="mr-3 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Travel Style</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {itinerary.preferences.map((pref, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {pref.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preferences */}
            <div className="w-full md:w-1/3">
              <div className="bg-blue-50 rounded-lg p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
                <ul className="space-y-3">
                  {itinerary.preferences.map((pref, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-gray-700 capitalize">{pref.category}:</span>
                      <span className="font-medium text-gray-900">{pref.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Itinerary created on {formatDate(itinerary.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetails;
