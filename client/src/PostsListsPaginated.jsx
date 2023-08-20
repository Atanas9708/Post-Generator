import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostsPaginated } from './api/posts';

export default function PostsListsPaginated() {
    const [ page, setPage ] = useState(1);

    const { status, error, data, isPreviousData } = useQuery({
        queryKey: ['posts', { page }],
        keepPreviousData: true,
        queryFn: () => getPostsPaginated(page)
    });

    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'error') return <h1>{JSON.stringify(error)}</h1>

    return (
        <>
            <h1 className='text-center my-5 font-medium text-4xl'>Posts List Paginated</h1>
            <br/>
            <div className='flex justify-center'>
                <ol className='w-1/2'>
                    {data.posts.map(post => (
                        <li className='font-medium text-center hover:bg-white bg-amber-400 border-2 border-indigo-400 rounded-lg p-2 m-4 cursor-pointer' 
                             key={post.id}>
                            {post.title}
                        </li>
                    ))}
                </ol>
            </div>
            <div className='flex justify-center'>
                 {data.previousPage && <button className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"' onClick={() => setPage(data.previousPage)}>
                    Previous
                 </button>}
                 {data.nextPage && <button className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"' onClick={() => setPage(data.nextPage)}>
                    Next
                 </button>}
            </div>    
        </>
    )
}