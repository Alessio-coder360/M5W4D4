


import { useState, useEffect } from "react"
import ListaCommenti from "./CommentList"
import NewComment from "./AddComment"
import { authHeaders, BASE_URL } from '../api/api-config';

const CommentArea = function({ asin }) {
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)

    const fetchComments = 
    () => {
        fetch(`${BASE_URL}/comments/${asin}`, {
            headers: {
                'Content-type': 'application/json',
                ...authHeaders
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
            <NewComment 
            asin={asin} 
            AddedCommment = {() => fetchComments()}/>
        </div>
    )
}

export default CommentArea