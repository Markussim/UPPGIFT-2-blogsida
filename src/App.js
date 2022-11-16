import { useState } from "react";

function App() {
  const [data, setData] = useState([
    { twoot: "Hello World", twootContent: "This is my first twoot", key: "1" },
    { twoot: "Hello Pucko", twootContent: "This is my second twoot", key: "2" },
  ]);

  return (
    <>
      <h1>Post a twoot</h1>
      <input type="text" placeholder="Twoot" />
      <input type="file" />
      <button>Twoot</button>

      <div className="twoots">
        <div className="wrapper">
          {data.map((twoot) => (
            <div className="twoot" key={twoot.key}>
              <h2>{twoot.twoot}</h2>
              <p>{twoot.twootContent}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
