import { useState } from 'react';

// 5.6
const NewBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    });

    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
            placeholder="write url here"
          />
        </div>
        {/*<input value={newBlog} onChange={handleBlogChange} />*/}
        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
