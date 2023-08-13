import Post from './Post';
import PostsLists from './PostsList';
import CreatePost from './CreatePost';
import { useState } from 'react';


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
      {currentPage}
    </div>
  );
}

export default App;
