import React from 'react'
import { Routes,Route } from 'react-router-dom';
import  Search  from './Search';
import Home from './Home';
import Single_album_search from './Single_album_search';
import Single_categorie_search from './Single_categorie_search';
import A from '../A';
import Single_artist_search from './Home_artists_single';

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/home/artist/:id' element={<Single_artist_search/>}></Route>
        <Route exact path='/home/album/:id' element={<Single_album_search/>}></Route>
        <Route exact path='/search' element={<Search/>}></Route>
        <Route exact path='/search/albums/playlists/:id' element={<Single_album_search/>}></Route>
        <Route exact path='/search/categories/playlists/:id' element={<Single_categorie_search/>}></Route>
      </Routes>
    </div>
  )
}

export default Routing
