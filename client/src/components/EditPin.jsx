import React, { useEffect, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { categories, pinDetailQuery } from '../utils/data';
import { client } from '../sanityClient';
import Spinner from './Spinner';

const EditPin = ({ user }) => {
    const { pinId } = useParams();
    const [title, setTitle] = useState('');
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);
    const [destination, setDestination] = useState();
    const [fields, setFields] = useState();
    const [category, setCategory] = useState();
    const [imageAsset, setImageAsset] = useState();

    const fetchPinDetails = () => {
        const query = pinDetailQuery(pinId);

        if (query) {
            client.fetch(`${query}`).then((data) => {
                // setPinDetail(data[0]);
                const { title: savedTitle, about: savedAbout, destination: savedDestination, category: savedCategory, image: savedImageAsset } = data[0];
                setTitle(savedTitle);
                setAbout(savedAbout);
                setDestination(savedDestination);
                setCategory(savedCategory);
                setImageAsset(savedImageAsset)
                console.log({ imageAsset })
                console.log(data[0]);
            });
        }
    };


    useEffect(() => {
        fetchPinDetails();
    }, [pinId]);

    const navigate = useNavigate();


    const updatePin = () => {
        if (title && about && destination && category) {
            client
                .patch(pinId)
                .set({ title })
                .set({ about })
                .set({ destination })
                .set({ category })
                .commit()
                .then(() => {
                    navigate(`/pin-detail/${pinId}`);
                });
        } else {
            setFields(true);

            setTimeout(
                () => {
                    setFields(false);
                },
                2000,
            );
        }
    };
    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            {fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
            )}
            <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                    <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        {loading && (
                            <Spinner />
                        )}

                        <div className="relative h-full">
                            <img
                                src={imageAsset?.asset?.url}
                                alt="uploaded-pic"
                                className="h-full w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add your title"
                        className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
                    />
                    {user && (
                        <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
                            <img
                                src={user.image}
                                className="w-10 h-10 rounded-full"
                                alt="user-profile"
                            />
                            <p className="font-bold">{user.userName}</p>
                        </div>
                    )}
                    <input
                        type="text"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Tell everyone what your Pin is about"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                    />
                    <input
                        type="url"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Add a destination link"
                        className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
                    />

                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text:lg sm:text-xl">Choose Pin Category</p>
                            <select
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                                value={category}
                                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                            >
                                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                                {categories.map((item) => (
                                    <option key={item.name} className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end items-end mt-5">
                            <button
                                type="button"
                                onClick={updatePin}
                                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                            >
                                Update Pin
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPin;