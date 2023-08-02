import { Button, Form, Input } from 'antd';

// 5.6
const NewBlogForm = ({ createBlog }) => {
  const [newBlogForm] = Form.useForm();

  const addBlog = (fields) => {
    createBlog({
      title: fields.title,
      author: fields.author,
      url: fields.url,
    });

    newBlogForm.setFieldsValue({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h2>Create a new Blog</h2>
      <Form
        form={newBlogForm}
        onFinish={addBlog}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Title" name="title">
          <Input id="title" type="text" placeholder="write title here" />
        </Form.Item>
        <Form.Item label="Author" name="author">
          <Input id="author" type="text" placeholder="write author here" />
        </Form.Item>
        <Form.Item label="URL" name="url">
          <Input id="url" type="text" placeholder="write url here" />
        </Form.Item>
        <Button id="create-blog-button" type="primary" htmlType="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default NewBlogForm;
