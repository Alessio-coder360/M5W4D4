import { Col, Row, Container } from "react-bootstrap";
import { Libro } from "./SingleBook";

const RomanceBooks = ({ books }) => {
  return (
    <Container className="px-4"> {/* Aggiunto padding orizzontale */}
      <h1 className="text-center mb-4">{books.length > 0 ? books[0].category : "Nessun libro disponibile"}</h1>
      <Row className="g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"> {/* Uso row-cols per gestire meglio la griglia */}
        {books.map((book) => (
          <Col key={book.asin} className="d-flex justify-content-center align-items-center">
            <Libro {...book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export { RomanceBooks as Libri };
