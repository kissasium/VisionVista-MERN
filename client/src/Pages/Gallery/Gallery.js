import React, { useState, useEffect } from 'react';
import './Gallery.css';
import axios from 'axios'

const Gallery = () => {

  const [cardsData, setCardsData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);



  // items that will be in the card
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    description: '',
    tags: '',
    image: ''
  });

  useEffect(() => {
    setFilteredCards(cardsData);    // filtering cards based on the description and stuff 
  }, [cardsData]);

  // Use use effect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/v1/post/${userId}/getPosts`);

        const myPosts = response.data.myPosts;
        const savedPosts = response.data.savedPosts;

        const postMap = new Map();
        const addPostToMap = (post) => {
          if (!postMap.has(post._id)) {
            postMap.set(post._id, post);
          }
        };

        myPosts.forEach((post) => {
          addPostToMap({
            _id: post._id,
            title: post.title,
            description: post.description,
            tags: post.tags,
            image: post.postPicture
          });
        });

        savedPosts.forEach((post) => {
          addPostToMap({
            _id: post._id,
            title: post.title,
            description: post.description,
            tags: post.tags,
            image: post.postPicture
          });
        });

        const newCardsData = Array.from(postMap.values());
        setCardsData(newCardsData);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = '/images/' + e.target.files[0].name;
    // const reader = new FileReader();
    // reader.onloadend = () => 
    // {
    setFormData({ ...formData, image: file });
    //  };
    // reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCardsData([...cardsData, { ...formData }]);

    // storing in database 
    const userId = localStorage.getItem('userId');
    const obj = {
      title: formData.title,
      description: formData.description,
      postPicture: formData.image,
      tags: [formData.tags]
    }
    await axios.post(`/api/v1/post/${userId}/createPost`, obj);



    setShowForm(false);
    setFormData({
      title: '',
      tags: '',
      description: '',
      image: ''
    });
  };


  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    const filtered = cardsData.filter(card =>
      card.title.toLowerCase().includes(input) ||
      card.tags.some(tag => tag.toLowerCase().includes(input)) ||
      card.description.toLowerCase().includes(input)
    );
    setFilteredCards(filtered);
  };

  const handleDeleteCard = async (postId) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(`/api/v1/post/${postId}/${userId}/deletePost`);
      setCardsData(cardsData.filter(card => card._id !== postId));
      console.log(response);
    } catch (error) {
      console.error('Error deleting post:', error);
    }

  };


  return (
    <div className='main-content'>

      <header>
        <h1>My Gallery</h1>
        <input type="text" placeholder="Search..." onChange={handleSearch} />
      </header>

      <nav id="navhere">
        <a id="buttonpic" href="#" onClick={() => setShowForm(true)}>Add Picture</a>
      </nav>

      <div className="card-container">
        {filteredCards.map((card, index) => (
          <div key={index} className="card">

            <button className="delete-btn" onClick={() => handleDeleteCard(card._id)}>Delete</button>
            <img src={card.image} alt="   Card Image" style={{ width: '100%' }} />

            <div className={`card-content ${card.isEditable ? 'editable' : ''}`}>
              <p><strong>Title:</strong> {card.title}</p>
              <p><strong>Description:</strong> {card.description}</p>
              <p><strong>Tags:</strong> {card.tags}</p>
              {/* <p><strong>Date:</strong> <span contentEditable={card.isEditable}>{card.date}</span></p>
              <p><strong>Time:</strong> <span contentEditable={card.isEditable}>{card.time}</span></p>
              <p><strong>Description:</strong> <span contentEditable={card.isEditable}>{card.description}</span></p> */}
            </div>

          </div>

        ))}
      </div>

      {showForm && (
        <div id="addCardForm">

          <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Title</label>
            <input type="Text" id="title" name="title" value={formData.title} onChange={handleInputChange} required /><br />

            <label htmlFor="description">Description:</label><br />
            <textarea type="Text" id="description" name="description" rows="4" cols="50" value={formData.description} onChange={handleInputChange} required></textarea><br />

            <label htmlFor="tags">Tags</label>
            <input type="Text" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} required /><br />

            <label htmlFor="image">Upload Image:</label>
            <input type="file" id="image" name="image" onChange={handleFileChange} /><br />

            <div id="imagePreview">
              {formData.image && <img src={formData.image} alt="Preview" />}
            </div><br />

            <input type="submit" value="Submit" />
          </form>

        </div>

      )}


      <footer>
        <p>&copy; 2024 Kissa Zahra&nbsp;&nbsp;&nbsp;&nbsp;Kalsoom Tariq&nbsp;&nbsp;&nbsp;&nbsp;Abtaal Aatif</p>
        <p>All rights reserved.</p>
      </footer>

    </div>
  );
};

export default Gallery;
