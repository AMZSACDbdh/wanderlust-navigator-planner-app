
import React, { useState, useEffect } from "react";
import { useItineraryContext } from "../hooks/useItineraryContext";
import ItineraryCard from "../components/ItineraryCard";
import Button from "../components/Button";
import { Search } from "lucide-react";

const ItineraryList = () => {
  const { itineraries, loading, error } = useItineraryContext();
  const [filteredItineraries, setFilteredItineraries] = useState(itineraries);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Update filtered itineraries when the original list changes or search term changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItineraries(itineraries);
    } else {
      const filtered = itineraries.filter((itinerary) =>
        itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItineraries(filtered);
    }
  }, [itineraries, searchTerm]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-blue-500 text-lg">Loading itineraries...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] p-4">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <Button to="/create" variant="primary">
          Create New Itinerary
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Itineraries</h1>
          <p className="text-gray-600 mt-2">
            Browse and manage your travel plans
          </p>
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <Button to="/create" variant="secondary">
            Create New
          </Button>
        </div>
      </div>
      
      {/* Itinerary Grid */}
      {filteredItineraries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      ) : (
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium text-gray-900 mb-2">No itineraries found</h3>
          {searchTerm ? (
            <p className="text-gray-600 mb-4">
              No results match "{searchTerm}". Try a different search term or clear your search.
            </p>
          ) : (
            <p className="text-gray-600 mb-4">
              You haven't created any itineraries yet. Start planning your next adventure!
            </p>
          )}
          <Button to="/create" variant="primary">
            Create Your First Itinerary
          </Button>
        </div>
      )}
    </div>
  );
};

export default ItineraryList;
