import Header from "./components/Header";
// @ts-ignore
import LetterGlitch from "./components/LetterGlitch";
import "./App.css";

function App() {
  return (
    <div className="relative w-" style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Background Layer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      {/* Content Layer */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Header />
      </div>
    </div>
  );
}

export default App;
