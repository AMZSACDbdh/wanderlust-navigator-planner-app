
import React, { createContext, useContext, useState, useEffect } from "react";

type Preference = {
  category: string;
  value: string;
};

export type Itinerary = {
  id: number;
  destination: string;
  startDate: string;
  endDate?: string;
  preferences: Preference[];
  createdAt: string;
  image?: string;
};

type ItineraryContextType = {
  itineraries: Itinerary[];
  loading: boolean;
  error: string | null;
  addItinerary: (itinerary: Omit<Itinerary, "id" | "createdAt">) => Promise<void>;
  getItinerary: (id: number) => Itinerary | undefined;
};

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

export const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Random travel images from Unsplash
const DESTINATION_IMAGES = [
  "https://source.unsplash.com/400x300/?paris",
  "https://source.unsplash.com/400x300/?tokyo",
  "https://source.unsplash.com/400x300/?newyork",
  "https://source.unsplash.com/400x300/?london",
  "https://source.unsplash.com/400x300/?sydney",
  "https://source.unsplash.com/400x300/?rome",
  "https://source.unsplash.com/400x300/?bali",
  "https://source.unsplash.com/400x300/?santorini",
];

export const ItineraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error("Failed to fetch itineraries");
        }
        
        const data = await response.json();
        
        // Transform the data to match our Itinerary type
        const transformedData: Itinerary[] = data.slice(0, 6).map((item: any, index: number) => ({
          id: item.id,
          destination: item.title.split(" ")[0] || "Unknown Destination",
          startDate: new Date(Date.now() + (index * 86400000)).toISOString().split('T')[0], // Today + index days
          preferences: [
            { category: "Accommodation", value: "Hotel" },
            { category: "Activities", value: index % 2 === 0 ? "Adventure" : "Relaxation" }
          ],
          createdAt: new Date().toISOString(),
          image: DESTINATION_IMAGES[index % DESTINATION_IMAGES.length]
        }));
        
        setItineraries(transformedData);
      } catch (err) {
        console.error("Error fetching itineraries:", err);
        setError("Failed to load itineraries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchItineraries();
  }, []);

  // Add a new itinerary
  const addItinerary = async (newItinerary: Omit<Itinerary, "id" | "createdAt">) => {
    try {
      setLoading(true);
      
      // Make a POST request to the API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newItinerary.destination,
          body: JSON.stringify(newItinerary.preferences),
          userId: 1, // Mock user ID
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create itinerary");
      }
      
      const data = await response.json();
      
      // Create a new itinerary with the API response and our data
      const createdItinerary: Itinerary = {
        id: data.id,
        destination: newItinerary.destination,
        startDate: newItinerary.startDate,
        endDate: newItinerary.endDate,
        preferences: newItinerary.preferences,
        createdAt: new Date().toISOString(),
        image: DESTINATION_IMAGES[Math.floor(Math.random() * DESTINATION_IMAGES.length)]
      };
      
      // Update the state with the new itinerary
      setItineraries((prevItineraries) => [createdItinerary, ...prevItineraries]);
    } catch (err) {
      console.error("Error adding itinerary:", err);
      setError("Failed to create itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get an itinerary by ID
  const getItinerary = (id: number) => {
    return itineraries.find((itinerary) => itinerary.id === id);
  };

  return (
    <ItineraryContext.Provider
      value={{
        itineraries,
        loading,
        error,
        addItinerary,
        getItinerary,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItineraryContext = () => {
  const context = useContext(ItineraryContext);
  
  if (context === undefined) {
    throw new Error("useItineraryContext must be used within an ItineraryProvider");
  }
  
  return context;
};
