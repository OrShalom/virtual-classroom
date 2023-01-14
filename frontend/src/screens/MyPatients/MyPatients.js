import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Link ,useNavigate} from 'react-router-dom';
import { Accordion, Button, Card,Form } from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { useDispatch, useSelector } from "react-redux";


import { listPatients,deletePatientAction,StartScreening } from '../../actions/patientsActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

import './MyPatients.css'

function MyPatients() {

   const [SessionLengthInMin, setSessionLengthInMin] = useState("1");
   const [LettersDelayInSec, setLettersDelayInSec] = useState("10");
   const [DisturbanceTimeRangeMin, setDisturbanceTimeRangeMin] = useState("15");
   const [DisturbanceTimeRangeMax, setDisturbanceTimeRangeMax] = useState("20");
   const [AmountOfShouldPress, setAmountOfShouldPress] = useState("2");

  const [search, setSearch] = useState("");
  let patientID = "";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const patientsList = useSelector((state) => state.patientList);
  const { loading, patients, error } = patientsList;

  const patientCreate = useSelector((state) => state.patientCreate);
  const {  success: successCreate } = patientCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientUpdate = useSelector((state) => state.patientUpdate);
  const { success: successUpdate } = patientUpdate;


  const startScreen = useSelector((state) => state.startScreen);
  const {loading:StartSceenLoading, success: successStartSceen ,msg} = startScreen;
 

  // const startScreen = useSelector((state) => state.startScreen);
  // const {loading:StartSceenLoading, success: successStartSceen ,meg} = startScreen;

  const patientDelete = useSelector((state) => state.patientDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = patientDelete;

 

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePatientAction(id));
    }
  };
  

  //func for show and hide the Accordion
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );
    //make button for the Accordion
    return (
      <button
        type="button"
        style={{ background: 'none', border: "none" }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }


  
  
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }

    dispatch(listPatients());

  },[dispatch,successCreate,navigate,userInfo,successUpdate,successDelete])
  
 
  return (
    
    <MainScreen title='Patients'>
        <Form style={{display:"flex" }}>
        <Form.Control
          style={{
            marginBottom: 6,marginLeft:10, 
            width: 928,
            height: 45}}
                  type="search"
                  placeholder="Search"
                  className="me-2"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
            <Link to='/createPatient'>
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                  Add New Patient
              </Button>
      </Link>
              </Form>

    
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {patients &&
        patients.filter((filteredPatient) =>
           filteredPatient.title.toLowerCase().includes(search.toLowerCase())
         )
        .reverse().map((patient) => (
                
                <Accordion  key={patient._id} >
                    <Card style={{ margin: 10 }} >
                       <CustomToggle eventKey="0" >
                    <CardHeader style={{display:"flex"}} >
                        <span  style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                        }}>
                          <div>
                                <Accordion.Item   as={Card.Text} variant="link" eventKey='0'>
                              {patient.title}
                                      </Accordion.Item>
                                      </div>           
                         </span>     
                          </CardHeader>
                          </CustomToggle>
                          <Accordion.Collapse eventKey="0">
                          <Card.Body id="1">
                        <blockquote className="blockquote mb-0" >
                          <div className='div-input'>
                          <div className='div-input-web'>
                          <p>First name: {patient.firstName}</p>
                          <p>Last name: {patient.lastName}</p>
                          <p>ID: {patient.id}</p>
                          <p>Gander: {patient.gander}</p>
                          <p>Date of birth: {patient.dateOfBirth.substring(0,10)}</p>
                          <p>Email: {patient.email}</p>
                          <p>Recommendation: {patient.recommendation}</p>
                          <p>Medicines: {patient.medicines}</p>
                            </div>
                            <div>
                              <h5><b style={{ color: 'blue' }} >Please enter the session details:</b></h5>
                            <Form.Group className='title-12' controlId="firstName">
                <Form.Label className='label-input'>Session length:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Session length"
                  value={SessionLengthInMin}
                  onChange={(e) => setSessionLengthInMin(e.target.value)}
                ></Form.Control>
                              </Form.Group>
                              <Form.Group className='title-12' controlId="Letters delay">
                <Form.Label className='label-input'>Letters delay:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Letters delay"
                  value={LettersDelayInSec}
                  onChange={(e) => setLettersDelayInSec(e.target.value)}
                ></Form.Control>
                              </Form.Group>
                              <Form.Group className='title-12' controlId="DisturbanceTimeRange">
                <Form.Label className='label-input-Range'>Disturbance time range:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="MIN"
                  value={DisturbanceTimeRangeMin}
                  onChange={(e) => setDisturbanceTimeRangeMin(e.target.value)}
                                ></Form.Control>
                                 <Form.Control
                  type="text"
                  placeholder="MAX"
                  value={DisturbanceTimeRangeMax}
                  onChange={(e) => setDisturbanceTimeRangeMax(e.target.value)}
                ></Form.Control>
                              </Form.Group>
                              <Form.Group className='title-12' controlId="Clicks amount">
                <Form.Label className='label-input' >Clicks amount:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Clicks amount"
                  value={AmountOfShouldPress}
                  onChange={(e) => setAmountOfShouldPress(e.target.value)}
                ></Form.Control>
                              </Form.Group>
                            </div>
                            </div>
                          <div style={{float:"right"}}>
                      <Button
                        // href={`/screening/${patient._id}`}
                       
                            className="mx-2"
                            variant="success"
                            onClick={() => {
                              window.confirm("The scan starts");
                             patientID = patient._id;
                            console.log(successStartSceen)
                              dispatch(StartScreening(patientID, SessionLengthInMin, LettersDelayInSec, DisturbanceTimeRangeMin, DisturbanceTimeRangeMax, AmountOfShouldPress, patient));
                              navigate(`/screening/${patient._id}`)
                            }}>start screening</Button>
                          <Button href={`/ScanHistory/${patient._id}`}
                            className="mx-2"
                            variant="dark"
                          >Scan history</Button>
                                  <Button href={`/patients/${patient._id}`}>Edit</Button>
                                  <Button
                                      variant="danger"
                                      className="mx-2"
                                      onClick={()=>deleteHandler(patient._id)}
                          >Delete</Button>
                            
                                  </div>
                      <footer className="blockquote-footer">
                        Created on Date {patient.createdAt.substring(0, 10)}
                      </footer>
                    </blockquote>
                              </Card.Body>
                              </Accordion.Collapse>
                      </Card>   
                      </Accordion>  
                      
                  ))
              }
             
        
          
</MainScreen>
  )
}

export default MyPatients