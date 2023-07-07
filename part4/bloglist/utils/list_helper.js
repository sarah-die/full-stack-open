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
    const max = blogs.reduce((max, cur) => {
      return max.likes > cur.likes ? max : cur;
    }, -1);
    return { title: max.title, author: max.author, likes: max.likes };
  }
};

module.exports = { dummy, totalLikes, favoriteBlog };
