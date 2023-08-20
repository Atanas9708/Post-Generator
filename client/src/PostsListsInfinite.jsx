import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsPaginated } from './api/posts';

export default function PostsListsInfinite() {
    const { 
      status,
      error,
      data,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage
     } = useInfiniteQuery({
        queryKey: ['posts', 'infinite'],
        getNextPageParam: prevData => prevData.nextPage,
        queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam)
    });

    if (status === 'loading') return <h1>Loading...</h1>
    if (status === 'error') return <h1>{JSON.stringify(error)}</h1>

    return (
        <>
            <h1 className='text-center my-5 font-medium text-4xl'>Posts Lists Infinite</h1>
            <br/>
            <div className='flex justify-center'>
                <ol className='w-1/2'>
                    {data.pages
                        .flatMap(data => data.posts)
                        .map(post => (
                            <li className='font-medium text-center hover:bg-white bg-amber-400 border-2 border-indigo-400 rounded-lg p-2 m-4 cursor-pointer' key={post.id}>
                                {post.title}
                            </li>
                        ))}
                </ol>
            </div>
            <div className='flex justify-center'>
                {hasNextPage && (
                    <button className='py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"'
                        disabled={isFetchingNextPage} 
                        onClick={() => fetchNextPage(data.pageParams.nextPage)}>
                            { isFetchingNextPage ? 'Loading...' : 'Load More' }
                    </button>
                )} 
            </div>  
        </>
    )
}