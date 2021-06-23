import React, { ReactNode } from "react";


const Panel = (props: any) => {
 

  function renderIcon(){
      if(props.icon !== undefined){
          return (<i className={"fa fa-"+props.icon}></i> )
      }
  }
  return (
      <div className="card">
          <h5 className="card-header">{renderIcon()} {props.title}</h5>
          <div className="card-body">
                    {props.children}
           </div>
      </div>
  );
};

export default Panel;