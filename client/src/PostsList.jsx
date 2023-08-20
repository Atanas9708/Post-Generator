import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPosts } from './api/posts';
import Post from './Post';

export default function PostsLists({ setCurrentPage }) {
    const queryClient = useQueryClient();

    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        placeHolderData: [{ id: 1, title: 'Initial Data' }]
    });

    function handleClick(post) {
        queryClient.setQueriesData(['posts', post.id], post);
        queryClient.invalidateQueries(['posts'], { exact: true });
        setCurrentPage(<Post id={post.id} />);
    }

    if (postsQuery.status === 'loading') return <h1>Loading...</h1>
    if (postsQuery.status === 'error') return <h1>{JSON.stringify(postsQuery.error)}</h1>

    return (
        <>
            <h1 className='text-center my-5 font-medium text-4xl'>Posts List</h1>
            <div className='flex justify-center'>
                <ol className='w-1/2'>
                    {postsQuery.data.map(post => (
                        <li className='font-medium text-center hover:bg-white bg-amber-400 border-2 border-indigo-400 rounded-lg p-2 m-4 cursor-pointer' 
                            onClick={() => handleClick(post)} key={post.id}>
                            {post.title}
                        </li>
                    ))}
                </ol>
            </div>
        </>
    )
}