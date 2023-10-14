import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { artistPara } from './Search';
import '../../App.css';

const Single_categorie_search = () => {
    const { id } = useParams();
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists?market=IN&limit=50`, artistPara);
            const data = await response.json();
            setPlaylists(data.playlists.items);
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
       
    }, [id]);
   

    return (
      
        <div style={{ height: '500px', backgroundColor: 'red' }}>
           {loading?null:console.log(playlists)}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Playlists for Category: {id}</h2>
                    <ul>
                        {playlists.map((playlist) => (
                            <li key={playlist.id}>{playlist.id}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Single_categorie_search;
