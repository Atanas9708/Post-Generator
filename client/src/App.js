import { useState } from 'react';
import Post from './Post';
import PostsLists from './PostsList';
import CreatePost from './CreatePost';
import PostsListsPaginated from './PostsListsPaginated';
import PostsListsInfinite from './PostsListsInfinite';


function App() {
  const [ currentPage, setCurrentPage ] = useState();

  return (
  <>
      <div className='flex justify-center'>
      <button className='text-slate-100 bg-gray-950 font-medium hover:bg-sky-700 rounded-xl border-indigo-600 p-2 m-4' onClick={() => setCurrentPage(<PostsLists setCurrentPage={setCurrentPage}/>)}>
        Posts List
      </button>
      <button className='text-slate-100 bg-gray-950 font-medium hover:bg-sky-700 rounded-xl border-indigo-600 p-2 m-4' onClick={() => setCurrentPage(<Post id={1}/>)}>
        First Post
      </button>
      <button className='text-slate-100 bg-gray-950 font-medium hover:bg-sky-700 rounded-xl border-indigo-600 p-2 m-4' onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage}/>)}>
        Create Post
      </button>
      <button className='text-slate-100 bg-gray-950 font-medium hover:bg-sky-700 rounded-xl border-indigo-600 p-2 m-4' onClick={() => setCurrentPage(<PostsListsPaginated />)}>
        Posts List Paginated
      </button>
      <button className='text-slate-100 bg-gray-950 font-medium hover:bg-sky-700 rounded-xl border-indigo-600 p-2 m-4' onClick={() => setCurrentPage(<PostsListsInfinite />)}>
        Posts Lists Infinite
      </button>
    </div>
    {!currentPage ? <h1 className='flex justify-center text-4xl font-medium mt-20'>Select a Page</h1> : currentPage}
  </>
  );
}

export default App;
