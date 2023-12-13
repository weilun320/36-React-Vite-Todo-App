import { useContext } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { Link } from "react-router-dom";

export default function Home() {
  const todos = useContext(TodoContext).todos;
  const setTodos = useContext(TodoContext).setTodos;

  function handleDelete(id) {
    const filteredTodos = todos.filter((todo) => todo.id !== id);

    setTodos(filteredTodos);
  }

  return (
    <Container>
      <h1 className="my-3">Your todos</h1>
      <Row>
        <CardGroup todos={todos} handleDelete={handleDelete} />
      </Row>
    </Container>
  );
}

function CardGroup({ todos, handleDelete }) {
  return todos.map((todo) => {
    const completed = todo.completed;
    const bg = completed ? "success" : "danger";

    return (<Col md={4} key={todo.id}>
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <Badge bg={bg}>{!completed && "Not"} Completed</Badge>
          <Container className="my-3">
            <Button className="me-1" variant="secondary" as={Link} to={"/edit/" + todo.id}>Edit</Button>
            <Button className="ms-1" variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
          </Container>
        </Card.Body>
      </Card>
    </Col>);
  });
}
