import React from "react";
import "./Post1.css";
import { MyButton } from "./MyButton";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet';


const Post1 = () => {
  const navigate = useNavigate();
  const post = useSelector((s) => s.post.currentPost);

  return (
    <>
      {post && <div className="post-container">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-content">
          {post.content && post.content.map((item, index) => <p key={index}>{item}</p>)}
        </div>
        <Helmet>
                <title>הכותרת החדשה</title>
            </Helmet>
        <MyButton
          iconName={"fa-solid fa-arrow-right"}
          myOnClick={() => navigate(`../blog`)}
          textToShow={"חזרה"}
          myType={"button"}
        ></MyButton>
      </div>}
    </>
  );
};

export default Post1;
