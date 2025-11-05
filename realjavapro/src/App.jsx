import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AllTasks from "./pages/AllTasks";
import WeekTasks from "./pages/WeekTasks";
import MonthTasks from "./pages/MonthTasks";
import SharedTasks from "./pages/SharedTasks";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/week" element={<WeekTasks />} />
        <Route path="/month" element={<MonthTasks />} />
        <Route path="/shared" element={<SharedTasks />} />
      </Routes>
    </Router>
  );
}

export default App;
