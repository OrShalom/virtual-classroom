import React, { useEffect,useState } from 'react';
import { Accordion, Button, Card,Form } from 'react-bootstrap';
import './ScanHistory.css'
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { reportsPatients } from '../../actions/patientsActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import MainScreen from '../../components/MainScreen';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

export const ScanHistory = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [search, setSearch] = useState("");

  const reportsList = useSelector((state) => state.patientReports);
  const { loading, reports, error } = reportsList;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
    dispatch(reportsPatients(id));

  },[dispatch,navigate,userInfo])
  console.log(reports)
  return (
    
    <MainScreen title='Scan history'>
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
              </Form>

    
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {/* {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )} */}
      {loading && <Loading />}
      {/* {loadingDelete && <Loading />} */}
      {reports &&
        reports.filter((filteredReports) =>
        filteredReports.Time.includes(search)
         )
        .reverse().map((report) => (
                <Accordion  key={report._id} >
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
                              {report.Time}
                                      </Accordion.Item>
                                      </div>           
                         </span>     
                          </CardHeader>
                          </CustomToggle>
                          <Accordion.Collapse eventKey="0">
                          <Card.Body >
                  <blockquote className="blockquote mb-0" >
                  <p>Patient email: {report.PatientId}</p>
                    <div className='div-input-history'>
                      <div className='div-input-web-history'>
                    <h5><b style={{ color: 'blue' }} >Session Without Disturbances:</b></h5>
                        <p>Letters data list: {report.WithoutlettersDataList}</p>
                        <p>Pressed and should: {report.WithoutPressedAndshould}</p>
                        <p>Pressed and should not: {report.WithoutPressedAndshouldNot}</p>
                        <p>Not pressed and should: {report.WithoutNotPressedAndshould}</p>
                        <p>Head rotation: {report.WithoutHeadRotation }</p>
                                  {/* <Button
                                      variant="danger"
                                      className="mx-2"
                                      onClick={()=>deleteHandler(patient._id)}
                          >Delete</Button> */}
                      </div>
                      <div>
                        <h5><b style={{ color: 'blue' }} >Session With Disturbances:</b></h5>
                        <p>Letters data list: {report.WithlettersDataList}</p>
                        <p>Pressed and should: {report.WithPressedAndshould}</p>
                        <p>Pressed and should not: {report.WithPressedAndshouldNot}</p>
                        <p>Not pressed and should: {report.WithNotPressedAndshould}</p>
                        <p>Head rotation: {report.WithHeadRotation}</p>
                        <p>Disturbances metadata: {report.DisturbancesMetadata }</p>
                      </div>
                      </div>
                      <footer className="blockquote-footer">
                        Created on Date {report.createdAt.substring(0, 10)}
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
  // return  (
  //   <Container className="startScreen">
  //     <h1>VR results</h1>
  //     </Container>
  // );
};