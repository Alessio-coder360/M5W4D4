
import Card from 'react-bootstrap/Card';

function FirstCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}
        </Card.Text>
    
      </Card.Body>
    </Card>
  );
}
epibooks/src/Card.jsx
export default FirstCard;