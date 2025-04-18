
import React from 'react';

const DateFields = ({ startDate, endDate, errors, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
          Start Date*
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={onChange}
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
          value={endDate}
          onChange={onChange}
          className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.endDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.endDate && (
          <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
        )}
      </div>
    </div>
  );
};

export default DateFields;
