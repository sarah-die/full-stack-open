const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

// 4.5*
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  } else {
    const max = blogs.reduce(
      (max, cur) => {
        return max.likes > cur.likes ? max : cur;
      },
      { likes: -1 }
    );
    return { title: max.title, author: max.author, likes: max.likes };
  }
};

//4.6*
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = [];

  blogs.forEach((blog) => {
    const index = authors.findIndex((el) => el.author === blog.author);
    if (index !== -1) {
      authors[index].blogs++;
    } else {
      authors.push({ author: blog.author, blogs: 1 });
    }
  });

  const maxBlogs = authors.reduce(
    (tempMax, cur) => {
      return tempMax.blogs > cur.blogs ? tempMax : cur;
    },
    { blogs: -1 }
  );

  return { author: maxBlogs.author, blogs: maxBlogs.blogs };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
