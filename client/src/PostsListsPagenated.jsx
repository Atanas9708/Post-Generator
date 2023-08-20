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
            <h1>Posts Lists Paginated</h1>
            <br/>
            <small>{ isPreviousData && 'Previous Data' }</small>
                <ul>
                    {data.posts.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            <div>
                 {data.previousPage && <button onClick={() => setPage(data.previousPage)}>
                    Previous
                 </button>}
                 {data.nextPage && <button onClick={() => setPage(data.nextPage)}>
                    Next
                 </button>}
            </div>    
        </>
    )
}