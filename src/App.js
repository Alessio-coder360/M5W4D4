import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Row, Col } from 'react-bootstrap';
import {NavBarEpibooks} from './ComponentiEpibooks/MyNavbar';
import {Libro} from './ComponentiEpibooks/SingleBook';
import MyFooter from './ComponentiEpibooks/MyFooter';
import books from './dati/romance.json';
import { useState } from 'react';
import { CartProvider } from './CartComponents/Cart';


// #import BookProvider from './ProveComp/Provider'; // Importa il contesto dei libri


function App() {

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isFilterActive, setIsFilterActive] = useState(false);


  // Gestisce il click sul bottone Search
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setIsFilterActive(true);
      setFilteredBooks(books.filter(libro => 
        libro.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
  };

  // Gestisce i cambiamenti nell'input
  const handleInputChange = (value) => {
    setSearchQuery(value);
    
    if (value.trim() === '') {
      setIsFilterActive(false);
      setFilteredBooks(books);
      return;
    }

    if (isFilterActive) {
      setFilteredBooks(books.filter(libro => 
        libro.title.toLowerCase().includes(value.toLowerCase())
      ));
    }



  };

// # Daniele per Searchquery:

// #in function App() {


// #const [searchQuery, setSearchQuery] = useState(""); // rimuovere se si usa il provider nel return



  return (


    // # Daniele per Searchquery:

    // # <BookProvider>

    // # <MyNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> cancellare props se c'è il provider come genitore 

    // # main calssname="py-4">
    // # <Container>
    // # <AllThebooks searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> gli passiamo i valori di searchQuery e setSearchQuery // cancellare props se c'è il provider come genitore
     
    
    // ! Spiegazione riga 72:
    // # perché la funzione filtro è in AlltheBooks, e gestisce la griglia dei libri da visualizzare 
    // # Riceve la query di ricerca: Per sapere cosa filtrare
   // #Riceve la funzione setState: Per eventualmente modificarla (ad esempio con pulsanti di reset o filtri aggiuntivi)
    
   
   // #Gestisce la visualizzazione: Contiene la logica per organizzare i libri in griglia
    // # </Container>
    // # <BookProvider>
      

  //nel dettaglio:

    // App.js
    // ├── stato globale (searchQuery)
    // │
    // ├── MyNavbar
    // │   └── Input per la ricerca
    // │
    // └── AllThebooks
    //     ├── Logica di filtraggio
    //     ├── Layout della griglia (Rows, Cols)
    //     └── Rendering di ogni libro (Libro component)



     <CartProvider>
      {/* devo wrappare tutto perché alla Nav servono i contesti di questo componente , quindi la Nav deve diventare figlio di CartProvider per ricevere i suoi value */}
      <header>
      
        <NavBarEpibooks 
          searchQuery={searchQuery} 
          setSearchQuery={handleInputChange}
          onSearch={handleSearch}
        />
      </header>
      <section className="sfondoCustom text-white py-5">
        <div className="container text-center px-4 px-lg-5">
          <h1 className="display-5 mt-5 type-writer">Welcome to EPIBOOKS</h1>
          <p className="lead fw-normal mb-0 text-withe">The best place to find your next favorite book!</p>
        </div>
      </section>

      <main className="container py-4">
        <Row className="g-4 justify-content-center">
          {filteredBooks.map((libro) => (
            <Col key={libro.asin} xs={12} sm={6} md={4} lg={3}>
              <Libro {...libro} />
             

            </Col>
          ))}
        </Row>
      </main>



      <footer>
        <MyFooter/>
        </footer>
    </CartProvider>
  );
}

export default App;
