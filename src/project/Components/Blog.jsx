import React from 'react';
import './Blog.css';
import {  useNavigate } from 'react-router';
import { setCurrentPost } from '../Data-Redux/BlogRedux';
import { useDispatch, useSelector } from 'react-redux';

const Blog = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const openPost=(post)=>{
        dispatch(setCurrentPost(post.id))
        navigate(`../post`)
    }
    const posts=useSelector(s=>s.blog.posts)

    return (
        <div className="blog-container">
            <h1>בלוג השכרת דירות</h1>
            <div className="posts">
            
            {posts&&posts.map(post => (
                    <div key={post.id} className="post">
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <a  onClick={()=>{openPost(post)}} className="read-more">קרא עוד</a>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Blog;
