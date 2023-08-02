import { useGetUser } from '../hooks/useGetUser';
import { useParams } from 'react-router-dom';
import { useGetBlogs } from '../hooks/useGetBlogs';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { Button, Form, Input } from 'antd';

const Blog = ({ handleLike, handleDelete }) => {
  const queryClient = useQueryClient();
  // https://ant.design/components/form#components-form-demo-usewatch
  const [commentForm] = Form.useForm();

  const { data: user } = useGetUser();
  const { data: blogs, isLoading: isBlogsLoading } = useGetBlogs();
  const { id: blogId } = useParams();

  if (isBlogsLoading) return <div>Is loading...</div>;

  const blog = blogs.find((b) => b.id === blogId);
  if (!blog) return null;

  const updateCommentMutation = useMutation(blogService.addComments, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const addComment = (fields) => {
    updateCommentMutation.mutate({ blogId, comment: fields.newComment });
    commentForm.setFieldValue('newComment', '');
  };

  return (
    <div className="blogElement">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>{blog.url}</div>
        <div>
          <div className="likesElement">likes {blog.likes}</div>
          <Button id="like-button" onClick={handleLike(blog.id)}>
            like
          </Button>
        </div>
        <div>added by {blog.user.username}</div>
        {blog.user.username === user.username ? (
          <Button
            id="delete-button"
            style={{ backgroundColor: 'lightblue' }}
            onClick={handleDelete(blog.id)}
          >
            delete
          </Button>
        ) : (
          <></>
        )}
        <div>
          <h4>Comments</h4>
          {/*controlled Form = kein State*/}
          <Form
            form={commentForm}
            onFinish={addComment}
            preserve={false}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item label="New Comment" name="newComment" shouldUpdate>
              <Input id="comment" type="text" placeholder="add new comment" />
            </Form.Item>
            <Button id="create-comment-button" type="primary" htmlType="submit">
              add comment
            </Button>
          </Form>
          <ul>
            {blog.comments.map((c, index) => {
              return <li key={index}>{c}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
