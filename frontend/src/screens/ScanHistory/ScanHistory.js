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

  function CustomToggle({ children, eventKey ,cardId}) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      navigate(`/SingelReport/${cardId}`)
    );
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
      {loading && <Loading />}
      {reports &&
        reports.filter((filteredReports) =>
        filteredReports.Time.includes(search)
         )
        .reverse().map((report) => (
                <Accordion  key={report._id} >
                    <Card style={{ margin: 10 }} >
                       <CustomToggle eventKey="0" cardId={report._id} >
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
                         
                      </Card>   
                      </Accordion>  
                   ))    
              }        
</MainScreen>
  )
};