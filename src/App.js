import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Row, Col } from 'react-bootstrap';
import {NavBarEpibooks} from './ComponentiEpibooks/MyNavbar';
import {Libro} from './ComponentiEpibooks/SingleBook';
import MyFooter from './ComponentiEpibooks/MyFooter';
import books from './dati/romance.json';
import { useState } from 'react';

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

  return (
    <>
      <header>
        <NavBarEpibooks 
          searchQuery={searchQuery} 
          setSearchQuery={handleInputChange}
          onSearch={handleSearch}
        />
      </header>

      <main className="container py-4">
        <Row className="g-4 justify-content-center">
          {filteredBooks.map((libro) => (
            <Col key={libro.asin} xs={12} sm={6} md={4} lg={3}>
              <Libro {...libro} />
              {isSelected && <CommentArea asin={asin} />}

            </Col>
          ))}
        </Row>
      </main>

      <footer>
        <MyFooter/>
      </footer>
    </>
  );
}

export default App;
