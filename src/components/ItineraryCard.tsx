
import React from "react";
import { Link } from "react-router-dom";
import { Itinerary } from "../hooks/useItineraryContext";
import { Calendar } from "lucide-react";

interface ItineraryCardProps {
  itinerary: Itinerary;
}

const ItineraryCard = ({ itinerary }: ItineraryCardProps) => {
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]">
      {/* Card Image */}
      <div className="relative h-48 w-full">
        <img
          src={itinerary.image || `https://source.unsplash.com/400x300/?${itinerary.destination}`}
          alt={`${itinerary.destination} travel`}
          className="object-cover h-full w-full"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{itinerary.destination}</h3>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-3">
          <Calendar size={16} className="mr-2" />
          <p>{formatDate(itinerary.startDate)} 
            {itinerary.endDate ? ` - ${formatDate(itinerary.endDate)}` : ""}
          </p>
        </div>
        
        {/* Preferences Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {itinerary.preferences.map((pref, index) => (
            <span 
              key={index}
              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {pref.value}
            </span>
          ))}
        </div>
        
        {/* View Button */}
        <Link 
          to={`/itineraries/${itinerary.id}`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItineraryCard;
