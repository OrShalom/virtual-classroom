import React, { useEffect } from 'react';
import './StartScreening.css'
import { Spinner, Container, Button } from "react-bootstrap";
import { StopScreening } from '../../actions/patientsActions';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate,useParams} from 'react-router-dom';

export const StartScreening = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const { id} = useParams();

 const reportsList = useSelector((state) => state.patientReports);
 const { loading, reports, error } = reportsList;
 dispatch(reportsPatients(id));

  useEffect(() => {
 
    dispatch(reportsPatients(id));
    // if (successStartSceen=="false") {
    //   navigate(`/ScanHistory/:${id}`);
    // }

  },[dispatch])
  
    return (
        <Container className="startScreen">
            <Spinner animation="grow" variant="warning" />
            <h1>Start screening</h1>
            <h4 className="h4-screen">Start 2 sessions in our virtual class room. First, without disturbances, Second With disturbances.
               </h4>
            <h4>In every session you will have the same mission to complete.</h4>
            <br/>
            <div>
                <h5>Instructions:</h5> 
                <h5>1. Put the headset</h5>  
                <h5>2. First session without disturbances starsts.</h5> 
                <h5>3. Press the button whenever you ready to start the session.</h5> 
                <h5>4. Press the button when the letter 'X' appears after the letter 'A'</h5> 
                <h5>5. Ten minutes break</h5> 
                <h5>6. Second session with disturbances starsts.</h5> 
            </div>
            <br/>
            <Button variant="danger"
              href={`/patients`}
              onClick={() => {
                if(window.confirm("Are you sure?"))
                {
                  dispatch(StopScreening());
                }

            }}>Stop screening</Button>{' '}
          
            </Container>
  );
};