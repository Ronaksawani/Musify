import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { artistPara } from './Search';
import { useSongContext } from '../Central_store/Contex';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../App.css';

const Single_album_search = () => {
    const { id } = useParams();
    const [singleAlbumData, setSingleAlbumData] = useState(null);
    const [singleTrackData, setSingleTrackData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useSongContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albumResponse = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists?market=IN&limit=50`, artistPara);
                const albumData = await albumResponse.json();
                setSingleAlbumData(albumData.playlists.items[1]);
    
                const trackResponse = await fetch(`https://api.spotify.com/v1/playlists/${albumData.playlists.items[1].id}/tracks?market=IN`, artistPara);
                const trackData = await trackResponse.json();
    
                // Introducing a 3-second delay before setting the track data
                setTimeout(() => {
                    setSingleTrackData(trackData);
                    setLoading(false); // Assuming you have a loading state to manage the loading effect
                },);
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
                                        <span>{singleAlbumData.description}</span>
                                    </div>
                                </div>
                                <div style={{ lineHeight: '20px', fontFamily: 'Old Standard TT, serif', marginTop: '35px' }}>
                                    <span style={{ fontSize: '30px' }}>{singleTrackData ? singleTrackData.total : '0'} Songs</span>
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
                            {singleTrackData.items.map((ele) => {
                                return (
                                    <div
                                        className={`album_single_track ${
                                            currentTrack === ele.track.preview_url && isPlaying ? 'playing' : ''
                                        }`}
                                        key={ele.track.id}>
                                        <img src={ele.track.album.images[2].url} alt='track cover' />
                                        <span style={{ width: '900px' }}>{ele.track.name}</span>
                                        <div style={{ display: 'flex', gap: '50px' }}>
                                            <span style={{ justifyContent: 'flex-end' }}>
                                                {duration(ele.track.duration_ms)} min
                                            </span>
                                            <button
                                                className='track_play_pause'
                                                onClick={() => {
                                                    trackCalculation(ele.track.preview_url);
                                                }}>
                                                {currentTrack === ele.track.preview_url && isPlaying ? (
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

export default Single_album_search;
