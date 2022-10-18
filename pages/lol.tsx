import { NextPageContext } from 'next';
import React, {useState, useEffect} from 'react'

type LolProps = {
    frase ?: string;
    autor ?: string;
}


export default function LolPage(props:LolProps) {
//state em react utiliza o padrão getter & setter.
// get = obter
// set = definir
// const [get, set] = useState(0);
const [frase, setFrase] = useState(props.frase);
const [autor, setAutor] = useState(props.autor);
const [contador, setContador] = useState(0);
// useEffect(função, array);

useEffect(()=>{
   console.log('useEffect foi executado');
   if(contador==0){
       document.title = "Carregou a página, executou a primeira vez";
   }else{
         document.title = "Carregou a página, executou "+ contador +" vezes";
   }
},[frase, autor, contador]);

  return (
    <>
        <h1>{frase}</h1>
        {autor && <h2>{autor}</h2>}
        <button onClick={(e)=>{setFrase("Proud ponsors of...umm...we forget!")}}>Mudar a frase</button>
        <button onClick={(e)=>{setAutor("ijacklima")}}>Mudar o autor</button>
        <button onClick={()=>{setContador(contador+1)}}>Contador+</button>
    </>
  )
}



LolPage.getInitialProps = async (ctx: NextPageContext) => {
    const res = await fetch('https://type.fit/api/quotes');
    const data = await res.json();
    const position = Math.floor(Math.random() * data.length);
    const frase = data[position].text;
    const autor = data[position].author;
    return {
        frase,
        autor
    }
}
