import {useEffect, useState} from "react";
import axios from "axios";
import PostCard from "./components/PostCard";
import {Button, InputGroup, Modal} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function App() {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then(response => {
                setPosts(response.data)
            })
    }, [])

    const handleShow = () => {
        setShowModal(true);
    }
    const handleClose = () => {
        setShowModal(false);
    }

    const handleSubmit = () => {
        axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                title: title,
                body: body,
                userId: 1
            }, {
                headers: {
                    autherization: "test"
                }
            }).then(res => {
                console.log("res: ", res)
                setShowModal(false);
            })

    }


  return (
      <div>
          <Button variant="primary" onClick={handleShow}>
              Add Post
          </Button>

          <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Add new post</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <InputGroup className="mb-3">
                      <Form.Control
                          placeholder="Title"
                          aria-label="Title"
                          aria-describedby="basic-addon1"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                      />
                  </InputGroup>
                  <InputGroup className="mb-3">
                      <Form.Control
                          placeholder="Body"
                          aria-label="Body"
                          aria-describedby="basic-addon1"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                      />
                  </InputGroup>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                      Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                      Save Changes
                  </Button>
              </Modal.Footer>
          </Modal>

    <div style={{display: "flex", flexWrap: 'wrap', gap: '2rem', justifyContent: 'center'}} >
        {
            posts.map(post => {
               return  <PostCard key={post.id} title={post.title} body={post.body} />
            })
        }
    </div>
      </div>
  );
}

export default App;
