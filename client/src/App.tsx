import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { NewsArea } from "./components/NewsArea";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <div className="max-w-300 w-full mx-auto flex flex-col gap-8 pb-12 px-6">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="hidden lg:block">
                <Navbar />
              </div>
              <MobileMenu />
              <NewsArea />
              <Footer />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;