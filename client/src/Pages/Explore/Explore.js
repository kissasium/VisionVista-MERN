import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./Explore.css"

const Feed = () => {
  const [cardData, setCardData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    setFilteredCards(cardData);    // filtering cards based on the description and stuff 
  }, [cardData]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/post/all-posts');
        console.log(response.data);
        setCardData(response.data.data.posts);
        console.log(cardData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    const filtered = cardData.filter(card =>
      card.title.toLowerCase().includes(input) ||
      card.description.toLowerCase().includes(input) ||
      card.tags.some(tag => tag.toLowerCase().includes(input)) 
    );
    setFilteredCards(filtered);
    console.log("filtered", filtered);
  };

  const downloadImage = (imageUrl) => {

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSavePost = async (postId) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post(`/api/v1/post/${userId}/savePost/${postId}`);
      console.log('Post saved successfully:', response.data);
      alert('Post saved successfully');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }

  return (
    <div className="container-fluid explore-body">
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search" onChange={handleSearch} />
      </div>
      <div id="cardgroup1" className="container">
        <div id="cardgroup" className="row g-4">

          {filteredCards.map((card, index) => (
            <div key={index} className="card col-12 col-sm-6 col-md-4">
              <img src={card.postPicture} className="card-img-top" alt="Placeholder Image" />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">Posted by: {card.user.username}</p>
                <p className="card-text">Tags: {card.tags.join(', ')}</p>
                <button onClick={() => downloadImage(card.postPicture)} className="btn btn-info m-1 download-button">Download</button>
                <button onClick={() => handleSavePost(card._id)} className="btn btn-primary m-1 save-button">Save</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default Feed