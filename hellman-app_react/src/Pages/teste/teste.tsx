import React from "react";

const Teste: React.FC<any> = () => {

  return (
    <div className='modal-content'>
         <div className='modal-header'>
              <h5 className='modal-title'>Modal</h5>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
               </button>
         </div>
         <div className='modal-body'>
          <p> Esta é uma mensagem em uma modal</p>
        </div>
               
    </div>
 );
};

export default Teste;