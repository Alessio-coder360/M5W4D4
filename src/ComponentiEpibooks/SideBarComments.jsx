import { Button } from 'react-bootstrap';
import NewComment from './AddComment';
import ListaCommenti from './CommentList';
import { useState, useEffect,useCallback } from 'react';
import { authHeaders, BASE_URL } from '../api/api-config';

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
    fetch(`${BASE_URL}/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment: editForm.comment,
        rate: editForm.rate,
        elementId: book.asin
      }),
      headers: {
        'Content-type': 'application/json',
        ...authHeaders
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
    fetch(`${BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        ...authHeaders
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Errore nella cancellazione');
      fetchComments();
    })
    .catch(error => console.error(error));
  };

  // ✨ useCallback memorizza la funzione fetchComments


  // È come mettere la funzione in una scatola speciale che 
  // React ricorda tra i rendering
  const fetchComments = useCallback(() => {
    // Questa è la funzione che vogliamo memorizzare
    fetch(`${BASE_URL}/comments/${book.asin}`, {
      headers: { ...authHeaders }
    })
    .then(res => res.json())
    .then(data => {
      // Quando i dati arrivano, aggiorniamo lo stato
      setComments(data);
    })
    .catch(error => console.error(error));
  }, [book.asin]); 
  // ☝️ Questo array dice a React: "Ricrea questa funzione SOLO se 
  // uno di questi valori cambia". Altrimenti, usa la versione precedente.


// ! Il secondo parametro: array delle dipendenze
// ! Questo array [book.asin, BASE_URL, authHeaders] è fondamentale:

// ! React memorizza la funzione
// ! La ricrea SOLO quando uno di questi valori cambia
// ! Se questi valori non cambiano, React riusa la stessa funzione dell'ultimo render
// ! È come dire: "Questa funzione dipende da questi valori, ricreala solo se questi cambiano".


// ? Quando avviene un rendering?
// ? La prima volta che il componente appare nella pagina
// ?Quando cambia uno stato con setState o useState
// ?Quando un genitore si aggiorna


  
  // Ora possiamo usare fetchComments in useEffect senza creare un loop

  useEffect(() => {
    if (show && book.asin) {
      // Chiamiamo la funzione memorizzata
      fetchComments();
    }
  }, [book.asin, show, fetchComments]); 
  // ☝️ Qui includiamo fetchComments, ma non creerà un loop
  // perché fetchComments cambia solo quando cambia book.asin!


  // #La regola è DELLO USEFFECT E DELL'ARRAY DI DIPENDENZE: Includi come dipendenze solo valori che:

 // # Sono usati nella funzione
 // # Possono cambiare tra i render
// # Sono definiti all'interno del componente (props, stato, ecc.)





// ! Crea una versione "memorizzata" di una funzione. La ricrea solo quando le dipendenze specificate cambiano
// ? Normalmente, ogni volta che il componente si aggiorna, tutte le funzioni vengono ricreate
// # useCallback dice a React: "Tieni questa funzione in memoria e non la ricreare ogni volta"





  // Funzione per fermare la propagazione del click
  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {show && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', // Semi-trasparente
            zIndex: 1045
          }}
        />
      )}

      <div 
        className={`sidebar ${show ? 'show' : ''}`}
        onClick={handleSidebarClick}
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
          zIndex: 1050,
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
              objectFit: 'contain',
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
    </>
  );
};

export { SideBarComments };



//CURIoSITà: 


//prima dell'array di dipendenze, stai dicendo a ESLint di ignorare specificamente il warning sulla riga successiva.

//QUANDO USI : 

// eslint-disable-next-line react-hooks/exhaustive-deps







// SE DEVO RICHIAMARE FETCH COMMENTS IN USEEFFECT PER EVITARE IL WARNING E POI UN EFFETTO LOOP, DEVO DICHIARARE OGNI DIPENDENZA NELL ARRAY DELLO USEFFECT


// Nella terza soluzione (funzione interna), hai bisogno di includere tutte le variabili esterne che la funzione usa perché:

// React ha bisogno di sapere quando ricreare l'effetto
// Se una di queste variabili (book.asin, authHeaders, BASE_URL) cambia, l'effetto deve essere rieseguito
// Altrimenti userai versioni obsolete di queste variabili
// È come dire a React: "Questa funzione dipende da questi pezzi di dati, quindi quando cambiano rifai tutto".












// Cosa significa "si ridisegni" (component re-rendering)
// Esempio concreto: Immagina che React sia come un disegnatore con una lavagna cancellabile:

// Quando un componente "si disegna" o "renderizza", React letteralmente cancella e ridisegna quella parte dello schermo
// È come se stesse prendendo una gomma, cancellando quel pezzo di pagina, e disegnandolo di nuovo

// In termini pratici:




// ! REACT.MEMO

// function ContatoreApp() {
//   const [numero, setNumero] = useState(0);
  
//   // Ogni volta che clicchi "Aumenta":
//   // 1. React CANCELLA tutto quello che vedi sullo schermo
//   // 2. Esegue di nuovo tutto questo codice
//   // 3. RIDISEGNA tutto da zero
  
//   return (
//     <div>
//       <p>Il numero è: {numero}</p>
//       <button onClick={() => setNumero(numero + 1)}>Aumenta</button>
//     </div>
//   );
// }



// !USECALLBACK

// 2. Cosa significa "la funzione viene ricreata"
// Esempio concreto: Immagina di avere un blocco di appunti. Ogni volta che la pagina si aggiorna:

// React STRACCIA la pagina vecchia
// Prende un NUOVO foglio
// Riscrive TUTTO da zero, incluse tutte le funzioni


// function App() {
//   // Ogni volta che App si aggiorna:
//   // 1. React BUTTA VIA questa funzione
//   // 2. Ne crea una NUOVA con lo stesso codice
//   // 3. È come scrivere la stessa cosa su un nuovo foglio
//   const miaFunzione = () => console.log("Ciao");
  
//   return <button onClick={miaFunzione}>Cliccami</button>;
// }




// Come React.memo aiuta
// Esempio visivo: React.memo è come dire a React: 
// "Se le informazioni per questo disegno non sono cambiate, NON cancellare e ridisegnare. Lascia quello che c'è già."



// ! Versione normale: Si ridisegna SEMPRE
// function Bottone(props) {
//   console.log("Sto disegnando il bottone");
//   return <button>{props.testo}</button>;
// }



// !// Versione con memo: Si ridisegna SOLO se cambia props.testo
// const BottoneOttimizzato = React.memo(function Bottone(props) {
//   console.log("Sto disegnando il bottone");
//   return <button>{props.testo}</button>;
// });



// #In brevissimo:
// #"Si ridisegna" = React cancella e riscrive quella parte dello schermo
// #"La funzione viene ricreata" = React butta via la funzione vecchia e ne scrive una nuova identica
// #React.memo = "Se i dati non cambiano, non cancellare e ridisegnare"


// #È come la differenza tra:

// #Cancellare e riscrivere tutto ogni volta (normale)
// #Usare un foglio trasparente e cambiare solo ciò che serve (ottimizzato)




// # Cosa significa "Ridisegnare" (React.memo)
// # Immagina che React sia un bambino che disegna su un foglio:

// # Senza React.memo: Ogni volta che qualcosa cambia nella pagina, il bambino strappa il foglio intero, prende un foglio nuovo, e ridisegna tutto da capo.

// # Con React.memo: Il bambino è più intelligente e pensa: "Se questa parte del disegno non è cambiata, perché devo ridisegnarla? La lascio com'è


// !// Senza React.memo - ridisegna SEMPRE
// function DisegnoSemplice() {
//   console.log("Sto disegnando!");
//   return <div>Il mio bel disegno</div>;
// }

// ! Con React.memo - ridisegna SOLO se necessario
// const DisegnoIntelligente = React.memo(function DisegnoSemplice() {
//   console.log("Sto disegnando!");
//   return <div>Il mio bel disegno</div>;
// });




// ?Cosa significa "Ricreare funzioni" (useCallback)

// ?Immagina che le funzioni siano ricette di cucina:

// ?Senza useCallback: Ogni volta che la mamma cucina, riscrive la ricetta su un foglio nuovo, anche se è la stessa identica ricetta di ieri.

// ?Con useCallback: La mamma dice: "Perché devo riscrivere la ricetta se è uguale? Terrò il foglio vecchio finché non cambiano gli ingredienti!"



// ! // Senza useCallback - riscrive la ricetta ogni volta
// function Cucinare() {
//   // Questa ricetta viene riscritta da zero ogni volta
//   const preparaPasta = () => {
//     console.log("Bolli l'acqua e aggiungi la pasta");
//   };
  
//   return <button onClick={preparaPasta}>Cucina la pasta</button>;
// }

// !// Con useCallback - mantiene la stessa ricetta
// function CucinareIntelligente() {
//   // Questa ricetta viene scritta una volta e poi riutilizzata
//   const preparaPasta = useCallback(() => {
//     console.log("Bolli l'acqua e aggiungi la pasta");
//   }, []); // Il foglio della ricetta si conserva
  
//   return <button onClick={preparaPasta}>Cucina la pasta</button>;
// }



// !Esempi: React.memo da solo (senza useCallback)



// function MammaApp() {
//   const [biscotti, setBiscotti] = useState(5);
  
//   // !ATTENZIONE: Questa funzione è nuova OGNI VOLTA
//   const mangiaBiscotto = () => {
//     console.log("Munch munch!");
//   };
  
//   return (
//     <div>
//       <p>Abbiamo {biscotti} biscotti</p>
//       <button onClick={() => setBiscotti(biscotti + 1)}>Compra un biscotto</button>
      
//       {/* Anche con React.memo, si ridisegna comunque perché mangiaBiscotto è sempre nuova */}
//       <BambinoBravo mangiaBiscotto={mangiaBiscotto} nome="Luca" />
//     </div>
//   );
// }

// !Con React.memo
// const BambinoBravo = React.memo(function Bambino({ nome, mangiaBiscotto }) {
//   console.log(`${nome} si sta ridisegnando...`); // Questo si stampa COMUNQUE ad ogni click
//   return (
//     <div>
//       <p>Ciao! Sono {nome}</p>
//       <button onClick={mangiaBiscotto}>Mangia un biscotto</button>
//     </div>
//   );
// });


// #Cosa succede: Anche se usiamo React.memo, il bambino si ridisegna lo stesso perché la "ricetta" mangiaBiscotto è nuova ogni volta!



// !usecallback da sola 

// function MammaApp() {
//   const [biscotti, setBiscotti] = useState(5);
  
//   // Questa funzione è SEMPRE LA STESSA grazie a useCallback
//   const mangiaBiscotto = useCallback(() => {
//     console.log("Munch munch!");
//   }, []);
  
//   return (
//     <div>
//       <p>Abbiamo {biscotti} biscotti</p>
//       <button onClick={() => setBiscotti(biscotti + 1)}>Compra un biscotto</button>
      
//       {/* Ma il bambino si ridisegna comunque, perché non abbiamo React.memo! */}
//       <Bambino mangiaBiscotto={mangiaBiscotto} nome="Luca" />
//     </div>
//   );
// }

// !Senza React.memo
// function Bambino({ nome, mangiaBiscotto }) {
//   console.log(`${nome} si sta ridisegnando...`); // Questo si stampa ad ogni click
//   return (
//     <div>
//       <p>Ciao! Sono {nome}</p>
//       <button onClick={mangiaBiscotto}>Mangia un biscotto</button>
//     </div>
//   );
// }


// !Cosa succede: 
// !Anche se mangiaBiscotto è la stessa funzione, il bambino si ridisegna comunque perché non abbiamo detto a React di essere intelligente con React.memo!




// ? React.memo + useCallback insieme: 


// function MammaApp() {
//   const [biscotti, setBiscotti] = useState(5);
  
//   // Questa funzione è SEMPRE LA STESSA grazie a useCallback
//   const mangiaBiscotto = useCallback(() => {
//     console.log("Munch munch!");
//   }, []);
  
//   return (
//     <div>
//       <p>Abbiamo {biscotti} biscotti</p>
//       <button onClick={() => setBiscotti(biscotti + 1)}>Compra un biscotto</button>
      
//       {/* Questa combinazione è magica! */}
//       <BambinoBravissimo mangiaBiscotto={mangiaBiscotto} nome="Luca" />
//     </div>
//   );
// }

// ? Con React.memo
// const BambinoBravissimo = React.memo(function Bambino({ nome, mangiaBiscotto }) {
//   console.log(`${nome} si sta ridisegnando...`); // Questo si stampa SOLO LA PRIMA VOLTA!
//   return (
//     <div>
//       <p>Ciao! Sono {nome}</p>
//       <button onClick={mangiaBiscotto}>Mangia un biscotto</button>
//     </div>
//   );
// });



// ! Cosa succede: Magia! Il bambino si disegna solo la prima volta, poi non si ridisegna più quando aggiungiamo biscotti!
 
// ! Spiegazione finale super semplice
// ! React.memo è come un bambino intelligente che dice: "Se i miei giocattoli non sono cambiati, perché devo riordinare la stanza?"
 
// ! useCallback è come una mamma che dice: "Questa lista della spesa è uguale a quella di ieri, non serve riscriverla!"
 
// ! React.memo + useCallback insieme è come quando tutti in famiglia sono intelligenti e nessuno fa lavoro inutile:
 
// ! La mamma non riscrive le liste della spesa uguali (useCallback)
// ! Il bambino non riordina la stanza se i giocattoli sono gli stessi (React.memo)