import React, { useEffect, useRef } from 'react';
import { SideBar, UserProfile } from '../components';
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { userQuery } from '../utils/data';
import { client } from '../sanityClient';
import Pins from './Pins';
import { fetchUser } from '../utils/fetchUser';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo =fetchUser()

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
      .then(data => setUser(data[0]))

  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0) 
  }, []);


  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <SideBar user={user ? user : false} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className='p-2 flex items-center flex-row justify-between w-full shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <h1 className='w-28'>Share It</h1>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="userImage" alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {toggleSidebar ?
          <div className='fixed bg-white h-screen shadow-md z-10 animate-slide-in w-4/5  overflow-y-auto'>
            <div className='flex justify-end absolute items-center w-full p-2'>
              <AiFillCloseCircle className='cursor-pointer' fontSize={30} onClick={() => setToggleSidebar(false)} />
            </div>
            <SideBar user={user ? user : false} closeToggle={setToggleSidebar} />
          </div> : null
        }
      </div>
      <div className='flex-1 pb-2 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user ? user : false} />} />
        </Routes>
      </div>

    </div>
  )
};

export default Home;
