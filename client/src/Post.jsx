import { useQuery } from '@tanstack/react-query';
import { getPost } from './api/posts';

export default function Post({ id }) {
    const postQuery = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPost(id)
    });

    if (postQuery.status === 'loading') return <h1>Loading...</h1>
    if (postQuery.status === 'error') {
        return <h1>{JSON.stringify(postQuery.error)}</h1>
    }

    return (
        <div className='flex flex-col items-center bg-yellow-300 w-1/4 m-auto mt-20 rounded-xl p-5 text-center font-medium'>
            <h1 className='w-1/2 text-left'><span className='text-xl'>Title:</span> {postQuery.data.title}</h1>
            <p className='w-1/2 text-left'><span className='text-xl'>Text:</span> {postQuery.data.body}</p>
        </div>
    )
}   