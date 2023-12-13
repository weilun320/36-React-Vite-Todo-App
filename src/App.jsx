import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { TodoContext } from "./contexts/TodoContext";
import useLocalStorage from "use-local-storage";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

function Layout() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Todos</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/add">Add Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter basename="/36-React-Vite-Todo-App/">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add" element={<AddTodo />} />
            {/* Parse id of todo to URL */}
            <Route path="edit/:id" element={<EditTodo />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TodoContext.Provider>
  );
}

export default App
