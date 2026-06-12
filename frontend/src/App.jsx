import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NotesDashboard } from "./pages/Dashboard";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import ViewNotes from "./pages/viewNotes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notesdashboard" element={<NotesDashboard />} />
          <Route path="/viewNotes" element={<ViewNotes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
