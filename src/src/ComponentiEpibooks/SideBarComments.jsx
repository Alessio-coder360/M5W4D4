import { Button } from 'react-bootstrap';
import NewComment from './AddComment';
import ListaCommenti from './CommentList';
import { useState, useEffect } from 'react';

const SideBarComments = ({ book, show, onClose }) => {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editForm, setEditForm] = useState({
    comment: '',
    rate: 1
  });

  const handleEditComment = (commentId, currentComment) => {
    setEditingComment(commentId);
    setEditForm({
      comment: currentComment.comment,
      rate: currentComment.rate
    });
  };

  const submitEdit = (commentId) => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment: editForm.comment,
        rate: editForm.rate,
        elementId: book.asin
      }),
      headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzZhMjUzMDRhNzAwMTUxNDhiNDUiLCJpYXQiOjE3Mzk5ODQ0NTYsImV4cCI6MTc0MTE5NDA1Nn0.35diMCT59ubFNEHfUAW6VrC7mMlpYvMEKBH1hcEho4U"
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Errore nella modifica');
      fetchComments();
      setEditingComment(null);
    })
    .catch(error => console.error(error));
    
  };





  

  const handleDeleteComment = (commentId) => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzZhMjUzMDRhNzAwMTUxNDhiNDUiLCJpYXQiOjE3Mzk5ODQ0NTYsImV4cCI6MTc0MTE5NDA1Nn0.35diMCT59ubFNEHfUAW6VrC7mMlpYvMEKBH1hcEho4U"
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Errore nella cancellazione');
      fetchComments();
    })
    .catch(error => console.error(error));
  };

  const fetchComments = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/comments/${book.asin}`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxYzZhMjUzMDRhNzAwMTUxNDhiNDUiLCJpYXQiOjE3Mzk5ODQ0NTYsImV4cCI6MTc0MTE5NDA1Nn0.35diMCT59ubFNEHfUAW6VrC7mMlpYvMEKBH1hcEho4U"
      }
    })
    .then(res => res.json())
    .then(data => setComments(data))
    .catch(error => console.error(error));
  };

  useEffect(() => {
    if (show && book.asin) {
      fetchComments();
    }
  }, [book.asin, show]);

  return (
    <div className={`sidebar ${show ? 'show' : ''}`} 
      style={{
        width: '400px',
        position: 'fixed',
        right: show ? '0' : '-400px',
        top: 0,
        height: '100vh',
        backgroundColor: '#212529',
        color: 'white',
        padding: '20px',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.3)',
        transition: 'right 0.3s ease',
        zIndex: 1000,
        overflowY: 'auto'
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ color: 'white' }}>Dettagli Libro</h4>
        <Button variant="dark" onClick={onClose}>X</Button>
      </div>

      <div className="book-details mb-4">
        <img 
          src={book.img} 
          alt={book.title}
          style={{ 
            width: '150px',
            height: '200px',
            objectFit: 'cover',
            float: 'left',
            marginRight: '15px',
            marginBottom: '10px'
          }}
        />
        <h5 className="mt-2" style={{ color: 'white' }}>{book.title}</h5>
        <p className="mb-1" style={{ color: 'white' }}>
          <strong>Categoria:</strong> {book.category}
        </p>
        <p className="mb-1" style={{ color: 'white' }}>
          <strong>ASIN:</strong> {book.asin}
        </p>
        <p className="mb-3" style={{ color: 'white' }}>
          <strong>Prezzo:</strong> {book.price} €
        </p>
      </div>

      <div className="d-flex flex-column text-center-align-items-center my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="border-bottom pb-2" style={{ color: 'white' }}>Recensioni</h5>
        </div>

        <div className='my-3'>
          <Button 
            variant="success"
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Chiudi Form' : 'Aggiungi Recensione'}
          </Button>
        </div>

        {showForm && (
          <div className="mb-4">
            <NewComment 
              asin={book.asin} 
              AddedCommment={() => {
                fetchComments();
                setShowForm(false);
              }}
            />
          </div>
        )}

        <ListaCommenti 
          comments={comments}
          handleDelete={handleDeleteComment}
          handleEdit={handleEditComment}
          editingComment={editingComment}
          editForm={editForm}
          setEditForm={setEditForm}
          submitEdit={submitEdit}
        />
      </div>
    </div>
  );
};

export { SideBarComments };
