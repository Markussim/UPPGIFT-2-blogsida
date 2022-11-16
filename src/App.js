import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  httpsCallable,
  getFunctions,
  connectFunctionsEmulator,
} from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyA9ZuWby9XcbFoXzrNUsf83K1qx4hoxuek",
  authDomain: "uppgift-2-blog.firebaseapp.com",
  projectId: "uppgift-2-blog",
  storageBucket: "uppgift-2-blog.appspot.com",
  messagingSenderId: "998748207535",
  appId: "1:998748207535:web:9837615deb9e86a606975a",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [data, setData] = useState([
    {
      twoot: "Hello World",
      twootContent: "This is my first twoot",
      image:
        "https://lh6.ggpht.com/EoH-UNwa_XRNuk0jB7UQDVQdTSigPu4B5zrb3I5iXk289KYfGZOzJgfwP8Y9DEA1O_k=h900",
    },
    {
      twoot: "Hello Pucko",
      twootContent: "This is my second twoot",
      image:
        "https://www.hdnicewallpapers.com/Walls/Big/Dog/Dog_Puppy_Photo_Download.jpg",
    },
    {
      twoot: "Hello Picko",
      twootContent: "This is my third twoot",
      image:
        "https://www.hdnicewallpapers.com/Walls/Big/Dog/Dog_Puppy_Photo_Download.jpg",
    },
  ]);

  const fetchTwoots = async () => {
    const functions = getFunctions(app);
    connectFunctionsEmulator(functions, "localhost", 5001);
    const getTwoots = httpsCallable(functions, "getTwoots");
    const response = await getTwoots();
    console.log(response);
    setData(response.data);
  };

  useEffect(() => {
    fetchTwoots();
  }, []);

  // Post twoot to database
  const postTwoot = async (e) => {
    e.preventDefault();
    const twoot = e.target.elements.twoot.value;
    const twootContent = e.target.elements.twootContent.value;
    const twootObject = { twoot, twootContent };

    // Trigger firebase function
    const functions = getFunctions(app);

    // Use emulated functions
    connectFunctionsEmulator(functions, "localhost", 5001);

    const postTwoot = httpsCallable(functions, "postTwoot");
    await postTwoot(twootObject);
    fetchTwoots();
  };

  return (
    <>
      <h1>Post a twoot</h1>
      <form id="postTwoot" onSubmit={postTwoot}>
        <input type="text" placeholder="Twoot" name="twoot" />
        <input type="text" placeholder="Twoot content" name="twootContent" />
        <button>Twoot</button>
      </form>
      <br></br>
      <br></br>

      <div className="twoots">
        {data.map((twoot, i) => {
          if (twoot.twoot.length > 0) {
            return (
              <div className="twoot" key={i}>
                <h2>{twoot.twoot}</h2>
                <p>{twoot.twootContent}</p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default App;
