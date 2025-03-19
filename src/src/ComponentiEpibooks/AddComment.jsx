import React, { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';

const NewComment = ({ asin,   AddedCommment }) => {
    const [Addcomment, setAddComment] = useState('');
    const [rate, setRate] = useState(1);
    
   

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/', {
                method: 'POST',
                body: JSON.stringify({
                    comment: Addcomment,
                    rate: rate,
                    elementId: asin
                }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzZhMjUzMDRhNzAwMTUxNDhiNDUiLCJpYXQiOjE3Mzk5ODQ0NTYsImV4cCI6MTc0MTE5NDA1Nn0.35diMCT59ubFNEHfUAW6VrC7mMlpYvMEKBH1hcEho4U"
                }
            });
            if (response.ok) {
                alert('Commento aggiunto!');
                setAddComment('');
                setRate(1);
                AddedCommment?.();
            } else {
                throw new Error('Errore nel salvataggio del commento');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form onSubmit={handleComment}>
            <FloatingLabel controlId="commentText" label="Commento">
                <Form.Control
                    as="textarea"
                    placeholder="Lascia un commento qui"
                    value={Addcomment}
                    onChange={(e) => setAddComment(e.target.value)}
                    style={{ height: '100px' }}
                />
            </FloatingLabel>
            <Form.Group className="my-3">
                <Form.Label>Valutazione</Form.Label>
                <Form.Control
                    type="number"
                    min="1"
                    max="5"
                    value={rate}
                    onChange={(e) => setRate(parseInt(e.target.value))}
                />
            </Form.Group>
            <Button type="submit">Invia commento</Button>
        </Form>
    );
};

export default NewComment;



