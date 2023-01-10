import { useEffect } from "react";
import "./App.css";
// this is after putting script in public\index.html
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <div className="App">
      <button>Close</button>
    </div>
  );
}

export default App;
