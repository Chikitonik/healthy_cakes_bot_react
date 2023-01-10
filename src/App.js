import { useEffect } from "react";
import "./App.css";
// this is after putting script in public\index.html

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  return <div className="App"></div>;
}

export default App;
