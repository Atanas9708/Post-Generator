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
        <>
            <h1>{postQuery.data.title}</h1>
            <h2>{postQuery.data.body}</h2>
        </>
    )
}