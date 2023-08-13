import axios from 'axios';

const url = 'http://localhost:3000/posts';

export function getPosts() {
    return axios.get(url, { params: { _sort: "title" } }).then(res => res.data);
}

export function getPostsPaginated(page) {
    return axios
      .get(url, {
        params: { _page: page, _sort: "title", _limit: 2 },
      })
      .then(res => {
        const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
        return {
          nextPage: hasNext ? page + 1 : undefined,
          previousPage: page > 1 ? page - 1 : undefined,
          posts: res.data,
        }
      })
  }

  export function getPost(id) {
    return axios.get(`${url}/${id}`).then(res => res.data)
  }
  
  export function createPost({ title, body }) {
    return axios
      .post(url, {
        title,
        body
      })
      .then(res => res.data)
  }