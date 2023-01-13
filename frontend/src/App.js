  
import React from 'react'
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import LandingPage from './screens/LandingPage/LandingPage';
import { BrowserRouter , Route,Routes } from "react-router-dom";
import MyPatients from './screens/MyPatients/MyPatients';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreatePatient from './screens/CreatePatient/CreatePatient';
import SingelPatient from './screens/SinglPatient/SinglPatient';
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { StartScreening } from './screens/StartScreening/StartScreening';
import { ScanHistory } from './screens/ScanHistory/ScanHistory';

const App = () => (
  <BrowserRouter>
  <Header />
    <main className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="/CreatePatient" element={<CreatePatient />} exact />
        <Route path="/patients/:id" element={<SingelPatient />} exact />
        <Route path="/profile" element={<ProfileScreen/>} exact/>
        <Route path="/patients" element={<MyPatients />} />
        <Route path="/screening/:id" element={<StartScreening />}  />
        <Route path="/ScanHistory/:id" element={<ScanHistory/>}exact />
      </Routes>
      
  </main>
  <Footer />
</BrowserRouter>

);

export default App;
