import Navbar from "./components/Navbar";
import SubsLane from "./components/SubsLane";
import AddSubBtn from "./components/AddSubBtn";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex overflow-x-auto gap-2">
        <SubsLane />
        <SubsLane />
        <SubsLane />
        <AddSubBtn />
      </div>
    </>
  );
}

export default App;
