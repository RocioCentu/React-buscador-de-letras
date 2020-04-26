import React,{Fragment,useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import Letra from './components/Letra';
import Artista from './components/Artista';
import Error from './components/Error';
import axios from 'axios';

function App() {
  const [busqueda,guardarBusqueda]= useState({});
  const [letra,guardarLetra]= useState('');
  const [info,guardarInfo]= useState({});
  const [errorArtista,guardarErrorArtista]= useState(false);
    const [errorLetra,guardarErrorLetra]= useState(false);
  const {artista,cancion}=busqueda;
  useEffect(()=>{

    if(Object.keys(busqueda).length === 0)return;
       const consultarApiLetra= async()=>{
        
         const url=`https://api.lyrics.ovh/v1/${artista}/${cancion}`;
         const url2=`https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
        
        const[letra,informacion] =await Promise.all([
           axios(url),
             axios(url2)
        ]);
        
        if(letra.data.lyrics === null){ guardarErrorLetra(true);
        }else{
          guardarLetra(letra.data.lyrics);
        }
        if(informacion.data.artists=== null){guardarErrorArtista(true)
        }else{
       
          guardarInfo(informacion.data.artists[0]);

        }
        
       
    
       }
      consultarApiLetra();
  },[busqueda,info]);
  return (
   <Fragment>
     <Formulario
     guardarBusqueda={guardarBusqueda}/>
     <div className="container mt-5">
       <div className="row">
       <div className="col-md-6">
          {errorArtista? (<Error mensaje="No se encontro informacion del artista"/>): (
              <Artista
              info={info}
              />
           )}
          
          </div>
         <div className="col-md-6">
           {errorLetra ? (<Error mensaje="No se encontro letra de la cancion"/>): (
               <Letra
               letra={letra}
               />
           )}
           
          </div>
          
       </div>
     </div>
   </Fragment>
  );
}

export default App;
