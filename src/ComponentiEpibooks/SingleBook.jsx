import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { SideBarComments } from './SideBarComments';
import { CartContext } from "../CartComponents/Cart";
import { useContext } from "react";

function SingleBook({img, title, price, asin, category}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { addToCart} = useContext(CartContext);





    return (
      <>
        <Card
          className="h-100 shadow-sm mx-auto mt-3"
          style={{
            maxWidth: "18em",
            width: '100%',
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.3s ease-in-out",
            border: isSelected ? '3px solid red' : '1px solid #dee2e6',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            backgroundColor: '#fff',
            overflow: "hidden" // Mantiene gli angoli arrotondati tagliando il contenuto
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsSelected(!isSelected)}
        >
          {/* 
            PRIMA usavi un div con backgroundImage e paddingTop: "140%".
            ORA rimuoviamo quel div e usiamo direttamente <img> 
            per mostrare l’immagine senza ritagli e senza deformazioni.
          */}
          <div>
            <img
              src={img}
              alt={title}
              style={{
                width: '100%',      // Riempie tutta la larghezza della card
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                height:'350px',
                
              }}
            />
          </div>
  
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
            <div className="d-flex gap-2 justify-content-between">
            <Button 
              variant="primary" 
              onClick={() => addToCart({
                img,
                title,
                price,
                asin,
                category
              })}
            >
              <i className="bi bi-cart3"></i> 
            </Button>
              <Button 
                variant="success"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSidebar(true);
                }}
              >
                Reviews
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
 










  export { SingleBook as Libro };
  






















  
  //   return (
  //     <>
  //       <Card      
  //         className="h-100 shadow-sm mx-auto"
  //         style={{
  //           maxWidth: "18em",
  //           width: '100%',
  //           transform: isHovered ? "scale(1.05)" : "scale(1)",
  //           transition: "transform 0.3s ease-in-out",
  //           border: isSelected ? '3px solid red' : '1px solid #dee2e6',
  //           borderRadius: '10px',
  //           backgroundColor: '#fff',
  //           overflow: "hidden"
  //         }}
  //         onMouseEnter={() => setIsHovered(true)}
  //         onMouseLeave={() => setIsHovered(false)}
  //         onClick={() => setIsSelected(!isSelected)}
  //       >
  //         <div 
  //           style={{
  //             // MODIFICA: Usare "marginTop" (non margin_top) per aggiungere lo spazio
             
  //             paddingTop: "140%",  // Mantiene l'aspect ratio 1:1.4
  //             position: "relative",
  //             backgroundImage: `url(${img})`,
  //             backgroundColor: "#f0f0f0",  // Colore neutro per gli spazi vuoti
  //             backgroundSize: "cover",   // Mostra l'immagine intera
  //             backgroundRepeat: "no-repeat",
  //             backgroundPosition: "center",
  //             // MODIFICA: Arrotondare tutti i bordi usando borderRadius invece dei soli bordi superiori
           
  //             width: "100%"
  //           }}
  //           title={title}
  //         ></div>
  //         <Card.Body className="d-flex flex-column">
  //           <Card.Title className="text-truncate flex-grow-1">{title}</Card.Title>
  //           <div className="d-flex justify-content-between py-3">
  //             <small><Card.Text>Category:</Card.Text></small>
  //             <small><Card.Text>{category}</Card.Text></small>
  //           </div>
  //           <div className="d-flex justify-content-between">
  //             <small><Card.Text>Price:</Card.Text></small>
  //             <small><Card.Text>{price} €</Card.Text></small>
  //           </div>
  //           <div className="d-flex justify-content-between py-3">
  //             <small><Card.Text>ASIN:</Card.Text></small>
  //             <small><Card.Text>{asin}</Card.Text></small>
  //           </div>
  //           <div className="d-flex gap-2">
  //             <Button variant="primary">
  //               <i className="bi bi-cart3"></i>
  //             </Button>
  //             <Button 
  //               variant="success"
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 setShowSidebar(true);
  //               }}
  //             >
  //               Vedi Recensioni
  //             </Button>
  //           </div>
  //         </Card.Body>
  //       </Card>
  
  //       <SideBarComments 
  //         show={showSidebar}
  //         onClose={() => setShowSidebar(false)}
  //         book={{ img, title, price, asin, category }}
  //       />
  //     </>
  //   );
  // }
  
  // export { SingleBook as Libro };
  





//   return (
//     <>
//       <Card      
//         className="h-100 shadow-sm mx-auto"
//         style={{

//           maxWidth: "18em",
//           width: '100%',
//           transform: isHovered ? "scale(1.05)" : "scale(1)",
//           transition: "transform 0.3s ease-in-out",
//           border: isSelected ? '3px solid red' : '1px solid #dee2e6',
//           borderRadius: '10px',
//           backgroundColor: '#fff',
//           overflow:"hidden"
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={() => {
//           setIsSelected(!isSelected);
//         }}
//       >
//         <div 
//           style={{
//             margin_top:"5px",
//             paddingTop: "140%",  // Mantiene l'aspect ratio 1:1.4
//             position: "relative",
//             backgroundImage: `url(${img})`,
//             backgroundColor: "#f0f0f0",  // Colore neutro per gli spazi vuoti
//             backgroundSize: "contain",   // Mostra l'immagine intera
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             borderTopLeftRadius: '10px',
//             borderTopRightRadius: '10px',
//             width: '100%'
//           }}
//           title={title}
//         ></div>
//         <Card.Body className="d-flex flex-column">
//           <Card.Title className="text-truncate flex-grow-1">{title}</Card.Title>
//           <div className="d-flex justify-content-between py-3">
//             <small><Card.Text>Category:</Card.Text></small>
//             <small><Card.Text>{category}</Card.Text></small>
//           </div>
//           <div className="d-flex justify-content-between">
//             <small><Card.Text>Price:</Card.Text></small>
//             <small><Card.Text>{price} €</Card.Text></small>
//           </div>
//           <div className="d-flex justify-content-between py-3">
//             <small><Card.Text>ASIN:</Card.Text></small>
//             <small><Card.Text>{asin}</Card.Text></small>
//           </div>
//           <div className="d-flex gap-2">
//             <Button variant="primary"><i className="bi bi-cart3"></i></Button>
//             <Button 
//               variant="success"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShowSidebar(true);
//               }}
//             >
//               Vedi Recensioni
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>

//       <SideBarComments 
//         show={showSidebar}
//         onClose={() => setShowSidebar(false)}
//         book={{ img, title, price, asin, category }}
//       />
//     </>
//   );
// }

// export {SingleBook as Libro};



//oppure
//export default SingleBook
// in app js senza parentesi graffe


// Daniele l'immagine della card la mette in un div e usa background-image
