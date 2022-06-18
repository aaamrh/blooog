import React from 'react';
import {NavLink} from 'react-router-dom';

function RhNav(props){
  let { navlist, pathname, className, onClick=()=>{} } = props;
  return (
    <ul className={`rh-navs ${className ? className : ''}`}>
				{
					navlist.map((nav, index)=>{
						
						const active = nav.isActive ? ()=>{
							return nav.isActive(pathname)
						}: null;

						return  <li className="rh-nav" key={index}> 
							<NavLink
								to={nav.path}
								exact={nav.exact}
								activeClassName="active"
								isActive={ active }
								onClick={ () => {onClick()} }
								key={index}
							>{nav.title}</NavLink>
						</li>
					})
				}
			</ul>
  )
}

export default React.memo( RhNav );