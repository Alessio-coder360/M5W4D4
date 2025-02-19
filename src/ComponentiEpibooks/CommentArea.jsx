// import { useState, useEffect } from 'react';
// import ListaCommenti from './CommentList';

// const AreaCommenti = ({ asin }) => {
//   const [commenti, setCommenti] = useState([]);
//   const [errore, setErrore] = useState(null);
//   const [caricamento, setCaricamento] = useState(true);

//   const caricaCommenti = async () => {
//     try {
//       const response = await fetch(
//         `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
//         {
//           headers: {
//             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzZhMjUzMDRhNzAwMTUxNDhiNDUiLCJpYXQiOjE3Mzk5ODQ0NTYsImV4cCI6MTc0MTE5NDA1Nn0.35diMCT59ubFNEHfUAW6VrC7mMlpYvMEKBH1hcEho4U"
//           }
//         }
//       );
//       if (!response.ok) throw new Error('Errore nel caricamento dei commenti');
//       const data = await response.json();
//       setCommenti(data);
//     } catch (errore) {
//       setErrore(errore.message);
//     } finally {
//       setCaricamento(false);
//     }
//   };

//   useEffect(() => {
//     caricaCommenti();
//   }, [asin]);

//   if (errore) return <div className="text-danger">Errore: {errore}</div>;
//   if (caricamento) return <div className="text-info">Caricamento commenti in corso...</div>;

//   return <ListaCommenti commenti={commenti} />;
// };

// export default AreaCommenti;



import { useState, useEffect } from "react"
import ListaCommenti from "./CommentList"

const CommentArea = function({ asin }) {
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)

    const fetchComments = () => {
        fetch(`https://striveschool-api.herokuapp.com/api/comments/${asin}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzZhMjUzMDRhNzAwMTUxNDhiNDUiLCJpYXQiOjE3Mzk5ODQ0NTYsImV4cCI6MTc0MTE5NDA1Nn0.35diMCT59ubFNEHfUAW6VrC7mMlpYvMEKBH1hcEho4U"
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Errore nella fetch")
            }
            return res.json()
        })
        .then(data => {
            setComments(data) // i dati arrivano già come array
        })
        .catch(error => {
            console.error("Errore nel fetch:", error)
            setError(error.message)
        })
    }

    useEffect(() => {
        if (asin) {
            fetchComments()
        }
    }, [asin]) // aggiunto asin come dipendenza

    return (
        <div>
            {error && <div>Error: {error}</div>}
            <ListaCommenti comments={comments} />
        </div>
    )
}

export default CommentArea