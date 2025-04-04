

// import { createContext, useContext, useState} from "react";
// import context from "react-bootstrap/esm/AccordionContext";


// export const BookContext= createContext() 

// export const BookProvider=({children}) =>{
// const [books, setBooks]= useState("") // array di oggetti
// return(
//     <BookContext.Provider value={{books, setBooks}}>
//       {children}  
//     </BookContext.Provider>
// )
// }




// NOta bene creatContext e useContext sono fatti per lavorare insieme, *

// devi esportare la variabile BookContext che contiene il createContext e importarlo nel componente dove vuoi usarlo insieme allo useContext.
// ad esempio nella funzione MyNav sarebbe 
// import { useContext } from 'react';
// import { BookContext } from '../ProveComp/Provider';

//const MyNav= () => {} => 
    // const {books,setBooks} = useContext(BookContext) // usa useContext per accedere al valore del contesto
//     // ora puoi usare books e setBooks come variabili locali nel tuo componente




// #cosa succede qui: 

// ! books e setBooks , Riceve i valori dal Provider più vicino nell'albero dei componenti
// Estrae questi valori tramite destrutturazione
// Crea variabili locali utilizzabili nel componente
// ?Da dove vengono i valori?

// ! da BookProvider


// createContext() è come creare una radio FM con una frequenza specifica (es. 101.5)
// useContext(BookContext) è come sintonizzare la tua radio su quella frequenza per ascoltare

// createContext() → BookContext (esportato) → useContext(BookContext)
//      ↓                   ↓                          ↑
// Crea il container    Provider riempie         Componenti leggono
//                     il container              dal container









// !come sarebbe dovuto essere BookProvider:

// import { createContext, useState, useEffect } from "react";
// import books from '../dati/romance.json'; // Importi i dati dei libri qui

// export const BookContext = createContext();

// export const BookProvider = ({ children }) => {
//   // Stato completo spostato da App.js al Provider
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredBooks, setFilteredBooks] = useState(books);
//   const [isFilterActive, setIsFilterActive] = useState(false);

//   // Logica di filtraggio spostata da App.js al Provider
//   const handleSearch = () => {
//     if (searchQuery.trim() !== '') {
//       setIsFilterActive(true);
//       setFilteredBooks(books.filter(libro => 
//         libro.title.toLowerCase().includes(searchQuery.toLowerCase())
//       ));
//     }
//   };

//   // Logica di input spostata da App.js al Provider
//   const handleInputChange = (value) => {
//     setSearchQuery(value);
    
//     if (value.trim() === '') {
//       setIsFilterActive(false);
//       setFilteredBooks(books);
//       return;
//     }

//     if (isFilterActive) {
//       setFilteredBooks(books.filter(libro => 
//         libro.title.toLowerCase().includes(value.toLowerCase())
//       ));
//     }
//   };

//   // Fornisci tutti i valori e funzioni nel context
//   return (
//     <BookContext.Provider value={{
//       books,                // dati originali
//       searchQuery,          // query di ricerca
//       filteredBooks,        // libri filtrati
//       setSearchQuery: handleInputChange, // funzione per impostare la query
//       handleSearch,         // funzione per attivare la ricerca
//     }}>
//       {children}
//     </BookContext.Provider>
//   );
// };









// # Daniele :

// #const BookProvider = ({ children }) => {
// #    // Stati
// #    const [searchQuery, setSearchQuery] = useState("");
// #    const [selectedBook, setSelectedBook] = useState(null);
// #    const [filteredBooks, setFilteredBooks] = useState(books);
// #    
// #    // Funzioni
// #    const handleSearch = () => {
// #      // ...logica di ricerca...
// #    };
// #    
// #    // Prepariamo tutti i valori in un unico oggetto
// #    const contextValue = {
// #      books,
// #      searchQuery,
// #      selectedBook,
// #      filteredBooks,
// #      setSearchQuery,
// #      setSelectedBook,
// #      handleSearch
// #    };


  
// #  // Passiamo l'oggetto completo al Provider
// #  return (
// #    <BookContext.Provider value={contextValue}>
// #      {children}
// #    </BookContext.Provider>
// #  );
// #};

// # value={contextValue}> mette una oggetto completo dentro al provider non CONFODERTI E NON USARLO MAI COME ELEMENTO DA CUI ESTRARE I VALORI 
// # CIOè MAI FARE : 
// # const variabile = useContext(contextValue) // NON FUNZIONA E NON HA SENSO
    



// !AlltheBooks:


// import { useContext } from 'react';
// import { BookContext } from '../ProveComp/Provider';
// import { Row, Col } from 'react-bootstrap';
// import { Libro } from './SingleBook';

// function AllThebooks() {
//   // Usa useContext per accedere ai dati filtrati
//   const { filteredBooks } = useContext(BookContext);
  
//   return (
//     <Row className="g-4 justify-content-center">
//       {filteredBooks.map((libro) => (
//         <Col key={libro.asin} xs={12} sm={6} md={4} lg={3}>
//           <Libro {...libro} />
//         </Col>
//       ))}
//     </Row>
//   );
// }

// export default AllThebooks;


// ! la NavBar: 

// import { useContext } from 'react';
// import { BookContext } from '../ProveComp/Provider';
// // ...altri import

// function NavBarEpibooks() {  // Rimuovi le props!
//   // Usa useContext per accedere ai valori del Provider
//   const { searchQuery, setSearchQuery, handleSearch } = useContext(BookContext);
  
//   return (
//     <Navbar /* ...props... */>
//       {/* ...resto del componente invariato... */}
//       <Form.Control
//         type="search"
//         placeholder="Cerca un libro..."
//         className="me-2"
//         aria-label="Search"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <Button 
//         variant="outline-success" 
//         onClick={handleSearch}
//       >
//         <i className="bi bi-search fw-bold"></i>
//       </Button>
//     </Navbar>
//   );
// }


// !App.js:

// import { BookProvider } from './ProveComp/Provider';
// ...altri import

// function App() {
//   return (
//     <BookProvider>
//       <>
//         <header>
//           <NavBarEpibooks />  {/* Non serve più passare props! */}
//         </header>
        
//         <section className="sfondoCustom text-white py-5">
//           {/* ...contenuto... */}
//         </section>

//         <main className="container py-4">
//           <AllThebooks />  {/* Component che usa useContext per accedere ai dati */}
//         </main>

//         <footer style={{ backgroundColor: 'rgb(148, 150, 151)' }}>
//           <MyFooter />
//         </footer>
//       </>
//     </BookProvider>
//   );
// }