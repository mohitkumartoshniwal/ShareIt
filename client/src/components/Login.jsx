import React from 'react';
import { GoogleLogin } from 'react-google-login'
import { client } from '../sanityClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()

    const responseGoogle = (res) => {
        localStorage.setItem('user', JSON.stringify(res.profileObj))

        const { name, googleId, imageUrl } = res.profileObj

        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl
        }

        client.createIfNotExists(doc).then(() => navigate('/', { replace: true }))
    }
    return (
        <>
            <div className='flex h-screen'>
                <div className="m-auto">

                    <h1 className='text-center'>SHARE IT</h1>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

            </div>
        </>
    );
};

export default Login;
