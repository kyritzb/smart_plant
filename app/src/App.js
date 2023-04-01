import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    // Fetch humidity data from server
    axios
      .post("/humidity")
      .then((response) => setHumidity(response.data.humidity))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Humidity</h1>
        {humidity !== null ? <p>{humidity}%</p> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;
