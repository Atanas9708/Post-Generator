import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPost } from './api/posts';
import Post from './Post';

export default function CreatePost({ setCurrentPage }) {
    const queryClient = useQueryClient();
    const titleRef = useRef();
    const bodyRef = useRef();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: data => {
            queryClient.setQueriesData(['posts', data.id], data);
            queryClient.invalidateQueries(['posts'], { exact: true });
            setCurrentPage(<Post id={data.id}/>);
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        createPostMutation.mutate({ 
            title: titleRef.current.value,
            body: bodyRef.current.value
        });
    }

    return (
        <div className='bg-yellow-300 w-1/3 m-auto mt-20 rounded-xl p-5 text-center font-medium'>
            {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
            <h1 className=' text-center my-5 font-medium text-4xl'>Create Post</h1>
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                <div className='p-5'>
                    <label htmlFor='title'>Title</label>
                    <input className='rounded-lg ml-1' id='title' ref={titleRef}/>
                </div>
                <div className='p-5'>
                    <label htmlFor='body'>Body</label>
                    <input className='rounded-lg ml-1' id='body' ref={bodyRef}/>
                </div>
                <button className='w-1/3 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"' disabled={createPostMutation.isLoading} type='submit'>
                    {createPostMutation.isLoading ? 'Loading...' : 'Create'}
                </button>
            </form>
        </div>
    )
}