import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { artistPara } from './Search';
import { useSongContext } from '../Central_store/Contex';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../App.css';

const Single_artist_search = () => {
    const { id } = useParams();
    const [singleAlbumData, setSingleAlbumData] = useState(null);
    const [singleTrackData, setSingleTrackData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useSongContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumResponse = await fetch(`https://api.spotify.com/v1/artists/${id}`, artistPara);
                const albumData = await albumResponse.json();
                setSingleAlbumData(albumData);
    
                const trackResponse = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`, artistPara);
                const trackData = await trackResponse.json();
    
                    setSingleTrackData(trackData.tracks);
                    setLoading(false); // Assuming you have a loading state to manage the loading effect
           
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Make sure to handle loading state in case of an error
            }
        };
    
        fetchData();
    }, [id]);
    

    const duration = (data) => {
        const minutes = Math.floor(data / 60000);
        const seconds = ((data % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const trackCalculation = (url) => {
        if (currentTrack === url && isPlaying) {
            setIsPlaying(false);
        } else {
            setCurrentTrack(url);
            setIsPlaying(true);
        }
    };

    console.log(singleAlbumData)
    return (
        
        <SkeletonTheme baseColor='#242424' highlightColor='#ffffff'>
            <div style={{ paddingLeft: '10px', paddingRight: '4%' }}>
                <div className='album_container' style={{ height: '100px' }}>
                    <div>
                        {singleAlbumData ? (
                            <div className='img_shadow'>
                                <img src={singleAlbumData.images[0].url} alt='album cover' height={'100px'} width={'100px'}></img>
                            </div>
                        ) : (
                            <Skeleton width={100} height={100} />
                        )}
                    </div>
                    <div>
                        {singleAlbumData ? (
                            <div style={{ fontFamily: 'Old Standard TT, serif', display: 'flex', gap: '100px' }}>
                                <div>
                                    <div>
                                        <span className='album_title'>{singleAlbumData.name}</span>
                                    </div>
                                    <div style={{ lineHeight: '30px' }}>
                                        <span style={{fontSize:'30px'}}>{singleAlbumData.type}</span>
                                    </div>
                                </div>
                               
                            </div>
                        ) : (
                            <Skeleton height={30} width={300} />
                        )}
                    </div>
                </div>

                {singleTrackData ? (
                    <div className='track_div_1'>
                        <div style={{ height: '520px', overflowY: 'auto' }}>
                            {singleTrackData.map((ele) => {
                                return (
                                    <div
                                        className={`album_single_track ${
                                            currentTrack === ele.preview_url && isPlaying ? 'playing' : ''
                                        }`}
                                        key={ele.id}>
                                        <img src={ele.album.images[2].url} alt='track cover' />
                                        <span style={{ width: '900px' }}>{ele.name}</span>
                                        <div style={{ display: 'flex', gap: '50px' }}>
                                            <span style={{ justifyContent: 'flex-end' }}>
                                                {duration(ele.duration_ms)} min
                                            </span>
                                            <button
                                                className='track_play_pause'
                                                onClick={() => {
                                                    trackCalculation(ele.preview_url);
                                                }}>
                                                {currentTrack === ele.preview_url && isPlaying ? (
                                                    <FaPause className='track_btn' />
                                                ) : (
                                                    <FaPlay className='track_btn' />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <Skeleton height={64} width={'100%'} />
                )}
            </div>
         </SkeletonTheme>
    );
};

export default Single_artist_search;
