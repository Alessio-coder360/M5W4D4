import { ListGroup, Button, Form } from 'react-bootstrap';

const ListaCommenti = ({ 
  comments, handleDelete, handleEdit, editingComment, editForm, submitEdit }) => 
    {
  return (
    <ListGroup className="mt-3">
      {comments.length === 0 ? (
        <ListGroup.Item>Nessun Commento trovato</ListGroup.Item>
      ) : (
        comments.map((comment) => (
          <ListGroup.Item key={comment._id} className="d-flex justify-content-between align-items-center">
            {editingComment === comment._id ? (
              // Form di modifica
              <Form>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={editForm.comment}
                    onChange={(e) => setEditForm({...editForm, comment: e.target.value})}
                  />
                  <Form.Control
                    type="number"
                    min="1"
                    max="5"
                    value={editForm.rate}
                    onChange={(e) => setEditForm({...editForm, rate: parseInt(e.target.value)})}
                  />
                </Form.Group>
                <Button onClick={() => submitEdit(comment._id)}>Salva</Button>
              </Form>
            ) : (
              // Visualizzazione normale
              <>
                <div>
                  <p className="mb-1">{comment.comment}</p>
                  <small className="text-muted">Valutazione: {comment.rate}/5 ⭐</small>
                </div>
                <Button 
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(comment._id)}
                >
                 <i class="bi bi-trash"></i>
                </Button>

                <Button 
                  variant="success"
                  size="sm"
                  onClick={() => handleEdit(comment._id, comment)}
                >
                <i class="bi bi-pencil-square"></i>
                </Button>
              </>
            )}
          </ListGroup.Item>
        ))
      )}
    </ListGroup>
  );
};

export default ListaCommenti;