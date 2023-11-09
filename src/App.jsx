import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/utils/Login';
import Dashboard from './pages/utils/Dashboard';
import AddUser from './pages/users/AddUser';
import AddSubject from './pages/subjects/AddSubject';
import EditUser from './pages/users/EditUser';
import EditSubject from './pages/subjects/EditSubject';
import Subjects from './pages/subjects/Subjects';
import AddAdmin from './components/utils/AddAdminForm';
import Users from './pages/users/Users';
import AddStudent from './pages/students/AddSubject';
import EditStudent from './pages/students/EditSubject';
import Students from './pages/students/Students';
import EditMajor from './pages/majors/EditMajor';
import AddMajor from './pages/majors/AddMajor';
import Majors from './pages/majors/Majors';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/:id" element={<EditUser />} />
          <Route path="/users" element={<Users />} />
          <Route path="/subjects/add" element={<AddSubject />} />
          <Route path="/subjects/:id" element={<EditSubject />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id" element={<EditStudent />} />
          <Route path="/students" element={<Students />} />
          <Route path="/majors/:studentId/add" element={<AddMajor />} />
          <Route path="/majors/:studentId/:id" element={<EditMajor />} />
          <Route path="/majors/:studentId" element={<Majors />} />
          <Route path="/demo" element={<AddAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
