import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

function App() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const updateInput = (value) => {
    setUserInput(value);
    setError("");
  };

  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Date.now(),
        value: userInput,
      };
      setList([...list, newItem]);
      setUserInput("");
      setError("");
    } else {
      setError("Please enter a value before adding!");
    }
  };

  const deleteItem = (key) => {
    setList(list.filter((item) => item.id !== key));
  };

  const editItem = (id) => {
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      setList(
        list.map((item) =>
          item.id === id ? { ...item, value: editedTodo } : item,
        ),
      );
    }
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST
      </Row>
      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
              size="lg"
              value={userInput}
              onChange={(e) => updateInput(e.target.value)}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          {error && (
            <div
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "-10px",
                marginBottom: "10px",
              }}
            >
              {error}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 8 }}>
          <InputGroup>
            <Button variant="dark" className="mt-2" onClick={addItem}>
              ADD
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <ListGroup>
            {list.map((item) => (
              <ListGroup.Item
                key={item.id}
                variant="dark"
                action
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {item.value}
                <span>
                  <Button
                    style={{ marginRight: "10px" }}
                    variant="light"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </Button>
                  <Button variant="light" onClick={() => editItem(item.id)}>
                    Edit
                  </Button>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
