
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItineraryContext } from "../hooks/useItineraryContext";
import Button from "../components/Button";
import { toast } from "@/components/ui/sonner";

type FormData = {
  destination: string;
  startDate: string;
  endDate: string;
  preferences: {
    accommodation: string;
    transportation: string;
    activities: string;
    budget: string;
  };
};

type FormErrors = {
  destination?: string;
  startDate?: string;
  endDate?: string;
};

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { addItinerary } = useItineraryContext();
  
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    startDate: "",
    endDate: "",
    preferences: {
      accommodation: "",
      transportation: "",
      activities: "",
      budget: "",
    },
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validate form
  const validateForm = () => {
    const newErrors: FormErrors = {};
    const today = new Date().toISOString().split('T')[0];
    
    if (!formData.destination) {
      newErrors.destination = "Destination is required";
    }
    
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    } else if (formData.startDate < today) {
      newErrors.startDate = "Start date must be in the future";
    }
    
    if (formData.endDate && formData.endDate < formData.startDate) {
      newErrors.endDate = "End date must be after start date";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      // Handle nested preference fields
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof FormData],
          [child]: value,
        },
      });
    } else {
      // Handle top-level fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      setIsSubmitting(true);
      
      try {
        // Format preferences as an array
        const preferenceArray = Object.entries(formData.preferences).map(([category, value]) => ({
          category,
          value,
        }));
        
        // Add the new itinerary
        await addItinerary({
          destination: formData.destination,
          startDate: formData.startDate,
          endDate: formData.endDate || undefined,
          preferences: preferenceArray,
        });
        
        // Show success toast
        toast.success("Itinerary created successfully!");
        
        // Navigate to itineraries page
        navigate("/itineraries");
      } catch (error) {
        console.error("Error creating itinerary:", error);
        toast.error("Failed to create itinerary. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-6 px-6">
          <h1 className="text-2xl font-bold text-white">Create New Itinerary</h1>
          <p className="text-blue-100 mt-2">Fill in the details to plan your perfect trip</p>
        </div>
        
        <div className="p-6">
          <div role="form" onSubmit={handleSubmit} className="space-y-6">
            {/* Destination Field */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination*
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.destination ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Where are you going?"
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
              )}
            </div>
            
            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.startDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.endDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>
            </div>
            
            {/* Preferences Section */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Travel Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Accommodation */}
                <div>
                  <label htmlFor="preferences.accommodation" className="block text-sm font-medium text-gray-700 mb-1">
                    Accommodation
                  </label>
                  <select
                    id="preferences.accommodation"
                    name="preferences.accommodation"
                    value={formData.preferences.accommodation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select accommodation</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Resort">Resort</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Airbnb">Airbnb</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {/* Transportation */}
                <div>
                  <label htmlFor="preferences.transportation" className="block text-sm font-medium text-gray-700 mb-1">
                    Transportation
                  </label>
                  <select
                    id="preferences.transportation"
                    name="preferences.transportation"
                    value={formData.preferences.transportation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select transportation</option>
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Bus">Bus</option>
                    <option value="Car Rental">Car Rental</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                {/* Activities */}
                <div>
                  <label htmlFor="preferences.activities" className="block text-sm font-medium text-gray-700 mb-1">
                    Activities
                  </label>
                  <select
                    id="preferences.activities"
                    name="preferences.activities"
                    value={formData.preferences.activities}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select activities</option>
                    <option value="Sightseeing">Sightseeing</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Relaxation">Relaxation</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
                
                {/* Budget */}
                <div>
                  <label htmlFor="preferences.budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget
                  </label>
                  <select
                    id="preferences.budget"
                    name="preferences.budget"
                    value={formData.preferences.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select budget</option>
                    <option value="Budget">Budget</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Creating..." : "Create Itinerary"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;
