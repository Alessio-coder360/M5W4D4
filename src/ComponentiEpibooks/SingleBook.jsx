import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { SideBarComments } from './SideBarComments';

function SingleBook({img, title, price, asin, category}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Card      
        className="h-100 shadow-sm mx-auto"
        style={{
          maxWidth: "18rem",
          width: '100%',
          height: "800px",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
          border: isSelected ? '3px solid red' : '1px solid #dee2e6',
          borderRadius: '10px',
          backgroundColor: '#fff'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsSelected(!isSelected);
        }}
      >
        <Card.Img 
          style={{
            height: "500px",     
            objectFit: "cover",
            width: '100%'
          }}
          src={img} 
          alt={title}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate flex-grow-1">{title}</Card.Title>
          <div className="d-flex justify-content-between py-3">
            <small><Card.Text>Category:</Card.Text></small>
            <small><Card.Text>{category}</Card.Text></small>
          </div>
          <div className="d-flex justify-content-between">
            <small><Card.Text>Price:</Card.Text></small>
            <small><Card.Text>{price} €</Card.Text></small>
          </div>
          <div className="d-flex justify-content-between py-3">
            <small><Card.Text>ASIN:</Card.Text></small>
            <small><Card.Text>{asin}</Card.Text></small>
          </div>
          <div className="d-flex gap-2">
            <Button variant="primary"><i class="bi bi-cart3"></i></Button>
            <Button 
              variant="success"
              onClick={(e) => {
                e.stopPropagation();
                setShowSidebar(true);
              }}
            >
              Vedi Recensioni
            </Button>
          </div>
        </Card.Body>
      </Card>

      <SideBarComments 
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        book={{ img, title, price, asin, category }}
      />
    </>
  );
}

export {SingleBook as Libro};



//oppure
//export default SingleBook
// in app js senza parentesi graffe


// Daniele l'immagine della card la mette in un div e usa background-image
