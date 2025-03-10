import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        if (!userData?.userId) {
            return;
        }

        appwriteService.getPosts().then((response) => {
            if (response && response.documents) {
                setPosts(response.documents);
            }
        });
    }, [userData]);

    if (!userData?.userId) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts available. Be the first to create one!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;