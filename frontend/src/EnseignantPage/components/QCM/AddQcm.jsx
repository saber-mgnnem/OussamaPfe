import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button } from "@mui/material";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const AddQcm = () => {

  const [formationOptions, setFormationOptions] = useState([]);
  const [FormationId, setFormationId] = useState("");
  const [enseignant_id, setenseignant_id] = useState("");
  const [name, setname] = useState('');
  const [dateExpiration, setdateExpiration] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('auth_USER'));
    setenseignant_id(authUser.id);
  }, []);

  useEffect(() => {
    if (enseignant_id) {
      axios.get(`/api/Enseignant_formations/${enseignant_id}`).then(response => {
        // Handle the response data
        if (response.data.status === 200) {
          setFormationOptions(response.data.formations);
        }
      });
    }
  }, [enseignant_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuiz = {
      FormationId,
      enseignant_id,
      name,
      dateExpiration,
    };

    axios.post('/api/quizzes', newQuiz)
      .then(response => {
        console.log(response);
        setname('');
        setdateExpiration('');
        swal("Success",response.data.message,"success");
        navigate('/Enseignant/liste_qcm');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Ajouter Nouvelle QCM</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <label className="input-group-text">Formation</label>
          <select
            value={FormationId}
            onChange={(e) => setFormationId(e.target.value)}
            className="formSelect"
          >
            <option>Choose...</option>
            {formationOptions.map(option => (
              <option key={option.id} value={option.id}>{option.title}</option>
            ))}
          </select>
        </div>
        <label>
          Nom de Qcm:
          <input type="text" value={name} onChange={e => setname(e.target.value)} />
        </label>
        <label>
          Date d'expiration:
            <input type="date" value={dateExpiration} onChange={e => {setdateExpiration(e.target.value)}}
            />
        </label>
        
        <Box p="20px" mt="20px">
          <Button style={{ backgroundColor: 'rgb(21, 170, 150)' }} type="submit" color="secondary" variant="contained">
            Ajouter QCM
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddQcm;
