import React from 'react';
import {NavLink} from 'react-router-dom';

function RhNav(props){
  let { navlist, pathname, className } = props;
  return (
    <ul className={`rh-navs ${className ? className : ''}`}>
				{
					navlist.map((nav, index)=>{
						return  <li className="rh-nav" key={index}> 
							<NavLink
								to={nav.path}
								exact={nav.exact}
								activeClassName="active"
								isActive={
									nav.isActive ? ()=>{
										return nav.isActive(pathname)
									}: null
								}
								key={index}
							>{nav.title}</NavLink>
						</li>
					})
				}
			</ul>
  )
}

export default React.memo( RhNav );