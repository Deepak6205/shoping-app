import React, { useState } from "react";

const searchData = [
  {
    name: "Sofa",
    image:
      "https://m.media-amazon.com/images/I/61P3aL0IufL._AC_UL480_QL65_.jpg",
  },
  {
    name: "Shirt",
    image:
      "https://m.media-amazon.com/images/I/61rJgcPO1GL._AC_UL480_QL65_.jpg",
  },
  {
    name: "Jacket",
    image:
      "https://m.media-amazon.com/images/I/619xMvtqClL._AC_UL480_QL65_.jpg",
  },
  {
    name: "Mobile",
    image:
      "https://m.media-amazon.com/images/I/71R8VsJ07nL._AC_UY327_QL65_.jpg",
  },
  {
    name: "Laptop",
    image:
      "https://m.media-amazon.com/images/I/71pKJ+Mjd8L._AC_UY327_QL65_.jpg",
  },
  {
    name: "furniture",
    image:
      "https://m.media-amazon.com/images/I/91XEu9I+aVL._AC_UL480_QL65_.jpg",
  },
];

const SearchBar = () => {
  const [search, setSearch] = useState("");

  // Filter Search Data
  const filterSearchData = searchData
    .filter((obj) => obj.name.toLowerCase().includes(search))
    .slice(0, 8);

  return (
    <div>
      {/* search input */}
      <div className="input flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black"
        />
      </div>

      {/* search drop-down */}
      <div className="flex justify-center">
        {search && (
          <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div key={index} className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <img className="w-10" src={item.image} alt="" />
                        {item.name}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    className="w-20"
                    src="https://m.media-amazon.com/images/I/71ptbGdlJOL._AC_UL480_QL65_.jpg"
                    alt="img"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
