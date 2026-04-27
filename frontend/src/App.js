import { BrowserRouter,Routes,Route} from "react-router-dom";
import UserList from "./componen/UserList";
import AddUser from "./componen/AddUser"; 
import EditUser from "./componen/EditUser";
function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
