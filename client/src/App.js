import Post from './Post';
import PostsLists from './PostsList';
import CreatePost from './CreatePost';
import { useState } from 'react';
import PostsListsPaginated from './PostsListsPagenated';
import PostsListsInfinite from './PostsListsInfinite';


function App() {
  const [ currentPage, setCurrentPage ] = useState(<PostsLists/>);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsLists/>)}>
        Posts List
      </button>
      <button onClick={() => setCurrentPage(<Post id={1}/>)}>
        First Post
      </button>
      <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage}/>)}>
        Create Post
      </button>
      <button onClick={() => setCurrentPage(<PostsListsPaginated />)}>
        Posts List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostsListsInfinite />)}>
        Posts Lists Infinite
      </button>
      {currentPage}
    </div>
  );
}

export default App;
