// Profile.js
import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    picture: ''
  });
  const [hashedP, sethashedP] = useState('');

  // Use use effect hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/v1/user/${userId}`);
        const { username, email, password, pictureUrl } = response.data.user;
        setUserData(prev => ({ ...prev, username, email, picture: pictureUrl }));
        sethashedP(password);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts


  const handleSubmit = async (e) => {
    e.preventDefault();


    // validation  for password
    if (userData.password && (userData.password.length < 8 || userData.password.length > 15 || !userData.password.match(/[a-zA-Z]/))) {
      alert('Password must be between 8 and 15 characters long and should contain at least one letter.');
      return;
    }

    //  email should only contain 1 @  
    const atcount = (userData.email.match(/@/g) || []).length;
    if (atcount !== 1) {
      alert('Please enter an email address with exactly one "@" character');
      return false;
    }

    const domains = ['gmail', 'yahoo', 'hotmail', 'outlook'];
    const domain = userData.email.split('@')[1].split('.')[0];
    if (!domains.includes(domain))                     //  will check for the valid domain names 
    {
      alert('Pls enter valid domain (gmail, yahoo, hotmail, outlook).');
      return false;
    }


    if (!userData.email.includes('@') || !userData.email.includes('.'))     // it should contain @ and a .
    {
      alert('Please enter a valid email address.');
      return;
    }

    // usernames checks
    if (userData.username.length < 3 || userData.username.length > 15 || !userData.username.match(/[a-zA-Z]/)) {
      alert('Username must be between 3 and 15 characters :( ');
      return;
    }

    var pic = userData.picture;
    if (!pic) {
      pic = "pic2.jpeg";
    }
    console.log(pic);
    const obj = {
      'username': userData.username,
      'email': userData.email,
      'password': userData.password,
      'picture': pic
    }

    try {
      // Make a POST request to update user data
      const userid = localStorage.getItem('userId');
      await axios.post(`/api/v1/user/${userid}/update`, obj);
      const imgElement = document.getElementById('profilepic');
      imgElement.src = obj.picture;
      console.log(imgElement.src);
      alert('Profile saved successfully :)');

    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again :(');
    }


  };

  const handlePicChange = (e) => {
    setUserData({ ...userData, picture: '/images/' + e.target.files[0].name })
  }


  return (
    <div className='main'>
      <div className="profile-container">

        <div className="profile-left">

          <div className="profile-picture">
            <img src={userData.picture} id='profilepic' alt="Profile" />

            <input type='file' onChange={handlePicChange} className="change-profile-button" />
          </div>

        </div>

        <div className="profile-right">

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input placeholder='e.g:  kissasium' type="text" id="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input placeholder='e.g:  kalsoom@yahoo.com' type="email" id="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input placeholder='e.g:  Ab1234567' type="password" id="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
            </div>

            <button type="submit" className="save-button">Save</button>

          </form>

        </div>

      </div>
    </div>

  );
}

export default Profile;
