import SubsLane from "./components/SubsLane";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex overflow-x-auto gap-2">
        <SubsLane />
        <SubsLane />
        <SubsLane />
      </div>
    </>
  );
}

export default App;
