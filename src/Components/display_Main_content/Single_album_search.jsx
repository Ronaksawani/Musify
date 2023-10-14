import React, { useState } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa';
import { useEffect } from 'react';
import { useParams  } from 'react-router-dom';
import { artistPara } from './Search';
import { useSongContext } from '../Central_store/Contex';
import '../../App.css'



let song;
const Single_album_search = () => {

    const{id}=useParams();
    const [singleAlbumData, setSingleAlbumData]=useState('');
    const [loading, setLoading] = useState(true);
    // const [currentTrack, setCurrentTrack] = useState(null);
    // const [isPlaying, setIsPlaying] = useState(false);
    const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useSongContext();
    
    
    

    
    const fetchData = () => {
        
          fetch(`https://api.spotify.com/v1/albums?ids=${id}&market=IN`, artistPara)
            .then((response) => response.json())
            .then((data) => {setSingleAlbumData(data.albums[0]);setLoading(false); })
            .catch((error) => {
                 console.error('Error fetching data:', error);
                 setLoading(false); // Set loading to false on error
            });

            

            
        
      };
    
      useEffect(()=>{
          // fetch('https://api.spotify.com/v1/browse/categories?limit=50', artistParameters)
          //   .then(response=>response.json()).then(res=>setCategorie(res));
    
            fetchData();
            
           // setAT(accessToken);
    
          },[])

      useEffect(()=>{
        song=currentTrack;
        console.log(currentTrack);
        console.log('song  '+song);
        
      },[currentTrack]);
      

      const duration=(data)=>{
        const minutes = Math.floor(data / 60000);
        const seconds = ((data % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
      const trackCalculation = (url) => {
        if (currentTrack === url && isPlaying) {
          setIsPlaying(false);
        } else {
          setCurrentTrack(url);
          setIsPlaying(true);
        }
      };

  return (
    <div style={{paddingLeft:'10px', paddingRight:'4%'}}>
        <div className='album_container'>
            <div>
              <div>
                  {loading ? (<p>Loading...</p>) : 
                  (<div className='img_shadow'>
                    <img src={singleAlbumData.images[1].url} alt='album cover'></img>
                  </div>)
                  }
              </div>
            </div>
            <div >
              {loading ? (<p>Loading...</p>) : 
                    (<div style={{paddingTop:'40px', fontFamily: 'Old Standard TT, serif'}}>
                      <div>
                        <span className='album_title'>{singleAlbumData.name}</span>
                      </div>
                      <div style={{height:'10px'}}/>
                      <div style={{lineHeight:'30px'}}>
                        <span>Artists: </span><span>{singleAlbumData.artists[0].name}</span>
                      </div>
                      <div style={{lineHeight:'30px'}}>
                        <span>Release: </span><span>{singleAlbumData.release_date}</span>
                      </div>
                      <div style={{lineHeight:'30px'}}>
                        <span>Label: </span><span>{singleAlbumData.label}</span>
                      </div>
                      <div style={{lineHeight:'30px'}}>
                        <span>Popularity: </span><span>{singleAlbumData.popularity} K</span>
                      </div>
                      <div style={{lineHeight:'30px',fontFamily: 'Old Standard TT, serif',marginTop:'15px'}}>
                         <span style={{fontSize:'30px'}}>{singleAlbumData.total_tracks} Songs</span>
                      </div>
                    

                     
                    </div>

                      
                    )
              }
            </div>
        </div>
        
        {loading ? (<p>Loading...</p>) : 
                  (<div className='track_div_1'>
                    <div style={{height:'300px',overflowY:'auto'}}>
                  {
                    singleAlbumData.tracks.items.map((ele)=>{
                      //console.log(ele.preview_url)
                        return(<>
                          {/* <div className='hr'/> */}
                          
                          
                            <div className={`album_single_track ${currentTrack === ele.preview_url && isPlaying ? 'playing' : ''}`}>
                              <span style={{width:'30px',paddingLeft:'10px'}} id={ele.track_number}>{ele.track_number}</span>
                              <span style={{width:'900px'}}>{ele.name}</span>
                              <div style={{display:'flex',gap:'50px'}} >
                                <span style={{justifyContent:'flex-end'}}>{duration(ele.duration_ms)} min</span>
                                <button  className='track_play_pause' 
                                        onClick={()=>{trackCalculation(ele.preview_url)}}>
                                          {currentTrack === ele.preview_url && isPlaying 
                                          ? <FaPause className='track_btn' /> : <FaPlay className='track_btn'/>}
                                </button>
                              </div>
                            
                          </div>
                          </>)})}
                          </div>
      
                            </div>)
                  }

              
      
    </div>
  )
}
export {song}
export default Single_album_search
