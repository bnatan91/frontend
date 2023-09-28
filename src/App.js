import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Login from './components/Login.jsx';
import Users from './pages/Users.jsx';
import Subjects from './pages/Subjects.jsx';
import AddUser from './pages/AddUser.jsx';
import EditUser from './pages/EditUser.jsx';
import AddSubject from './pages/AddSubject.jsx';
import EditSubject from './pages/EditSubject.jsx';
import AddAdmin from './pages/AddAdmin.jsx';
import Majors from './pages/Majors.jsx';
import AddMajor from './pages/AddMajor.jsx';
import EditMajor from './pages/EditMajor.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/subjects/add" element={<AddSubject />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/subjects/edit/:id" element={<EditSubject />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/majors/add" element={<AddMajor />} />
          <Route path="/majors/edit/:id" element={<EditMajor />} />
          <Route path="/majors" element={<Majors />} />
          <Route path="/demo" element={<AddAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
