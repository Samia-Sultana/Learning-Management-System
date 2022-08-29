import 'bootstrap/dist/css/bootstrap.min.css';
import { React } from 'react';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import './App.css';
import AdminPage from './Components/AdminPage/AdminPage';
import AdminLogin from "./Components/Login/AdminLogin";
import StudentLogin from "./Components/Login/StudentLogin";
import TeacherLogin from "./Components/Login/TeacherLogin";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Registration from './Components/Registration/Registration';



function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminLogin/>} />
            <Route path="/student" element={<StudentLogin/>} />
            <Route path="/teacher" element={<TeacherLogin/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/admin" element={ <ProtectedRoute> <AdminPage /></ProtectedRoute> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
