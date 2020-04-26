import React,{useState} from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {
   
    const [datos,guardarDatos]= useState({
        artista:'',
        cancion:''
    });
    const [error,guardarError]= useState(false);
    const {artista,cancion}= datos;

    const actualizarState= e =>{
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        });
    }
  const buscarInfo= e=>{
      e.preventDefault();
      //validar
      if(cancion.trim()==='' || artista.trim()===''){
          guardarError(true);
      }
      guardarError(false);
      guardarBusqueda(datos);
  }
   
    return (  
        <div className="bg-info">
            {error? (<Error mensaje="Complete artista y cancion"/>): null}
            <div className="container">
                    <div className="row">
                        
                         <form
                         onSubmit={buscarInfo}
                         className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                         >
                          <fieldset>
                              <legend className="text-center">Buscador de Letras de Canciones</legend>
                          
                          <div className="row">
                             <div className="col-md-6">
                                 <div className="form-group">
                                   <label>Artista</label>
                                   <input 
                                   type="text"
                                   className="form-control"
                                   name="artista"
                                   placeholder="Nombre Artista"
                                   onChange={actualizarState}/>
                                 </div>
                        
 

                              </div>
                              <div className="col-md-6">
                              <div className="form-group">
                                   <label>Cancion</label>
                                   <input 
                                   type="text"
                                   className="form-control"
                                   name="cancion"
                                   onChange={actualizarState}
                                   placeholder="Nombre Cancion"/>
                                 </div>

 

                              </div>
    
                              </div>
                              <button type="submit" className="btn btn-primary float-right">Buscar </button>
                              </fieldset>
                         </form>
                    </div>
            </div>
        </div>
    );
}
 
export default Formulario;