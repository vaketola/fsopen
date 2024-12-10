import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfoPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosisList = async () => {
      const diagnoses = await patientService.getDiagnoses();
      setDiagnoses(diagnoses);
    };

    void fetchPatientList();
    void fetchDiagnosisList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientInfoPage diagnoses={diagnoses} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
