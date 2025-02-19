// import { ListGroup } from 'react-bootstrap';

// const ListaCommenti = ({ commenti }) => {
//   return (
//     <ListGroup className="mt-3">
//       {commenti.length === 0 ? (
//         <ListGroup.Item>Nessun commento presente</ListGroup.Item>
//       ) : (
//         commenti.map((commento) => (
//           <ListGroup.Item key={commento._id}>
//             <p className="mb-1">{commento.comment}</p>
//             <small className="text-muted">Valutazione: {commento.rate}/5 ⭐</small>
//           </ListGroup.Item>
//         ))
//       )}
//     </ListGroup>
//   );
// };

// export default ListaCommenti;

import { ListGroup } from 'react-bootstrap';

const ListaCommenti = ({ comments }) => {
    return (
        <ListGroup className="mt-3">
            {comments.length === 0 ? (
                <ListGroup.Item>Nessun Commento trovato</ListGroup.Item>
            ) : (
                comments.map((comment) => (
                    <ListGroup.Item key={comment._id}>
                        <p className="mb-1">{comment.comment}</p>
                        <small className="text-muted">Valutazione: {comment.rate}/5 ⭐</small>
                    </ListGroup.Item>
                ))
            )}
        </ListGroup>
    );
};

export default ListaCommenti;