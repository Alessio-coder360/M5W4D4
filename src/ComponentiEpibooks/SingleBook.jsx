import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function SingleBook({img, title, price,asin,category}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);  // Parte false (nessun bordo all'inizio)
  const [selectedAsin, setSelectedAsin] = useState(null);

  useEffect(() => {
    CommentArea();
  }, [])
  

  return (
    <Card      
      className="h-100 shadow-sm mx-auto" // Aggiunto shadow-sm per ombreggiatura leggera e mx-auto per centramento
      style={{
        maxWidth: "18rem",  // Cambiato da width fissa a maxWidth
        width: '100%',      // Aggiunto width 100% per responsività
        height: "800px",        // Ripristinata altezza fissa
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease-in-out",
        border: isSelected ? '3px solid red' : '1px solid #dee2e6', // Bordo grigio quando non selezionato
        borderRadius: '10px',  // Bordi arrotondati
        backgroundColor: '#fff' // Sfondo bianco per enfatizzare l'ombra
        
      }}
      onMouseEnter={() => setIsHovered(true)  }
      onMouseLeave={() => setIsHovered(false)}
   
      onClick={() => {
        setIsSelected(!isSelected);
        setSelectedAsin(asin);
      }}
       // Toggle della selezione al click
    >
      <Card.Img 
        style={{
          height: "500px",     
          objectFit: "cover",  // Cambiato da contain a cover
          width: '100%'
        }}
        // Rimosso variant="top" che può causare spazi extra
        src={img} 
        alt={title}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate flex-grow-1">{title}</Card.Title> 
        {/* //o substring(0,20)}... per limitare il numero di caratteri */}
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
        <Button variant="primary">Acquista</Button>
      </Card.Body>
    </Card>
  );
}

export {SingleBook as Libro};

//oppure
//export default SingleBook
// in app js senza parentesi graffe


// Daniele l'immagine della card la mette in un div e usa background-image





