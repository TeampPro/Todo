import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import AllTasks from "./pages/AllTasks";
import WeekTasks from "./pages/WeekTasks";
import MonthTasks from "./pages/MonthTasks";
import SharedTasks from "./pages/SharedTasks";
import AddTaskPage from "./pages/AddTaskPage";
import KakaoMapBox from "./pages/KakaoMapBox"; // ✅ 통합된 지도 컴포넌트
import "./styles/layout.css";

function App() {
  return (
    <Router>
      <Header />
      <div className="main-layout">
        <div className="content">
          <Routes>
            <Route path="/" element={<AllTasks />} />
            <Route path="/week" element={<WeekTasks />} />
            <Route path="/month" element={<MonthTasks />} />
            <Route path="/shared" element={<SharedTasks />} />
            <Route path="/add" element={<AddTaskPage />} />
          </Routes>
        </div>

        {/* 지도 검색영역 */}
        <KakaoMapBox />
      </div>
    </Router>
  );
}

export default App;
