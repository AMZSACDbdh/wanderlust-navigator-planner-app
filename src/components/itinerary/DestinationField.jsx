
import React from 'react';

const DestinationField = ({ destination, error, onChange }) => {
  return (
    <div>
      <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
        Destination*
      </label>
      <input
        type="text"
        id="destination"
        name="destination"
        value={destination}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Where are you going?"
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default DestinationField;
