import React from 'react';
import Protected from '../components/AuthLayout';
import PostForm from '../components/post-form/PostForm';
import Container from '../components/container/Container';

function AddPost() {
    return (
        <div className="py-8">
            <Container>
                <Protected authentication={true}>
                    <PostForm />
                </Protected>
            </Container>
        </div>
    );
}

export default AddPost;