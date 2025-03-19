import React from 'react';

function Lista({arrayNomi,titolo}) {  //Questo è equivalente a fare:  const {arrayNomi} = props;  // Destrutturazione manuale.
    //Ma nella destrutturazione diretta (quella dentro i parametri della funzione), l’uguale è implicito.
    return( <>
        <h4>{titolo}</h4>
    <ol className='list-group'>
       {arrayNomi.map((item,id)=> <li className='list-group-item' key={id}>{item}</li>)}
    </ol>
    </>
    )
}

//opppure

// function Lista(props) {
//     return (
//       <ol>
//         {props.arrayNomi.map((item, id) => (
//           <li key={id}>{item}</li>
//         ))}
//       </ol>
//     );
//   }

//Il problema è che props è un oggetto in React, non un array. Se vuoi usare map() direttamente, devi accedere all’array usando props.arrayNomi oppure destrutturarlo
  

export default Lista;