import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      list: [],
    };
    const storedList = localStorage.getItem("list");
    if (storedList) {
      this.state.list = JSON.parse(storedList);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.list !== this.state.list) {
      localStorage.setItem("list", JSON.stringify(this.state.list));
    }
  }

  updateInput = (value) => {
    this.setState({
      userInput: value,
    });
  };

  addItem = () => {
    if (this.state.userInput.trim() !== "") {
      const userInput = {
        id: Date.now(),
        value: this.state.userInput,
      };
      this.setState((prevState) => ({
        list: [...prevState.list, userInput],
        userInput: "",
      }));
    }
  };

  deleteItem = (key) => {
    this.setState((prevState) => ({
      list: prevState.list.filter((item) => item.id !== key),
    }));
  };

  editItem = (id) => {
    const editedTodo = prompt("Edit the todo:");
    if (editedTodo !== null && editedTodo.trim() !== "") {
      this.setState((prevState) => ({
        list: prevState.list.map((item) =>
          item.id === id ? { ...item, value: editedTodo } : item
        ),
      }));
    }
  };

  render() {
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
                value={this.state.userInput}
                onChange={(e) => this.updateInput(e.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
              
            </InputGroup>
          </Col>
        </Row>
        <Row>
            <Col md={{ span: 5, offset: 8}}>
            <InputGroup>
            <Button
                variant="dark"
                className="mt-2"
                onClick={this.addItem}
              >
                ADD
              </Button>
              </InputGroup>
            </Col>
          
        </Row>
        <br />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.state.list.map((item) => (
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
                      onClick={() => this.deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => this.editItem(item.id)}
                    >
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
}

export default App;