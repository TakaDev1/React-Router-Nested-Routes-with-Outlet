import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>React-Router-Nested-Routes-with-Outlet</h1>
        <Routes>
          <Route path="/users" element={<Users />}>
            <Route path="/users/:id" element={<UserDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
