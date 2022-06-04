import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from '../components/Markdown';


const Blog = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/blog/${blogId}`)
            .then((response) => response.json())
            .then(({ message, data }) => { setBlog(data); });
    }, []);
    console.log(blog)

    return (
        <div>
            {blog && blog.userId &&
                <div>
                    <h2>{blog.blogTitle}</h2>
                    <h3>By:{blog.userId.name}</h3>
                    <Markdown statement={blog.blogBody} />
                </div>
            }
        </div>
    );
}

export default Blog;