const NewBlogForm = ({ addBlog, newBlog, setNewBlog }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={({ target }) =>
          setNewBlog({ ...newBlog, title: target.value })
        }
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={newBlog.author}
        name="author"
        onChange={({ target }) =>
          setNewBlog({ ...newBlog, author: target.value })
        }
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={newBlog.url}
        name="url"
        onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
      />
    </div>
    {/*<input value={newBlog} onChange={handleBlogChange} />*/}
    <button type="submit">create</button>
  </form>
);

export default NewBlogForm;
