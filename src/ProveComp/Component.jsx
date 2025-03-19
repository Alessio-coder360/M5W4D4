import React, {useState} from 'react'; //importo useState



// const PrimoComponente = function(props){
//     return(
//         <>
//     <h1>{props.testo}</h1>
//     <p>{props.title}</p>
//     </>)
//   }

  //oppure:

  

  const PrimoComponente = function({title,descr}){
    return(
      <>
      <h5>{title}</h5>
      <p>{descr}</p>
      </>
    )
  }


  const SecondoComponente = function(props){
    return(
        <>
    <h2>{props.title}</h2>
    <p>{props.number}</p> 
    </>)
  }

  //ppure con div

//   const SecondoComponente = function(props){
//     return(
//         <div>
//     <h2>{props.testo}</h2>
//     <p>{props.number}</p>
//     <div/>)
//   }


function Contatore(){
  const [conteggio, setConteggio]= useState(0)
  const incrementa= ()=>{setConteggio(conteggio+1)}
  const decementa=()=>{
    conteggio === 0 
    ? alert("Non può decrementare oltre!") 
    :setConteggio(conteggio-1)}
  return(<div className='p-3 mt-3'>
    <h5>Contantore: {conteggio}</h5>
    <button className='btn btn-danger' onClick={decementa}>Decrementa</button> <button className='btn btn-success' onClick={incrementa}>Incrementa</button> 
  </div>

  )
}

  

  export {PrimoComponente,SecondoComponente,Contatore};

  
 //oppure:


// export default { PrimoComponent, SecondoComponent };
//allora in app.js importi:
//import Components from './component.jsx';
//e scrivi il nome del file.nome componente, lo tratti come un oggetto :
//<Components.PrimoComponent testo="Il mio primo props" title={45} />
//<Components.SecondoComponent testo="Io sono la seconda props" number={90} />
