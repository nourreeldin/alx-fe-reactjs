import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams(); 
  return (
    <div>
      <h2>Blog Post {id}</h2>
      <p>Here you can display the content for the blog post with the id: {id}</p>
    </div>
  );
};

export default BlogPost;

