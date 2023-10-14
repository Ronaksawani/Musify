import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../App.css';
import { artistPara } from './Search';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import JsonData from '../../data.json'

const Home = () => {
  const [singleAlbumData, setSingleAlbumData] = useState(null);
  const [singlePlaylistData, setSinglePlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistResponse = await fetch('https://api.spotify.com/v1/artists?ids=00sCATpEvwH48ays7PlQFU%2C4YRxDV8wJFPHPTeXepOstw%2C61if35zz1W11GejEkxTLEQ%2C5cB4d4jPYjMT326sjihQ4m%2c5f4QpKfy7ptCHwTqspnSJI%2C1tqysapcCh1lWEAc9dIFpa%2C1mYsTxnqsietFxj1OgoGbG%2C2GoeZ0qOTt6kjsWW4eA6LS', artistPara);
        const artistData = await artistResponse.json();
        setSingleAlbumData(artistData.artists);

       

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Make sure to handle loading state in case of an error
      }
    };

    const fetchData2 = async () => {
      try {


        const albumResponse = await fetch('https://api.spotify.com/v1/albums?ids=2pnI0hSHUN3CCV8oVAPQlQ%2c7gQfHrzuyberhXO5ylKIPU%2C5j0o3XQ1YciVzm7MtcFmfG%2C54iBEchXZkfTCoCv6gqqwh%2C6BspvuZXZApDQ0ddPIHq3W%2C7h8UjL063THtcHQcD40REt', artistPara);
        const albumData = await albumResponse.json();
        setSinglePlaylistData(albumData);
        console.log(albumData)

        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Make sure to handle loading state in case of an error
      }
    };


    fetchData();
    fetchData2();
  }, []);
  console.log(singlePlaylistData)

  return (
    <div style={{ paddingLeft: '10px', paddingRight: '1%' }}>
      <div className='home_container'>

        {/* artists */}

        <div style={{ fontSize: '30px' ,margin:'0px 0 20px 20px'}}><u>Artists</u></div>

        <div>
          <div className='_img' style={{marginLeft:'2px'}}>
            { singleAlbumData ? (
              // Map through the fetched data and display artist images if singleAlbumData is not null
              singleAlbumData.map((ele) => {
                return(
                    <NavLink to={`/home/artist/${ele.id}`} style={{ textDecoration: 'none' }} key={ele.id}>
                      <img src={ele.images[2].url} alt='album_img' style={{borderRadius:'50%', marginRight:'7px'}}></img>
                     </NavLink>
                     )
                })
            ) : (
              // Handle the case when singleAlbumData is null (data not fetched yet)
              <div>No data available</div>
            )}
          </div>
        </div>

        {/* albums */}

        <div style={{ fontSize: '30px' ,margin:'10px 0 20px 20px'}}><u>Albums</u></div>

        <div>
          <div className='_img' style={{marginLeft:'2px'}}>
            { singlePlaylistData ? (
              //Map through the fetched data and display artist images if singleAlbumData is not null
              JsonData.map((ele) => {
                return(
                    <NavLink to={`/home/album/${ele.id}`} style={{ textDecoration: 'none' }} key={ele.id}>
                      <img src={ele.image} alt='album_img' style={{ marginRight:'10px'}} height={'160px'} width={'160px'}></img>
                     </NavLink>
                     )
                })
              
            ) : (
              // Handle the case when singleAlbumData is null (data not fetched yet)
              <div>No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
