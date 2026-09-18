import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/static/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Layout from "./pages/layouts/Layout";
import ProtectedRoute from "./gaurds/ProtectedRoute";
import CreateNote from "./pages/notes/CreateNote";
import ViewNotes from "./pages/notes/ViewNotes";
import EditNote from "./pages/notes/EditNote";
import Accounts from "./pages/settings/Accounts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          {/* Notes Routes */}
          <Route path="/notes/create-note" element={<CreateNote />} />
          <Route path="/notes/view-notes" element={<ViewNotes />} />
          <Route path="/notes/edit-note/:id" element={<EditNote />} />
          <Route path="/settings/account" element={<Accounts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
