import React from 'react'

const Header: React.FC<any> = ({ }) => {

  return (
     <div>
       <div className="top">
           <a className="navbar-brand ml-4 float-left" href="#">Projeto S001</a>
           <ul className="nav float-right navbar-top-links nav-right">
               <li id="DropdownUser3371044ca25839530aa3aa642e96eaed" className="dropdown ">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                     <i className="fa fa-user"></i>&nbsp;<i className="fa fa-caret-down"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-user dropdown-menu-right">
                        <li>
                            <a href="#">
                                <i className="fa fa-user fa-fw"></i>
                                <span className="item"> User Profile</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                    <i className="fa fa-cog fa-fw"></i>
                                    <span className="item"> Settings</span>
                                </a>
                        </li>
                        <li className="divider">
                            <span className="item"></span>
                            <i className="fa"></i>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-sign-out"></i>
                                <span className="item"> Logout</span>
                            </a>
                        </li>
                    </ul>
               </li>
           </ul>
        </div>
        <div className="separator_top"></div>
    </div>
  );
};

export default Header;