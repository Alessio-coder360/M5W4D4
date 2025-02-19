import Card from 'react-bootstrap/Card';

function DinCard(props) {
  return (
    <>
      {props.array.map((el, id) => (
        <Card key={id[0]} style={{ width: '18rem' }}>
          <Card.Img variant="top" src={el[1]} />
          <Card.Body>
            <Card.Title>{el[2]}</Card.Title>
            <Card.Text>{el[3]}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default DinCard;