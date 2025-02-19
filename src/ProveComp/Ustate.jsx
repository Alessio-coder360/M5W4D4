import React, {useState} from 'react'; //importo useState

const PulsanteMio =function(props){
    const[counter, Setcounter]=useState(0)
    const incrementa=()=>{Setcounter(counter+1)}
    return(<>
    <h6>{props.title} {counter}</h6>
    <button onClick={incrementa} >PulsanteMio</button>
    </>)
}


export default PulsanteMio;