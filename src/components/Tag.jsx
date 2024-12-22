import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";

// access the API key from .env files.
// const API_KEY = process.env.REACT_API_GIPHY_API_KEY;
const API_KEY = "IkSDCy75YgmIBi2XwXNdt77Nxp7ouIUJ";

const Tag = () => {
  const [gif, setGif] = useState("");
  const [loading, setLoading] = useState("false");
  const [tag, setTag] = useState("");

  async function fetchData() {
    // jab network call ho rha ha tab loader start.
    setLoading(true);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
    // Destructring the data.
    // const output = await axios.get(url);
    const { data } = await axios.get(url);
    const imageSource = data.data.images.downsized_large.url;
    console.log(imageSource);
    setGif(imageSource);
    // jab data fetch ho gaye tab loader stop.
    setLoading(false);
  }

  // inside useEffect call the fetchData() function.
  useEffect(() => {
    fetchData();
  });

  function clickHandeler() {
    fetchData();
  }

  function changeHandelar(event) {
    setTag(event.target.value);
  }
  return (
    <div className="w-1/2 bg-blue-400 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-15px">
      <h1 className="mt-[15px] text-2xl underline uppercase font-bold">
        {" "}
        Random {tag} Gif{" "}
      </h1>

      {/* if loading variable is true then show spinner, else show image. */}
      {loading ? <Spinner /> : <img src={gif} width="450" alt=""/>}

      <input
        className="w-10/12 text-lg rounded-lg mb-[3px] text-center"
        onChange={changeHandelar}
        value={tag}
      />
      <button
        className="w-10/12 bg-yellow-200 text-lg py-2 rounded-lg mb-[20px] "
        onClick={clickHandeler}
      >
        Generate
      </button>
    </div>
  );
};

export default Tag;
