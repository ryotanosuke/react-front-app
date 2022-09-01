import React, { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./TimeLine.css";
// import { Posts } from "../../dummyData";
import axios from "axios";
import { AuthContext } from "../../state/AuthContext";

const TimeLine = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  // 投稿データを取得（ ログインuserデータではないので注意 ）
  // profileからならクエリのnameからフェッチ
  // homeからならcontxtのuserからフェッチ
  // サーバー側でタイムラインの表示内容( profileは自分のみ )を分岐
  useEffect(() => {
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`);
      setPosts(
        // dataであることに注意
        response.data
          // 日付順に並び替え
          .sort((post1, post2) => {
            return new Date(post2.createdAt) - new Date(post1.createdAt);
          })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TimeLine;
