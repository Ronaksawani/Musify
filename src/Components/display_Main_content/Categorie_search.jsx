import React from 'react'
import { NavLink } from 'react-router-dom';

const Categorie_search = (ele) => {
    
  return (
    <div className='defaultCard'>
        <NavLink to={`/search/categories/playlists/${ele.id}`} style={{textDecoration: "none"}}>
                <img src={ele.icons[0].url} alt='album_img' height={'274'} width={'274'}></img>
                <div className='title'>{ele.name}</div>
        </NavLink>
    </div>
  ) 
}

export default Categorie_search
