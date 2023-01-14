import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.scss";
import Dark from "./dark";
import Light from "./light";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=bfb0d503";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <> {lightMode ? <Light /> : <Dark />}
      <label className="switch">
        
        <input type="checkbox" checked={lightMode} onChange={() => setLightMode(!lightMode)} />
        <span className="slider round"></span>
        
      </label>
      <h3 className="switch-alert" style={{ color: lightMode ? "black" : "#f9d3b4" }} >
         {lightMode ? "Ligth mode on" : "Dark mode is on"}
       </h3>



    <div 
   
    className={lightMode ? "app light" : "app dark"}>
      <h1>MovieLand</h1>
      
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Write a movie title"
          onKeyPress={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

    
     
        
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
          </div>
      )}
    </div> </>
  );
};

export default App;
