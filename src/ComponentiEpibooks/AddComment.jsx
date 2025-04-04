import React, { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { authHeaders, BASE_URL } from '../api/api-config';

const NewComment = ({ asin,   AddedCommment }) => {
    const [Addcomment, setAddComment] = useState('');
    const [rate, setRate] = useState(1);
    
   

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`${BASE_URL}/comments/`, {
                method: 'POST',
                body: JSON.stringify({
                    comment: Addcomment,
                    rate: rate,
                    elementId: asin
                }),
                headers: {
                    'Content-type': 'application/json',
                    ...authHeaders}
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



