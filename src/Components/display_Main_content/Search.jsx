import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import Albums_search from './Albums_search';
import Categorie_search from './Categorie_search';
import {a} from '../Central_store/Auth';



var artistPara;
const Search = () => {
  
  const [searchInput, setSearchInput]=useState('');
  const [albums, setAlbums]=useState([]);
  const [categorie, setCategorie]=useState([]);
  const [at, setAT]=useState('');
  //const {accessToken}=useStore();
  const accessToken = a;
  

  var artistParameters={
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  artistPara=artistParameters;
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/browse/categories?limit=50', artistParameters);
      const json = await response.json();
      setCategorie(json.categories.items);
      //console.log(json.categories.items);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(()=>{
      // fetch('https://api.spotify.com/v1/browse/categories?limit=50', artistParameters)
      //   .then(response=>response.json()).then(res=>setCategorie(res));

        fetchData();
        //console.log(accessToken);
        setAT(accessToken);

      },[])
   
  async function search(){
    

    
    var artist_id= await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', artistParameters)
      .then(response=>response.json()).then(data=>{return data.artists.items[0].id})
    console.log(artist_id);

    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artist_id + '/albums?include_groups=album&market=IN&limit=50', artistParameters).then(response=>response.json()).then(res=>{return res.items});
    //console.log(returnedAlbums);
    setAlbums(returnedAlbums);
    //console.log(albums);
    //console.log(categorie);

    
    
   }
   
  return (
    
    <div className='container'>
        <div>
        <input style={{width:"500px", height:"50px",padding:"5px", fontSize:"20px", borderRadius: "10px"}}  type='text' placeholder='Search your favourite Artists here :' onChange={(e)=>{setSearchInput(e.target.value)}} onKeyDown={(e)=>{if(e.key==='Enter'){search();}}}></input>
        <button className='btn' style={{marginLeft:"20px", width:"100px", height:"50px", fontSize:"20px", borderColor:"white"}} onClick={search}>SEARCH</button>
      </div>
      {searchInput!=""?<div className='defaultTitle'><span style={{fontSize:"35px", fontWeight:"normal"}}>"searches"</span></div>:null}
      <div className='_img'>
        {
          albums.map((ele)=>{
            //console.log(ele);
            return <Albums_search key={ele.id} {...ele}></Albums_search>       
          })
        }
        </div>
        <div className='defaultTitle'><span style={{fontSize:"35px", fontWeight:"bold"}}>Browse All</span></div>
        
        <div className='defaultContainer'>
          {
            categorie.map((ele)=>{
             // console.log(ele)
              return <Categorie_search key={ele.id} {...ele}></Categorie_search>
              
              })}
        </div>
      
        
      
    </div>
  )
}

export {artistPara}
export default Search
