

import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
//import ReactMarkdown from "react-markdown";
import { useNavigate ,useParams } from "react-router-dom";
import { updatePatientAction,deletePatientAction } from "../../actions/patientsActions";

function SingelPatient() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
    const [firstName, setFirstName] = useState("");
    const [category, setCategory] = useState("");
    const [lastName, setLastName] = useState("");
    const [id_p, setId] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("12/04/1996");
    const [gander, setGander] = useState("male");
    const [email, setEmail] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [report, setReport] = useState("");
    const [medicines, setMedicines] = useState("");
    const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const { id} = useParams();
    const navigate = useNavigate();


    
    const patientUpdate = useSelector((state) => state.patientUpdate);
    const { loading, error } = patientUpdate;
    
   const patientDelete = useSelector((state) => state.patientDelete);
   const {
     loading: loadingDelete,
     error: errorDelete,
     success: successDelete,
   } = patientDelete;

   const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePatientAction(id));
    }
       navigate("/patients");
  };

  const resetHandler = () => {
    setTitle("");
    setCategory("");
      setContent("");
      setDateOfBirth("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setMedicines("");
      setGander("");
      setRecommendation("");
      setReport("");
  };
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updatePatientAction(id, firstName, lastName, id_p, dateOfBirth, gander, email, recommendation, medicines));
      if (!firstName || !lastName || !id_p   || !gander || !email) return;

    resetHandler();
    navigate("/patients");
  };
 

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/patients/${id}`);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            const temp=data.dateOfBirth.substring(0,10)
            setDateOfBirth(temp);
            console.log(temp)
            setDate(data.updatedAt);
            setEmail(data.email);
            setGander(data.gander);
            setId(data.id);
            setMedicines(data.medicines);
            setRecommendation(data.recommendation);
           
    };

    fetching();
  }, [id, date]);

  return (
    <MainScreen title="Edit Patient">
      <Card>
        <Card.Header>update patient</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
          {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>First Name </Form.Label>
              <Form.Control
                type="firstName"
                value={firstName}
                placeholder="Enter first name"
                onChange={(e) => setFirstName(e.target.value)}
              />
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                type="lastName"
                value={lastName}
                placeholder="Enter last name"
                onChange={(e) => setLastName(new Date(e.target.value))}
              />
                      </Form.Group>
               
                      <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>ID </Form.Label>
              <Form.Control
                type="id"
                value={id_p}
                placeholder="Enter ID"
                onChange={(e) => setId(e.target.value)}
              />
                      </Form.Group >
                    
                      <Form.Group controlId="content"  >
                          <Form.Label>Gender </Form.Label>
        
                          <Form.Select className="from-select"
                          style={{ margin: 10 }}
                            type="gander"
                            value={gander}
                            placeholder="Enter gender"
                            onChange={(e) => setGander(e.target.value)}>
                              <option>male</option>
                              <option>female</option>
                          </Form.Select>
                          </Form.Group >
                          <Form.Group controlId="content"  >
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                style={{ width: 130 }}
                type="date"       
                              value={dateOfBirth}
                placeholder="Enter the date"
                
                onChange={(e) => {
                  
                  setDateOfBirth(e.target.value)
                }
                }
                          />
                          
                      </Form.Group>
                      <Form.Group controlId="content">
                          
              <Form.Label>Email</Form.Label>
              <Form.Control
                              value={email}
                              type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Recommendation</Form.Label>
              <Form.Control
                as="textarea"
                value={recommendation}
                placeholder="Enter the recommendation"
                rows={4}
                onChange={(e) => setRecommendation(e.target.value)}
              />
                      </Form.Group>
                      <Form.Group controlId="content">
              <Form.Label>Medicines</Form.Label>
              <Form.Control
                as="textarea"
                value={medicines}
                placeholder="Enter medicines of the patient"
                rows={4}
                onChange={(e) => setMedicines(e.target.value)}
              />
            </Form.Group>
             <br/>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
            Update Patient
            </Button>
            <Button className="mx-2" onClick={deleteHandler} variant="danger">
            Delete Patient
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingelPatient;