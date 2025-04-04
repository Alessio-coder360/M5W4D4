import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row, Col, Badge } from 'react-bootstrap'; 
import { useState, useContext } from 'react';
import { CartContext } from '../CartComponents/Cart'; // Corretto il percorso di import
import ModalCart from '../CartComponents/ModalCart';

import logo from '../libri.png';
import '../App.css';
import "./Title.Style.css";

import { Libro } from './SingleBook';

// SPIEGAZIONE DELLE FUNZIONALITÀ DI RICERCA:

// 1. Optional Chaining (?.)
// searchQuery?.length > 0 significa:
// - Se searchQuery esiste, controlla la sua lunghezza
// - Se searchQuery è null/undefined, restituisce false invece di errore

// 2. Operatore && in JSX
// {searchQuery?.length > 0 && (<Row>...</Row>)} significa:
// - Se condizione vera → mostra il contenuto
// - Se condizione falsa → non mostra nulla
// Non è un ternario, ma un operatore logico di "corto circuito"

// 3. Esempio Funzione Filter di Daniele:
// const [searchBook, setSearchBook] = useState('');
// const filteredBooks = books.filter((book) => 
//   book.title.toLowerCase().includes(searchBook.toLowerCase())
// );

// 4. Esempio Selected di Daniele:
// const [selectedBooks, setSelectedBooks] = useState(false);
// className={`book-card ${selectedBooks ? 'selected' : ''}`}
// onClick={() => setSelectedBooks(!selectedBooks)}
// CSS: .book-card.selected { border: 3px solid red; }

function NavBarEpibooks({ searchQuery, setSearchQuery, onSearch }) {  

  const [showCartModal, setShowCartModal] = useState(false); // Stato per il modal del carrello
  const { totalItems } = useContext(CartContext); // Corretto: totalItems invece di TotalItems

  return (
    <>
      <Navbar 
        bg="dark"
        variant="dark"
        expand="lg" 
        className="fixed-top"
        style={{zIndex: 1030}}
      >
        <Container fluid>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img
              src={logo}
              className="App-logo navbar-logo"
              alt="Epibooks logo"
            />
            <span className="neon-title ms-2">EpiBooks Store</span>
          </Navbar.Brand>
            
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">About</Nav.Link>
              <Nav.Link href="#action2">Browse</Nav.Link>
              <NavDropdown   
                title="Link" 
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Cerca un libro..."
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="outline-success" 
                onClick={onSearch}
              >
                <i className="bi bi-search fw-bold"></i>
              </Button>
            </Form>
            
            {/* Bottone del carrello con badge */}
            <Button 
              variant="outline-light" 
              className="ms-2 position-relative"
              onClick={() => setShowCartModal(true)}
            >
              <i className="bi bi-cart3"></i>
              {totalItems > 0 && (
                <Badge 
                  bg="light" 
                  text="dark"
                  className="position-absolute top-0 translate-middle rounded-circle"
                 
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Il modale del carrello viene incluso qui, fuori dal Navbar */}
      {/* Passaggio della prop "show" con il valore attuale dello stato
Passaggio della funzione per cambiare lo stato come "handleClose" */}

      <ModalCart 
        show={showCartModal}  // Dice SE il modale è visibile ADESSO , è in parentesi graffa perché è un valore booleano 
        // "showCartModal" è una variabile di stato booleana (true/false) dichiarata nella riga 42
      // usando useState(false). Il suo valore viene passato al componente ModalCart come prop "show".
      // Quando un utente clicca sul bottone del carrello, setShowCartModal(true) viene eseguito
      // (riga 110), cambiando questo valore a true e causando l'apertura del modale.
      // Le parentesi graffe {} sono la sintassi JSX per inserire valori JavaScript in props.
        handleClose={() => setShowCartModal(false)}
      />
    </>
  );
}

function MyInput({ books = [], searchQuery, setSearchQuery }) {  
  const booksList = Array.isArray(books) ? books : [];
  
  return (
    <>
      {/* Form per input di ricerca */}
      <Form className="d-flex mb-3">
        <Form.Control
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      {/* Rendering condizionale delle card filtrate */}
      {searchQuery?.length > 0 && (
        <Row className="g-3">
          {/* Filter e map sui libri */}
          {booksList
            .filter((libro) =>
              libro.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((libro) => (
              <Col key={libro.asin} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Libro {...libro} />
              </Col>
            ))}
        </Row>
      )}
    </>
  );
}

export { MyInput, NavBarEpibooks };

// && → Perché && invece di if?
// Se searchQuery.length > 0 è true, allora React mostra <Row> ... </Row>.
// Se searchQuery.length > 0 è false, React non mostra nulla.
// Non è un ternario! È una condizione logica:
// - Se è vera → esegue la parte a destra
// - Se è falsa → React ignora tutto