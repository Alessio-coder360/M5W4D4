


import { useState, useEffect } from "react"
import ListaCommenti from "./CommentList"
import NewComment from "./AddComment"

const CommentArea = function({ asin }) {
    const [comments, setComments] = useState([])
    const [error, setError] = useState(null)

    const fetchComments = 
    () => {
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
            <NewComment 
            asin={asin} 
            AddedCommment = {() => fetchComments()}/>
        </div>
    )
}

export default CommentArea