import React, {useEffect, useState} from 'react';
const MAP_ENDPOINT = "/api/mapMaker";

const getMap = () => {
  fetch(MAP_ENDPOINT)
    .then((res) => res.json())
    .then((json) => {
      console.log(json)
    });
};

const MiniMap = () => {
  const [map, setMap] = useState({});

  useEffect(() => {
    // getMap()
  });

  return(
    <section>
      <h1>mini map</h1>
    </section>
  )
};

export default MiniMap;