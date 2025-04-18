
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useItineraryContext } from "../hooks/useItineraryContext";
import Button from "../components/Button";
import { toast } from "@/components/ui/sonner";
import DestinationField from "../components/itinerary/DestinationField";
import DateFields from "../components/itinerary/DateFields";
import PreferencesSection from "../components/itinerary/PreferencesSection";

const CreateItinerary = () => {
  const navigate = useNavigate();
  const { addItinerary } = useItineraryContext();
  
  const [formData, setFormData] = useState({
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
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        const preferenceArray = Object.entries(formData.preferences).map(([category, value]) => ({
          category,
          value,
        }));
        
        await addItinerary({
          destination: formData.destination,
          startDate: formData.startDate,
          endDate: formData.endDate || undefined,
          preferences: preferenceArray,
        });
        
        toast.success("Itinerary created successfully!");
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <DestinationField
              destination={formData.destination}
              error={errors.destination}
              onChange={handleInputChange}
            />
            
            <DateFields
              startDate={formData.startDate}
              endDate={formData.endDate}
              errors={errors}
              onChange={handleInputChange}
            />
            
            <PreferencesSection
              preferences={formData.preferences}
              onChange={handleInputChange}
            />
            
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Creating..." : "Create Itinerary"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateItinerary;
