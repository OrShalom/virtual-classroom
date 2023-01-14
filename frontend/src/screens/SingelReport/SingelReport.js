import React, { useEffect, useState } from "react";
import {  Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './SingelReport.css'
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

export const SingelReport = () => {

    const { id} = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState("");
    const fetching = async () => {
        const { data } = await axios.get(`/api/patients/report/${id}`);
        setReport(data);
    };
    
    const exportToExcel = () => {
        const data = [
            { type: 'Letters data list', SessionWithoutDisturbances: `${report.WithoutlettersDataList}`,SessionWithDisturbances: `${report.WithlettersDataList}` },
            { type: 'Times of should press', SessionWithoutDisturbances: `${report.WithoutTimesOfShouldPress}`,SessionWithDisturbances: `${report.WithTimesOfShouldPress}` },
            { type: 'Pressed and should', SessionWithoutDisturbances: `${report.WithoutPressedAndshould}`, SessionWithDisturbances: `${report.WithPressedAndshould}` },
            { type: 'Pressed and should not', SessionWithoutDisturbances: `${report.WithoutPressedAndshouldNot}`, SessionWithDisturbances: `${report.WithPressedAndshouldNot}` },
            { type: 'Not pressed and should', SessionWithoutDisturbances: `${report.WithoutNotPressedAndshould}`, SessionWithDisturbances: `${report.WithNotPressedAndshould}` },
            { type: 'Head rotation', SessionWithoutDisturbances: `${report.WithoutHeadRotation}`, SessionWithDisturbances: `${report.WithHeadRotation}` },
            { type: 'Disturbances metadata', SessionWithoutDisturbances: '',SessionWithDisturbances: `${report.DisturbancesMetadata}` },
            
        ];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data1 = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});
        FileSaver.saveAs(data1, `${report.PatientId} - ${report.Time}.xlsx`);

    }

    useEffect( ()  => {  
    fetching();
  }, [id,report]);

    return (

      <Container className="startScreen">
          {report && 
              <Container>
                  <h3 className="h1-report"><b style={{ color: '#127ba3' }}> {report.PatientId} - {report.Time}</b></h3>
                    <div className='div-input-history'>
                      <div className='div-input-web-history'>
                    <h5><b style={{ color: 'blue' }} >Session Without Disturbances:</b></h5>
                            <p>Letters data list: {report.WithoutlettersDataList}</p>
                            <p>Times of should press: {report.WithoutTimesOfShouldPress }</p>
                        <p>Pressed and should: {report.WithoutPressedAndshould}</p>
                        <p>Pressed and should not: {report.WithoutPressedAndshouldNot}</p>
                        <p>Not pressed and should: {report.WithoutNotPressedAndshould}</p>
                        <p>Head rotation: {report.WithoutHeadRotation }</p>
                      </div>
                      <div>
                        <h5><b style={{ color: 'blue' }} >Session With Disturbances:</b></h5>
                            <p>Letters data list: {report.WithlettersDataList}</p>
                            <p>Times of should press: {report.WithTimesOfShouldPress }</p>
                        <p>Pressed and should: {report.WithPressedAndshould}</p>
                        <p>Pressed and should not: {report.WithPressedAndshouldNot}</p>
                        <p>Not pressed and should: {report.WithNotPressedAndshould}</p>
                        <p>Head rotation: {report.WithHeadRotation}</p>
                        <p>Disturbances metadata: {report.DisturbancesMetadata }</p>
                        </div>
                       
                    </div>
                    <div className="div-export-button">
                    <Button onClick={exportToExcel}>Export to Excel</Button>
                    </div>
                  </Container>
          }
            </Container> 
          
    
  );
};