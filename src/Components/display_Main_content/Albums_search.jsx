import React from 'react'
import { NavLink } from 'react-router-dom';

const Albums_search = (ele) => {
    
  return (
    <div className='card'>
                <NavLink to={`/search/albums/playlists/${ele.id}`} style={{textDecoration: "none"}}>
                  <img src={ele.images[1].url} alt='album_img'></img>
                </NavLink>
             </div>
  ) 
}

export default Albums_search
