import React, { useState } from "react";
import { FaSearch, FaStar, FaSortAmountUp, FaSortAmountDown, FaArrowDown, FaMapMarkerAlt } from "react-icons/fa";

const SearchHotels = ({
  states,
  cities,
  selectedState,
  selectedCity,
  filterRating,
  searchTerm,
  sortOrder,
  handleStateChange,
  handleCityChange,
  setFilterRating,
  setSearchTerm,
  setSortOrder,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <section className="bg-gradient-to-r from-gray-800/90 to-blue-900/90 rounded-2xl p-8 shadow-xl mb-10 backdrop-blur-md transform -mt-24 mx-4 lg:mx-auto">
      <h2 className="text-2xl font-semibold text-blue-300 mb-6 flex items-center">
        <FaSearch className="mr-2" /> Search Hotels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="state-select" className="block text-sm font-semibold text-gray-200 mb-2">
            Select State
          </label>
          <div className="relative">
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 appearance-none"
              aria-label="Select state"
            >
              <option value="">-- All States --</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaMapMarkerAlt className="text-blue-400" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="city-select" className="block text-sm font-semibold text-gray-200 mb-2">
            Select City
          </label>
          <div className="relative">
            <select
              id="city-select"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              disabled={!selectedState}
              className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:bg-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 appearance-none"
              aria-label="Select city"
            >
              <option value="">-- All Cities --</option>
              {cities.map((city) => (
                <option key={city._id} value={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaMapMarkerAlt className="text-blue-400" />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="search-hotel" className="block text-sm font-semibold text-gray-200 mb-2">
            Search Hotel
          </label>
          <div className="relative">
            <input
              id="search-hotel"
              type="text"
              placeholder="Enter hotel name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200"
              aria-label="Search hotel by name"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaSearch className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200"
        >
          {showFilters ? "Hide Filters" : "Show Advanced Filters"}
          <FaArrowDown className={`ml-2 transform transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-600/50">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFilterRating(star)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      filterRating >= star ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
                    }`}
                    aria-label={`Filter hotels with minimum rating of ${star} stars`}
                  >
                    <FaStar />
                  </button>
                ))}
                <button
                  onClick={() => setFilterRating(0)}
                  className="ml-2 text-xs text-gray-300 hover:text-white px-3 py-1 rounded-full bg-gray-700/80 hover:bg-gray-600 transition-all duration-200"
                >
                  Clear
                </button>
              </div>
              {filterRating > 0 && (
                <p className="mt-2 text-sm text-gray-400">
                  Showing hotels with {filterRating} {filterRating === 1 ? "star" : "stars"} or higher
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Sort by Rating
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "" : "asc")}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    sortOrder === "asc"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700/80 text-gray-300 hover:bg-gray-600"
                  }`}
                  aria-label="Sort hotels by rating from low to high"
                >
                  <FaSortAmountUp className="mr-2" /> Low to High
                </button>
                <button
                  onClick={() => setSortOrder(sortOrder === "desc" ? "" : "desc")}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                    sortOrder === "desc"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700/80 text-gray-300 hover:bg-gray-600"
                  }`}
                  aria-label="Sort hotels by rating from high to low"
                >
                  <FaSortAmountDown className="mr-2" /> High to Low
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchHotels;