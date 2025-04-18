
import React from 'react';

const PreferencesSection = ({ preferences, onChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Travel Preferences</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferences.accommodation" className="block text-sm font-medium text-gray-700 mb-1">
            Accommodation
          </label>
          <select
            id="preferences.accommodation"
            name="preferences.accommodation"
            value={preferences.accommodation}
            onChange={onChange}
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
        
        <div>
          <label htmlFor="preferences.transportation" className="block text-sm font-medium text-gray-700 mb-1">
            Transportation
          </label>
          <select
            id="preferences.transportation"
            name="preferences.transportation"
            value={preferences.transportation}
            onChange={onChange}
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
        
        <div>
          <label htmlFor="preferences.activities" className="block text-sm font-medium text-gray-700 mb-1">
            Activities
          </label>
          <select
            id="preferences.activities"
            name="preferences.activities"
            value={preferences.activities}
            onChange={onChange}
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
        
        <div>
          <label htmlFor="preferences.budget" className="block text-sm font-medium text-gray-700 mb-1">
            Budget
          </label>
          <select
            id="preferences.budget"
            name="preferences.budget"
            value={preferences.budget}
            onChange={onChange}
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
  );
};

export default PreferencesSection;
