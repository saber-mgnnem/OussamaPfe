import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function ListeCoours() {
    const {id} = useParams();
    const [viewCours, setViewCours] = useState([]);
    
    useEffect(() => {
        axios.get(`/api/Etudiant_Cours/${id}`).then(response => {
            if (response.data.status === 200) {
                setViewCours(response.data.Cour);
                console.log(viewCours);
            }
        }).catch(error => {
            // Handle error
            console.error('Error fetching inscription:', error);
        });
    }, [id]);

    return (
        <div>
        <h1>Liste des Cours</h1>
        <ul>
            {viewCours.map((course, index) => (
                <li key={index}>
                    <a href={course.pdfUrl} target="_blank" rel="noopener noreferrer">{course.cour	}</a>
                </li>
            ))}
        </ul>
    </div>    );
}

export default ListeCoours;
