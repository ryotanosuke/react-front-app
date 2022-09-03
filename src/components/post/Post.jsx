import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
// import { Users } from "../../dummyData";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

// timelineからpostが渡される
const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  // timelineに表示用のuser情報
  const [user, setUser] = useState({});

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // ログイン状態を監視するstateを取得 ( Postではないので注意 )
  const { user: currentUser, proxy } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${proxy}/users?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  //いいねのAPIを叩く
  const handleLike = async () => {
    try {
      // post._id は投稿の id , currentUser._id はログインしたユーザーの id
      // post._id は queryとして送ってあげる
      // Post.js自体がmapされているため
      await axios.put(`${proxy}/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deletePost = async () => {
    try {
      await axios

        // data { } をつける必要がある
        .delete(`${proxy}/posts/${post._id}`, { data: { userId: post.userId } })
        .then((res) => {
          // リロードしなくても投稿を反映させる
          window.location.reload();
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  // PUBLIC_FOLDER +
                  // Users.filter((user) => user.id === post.id)[0].profilePicture
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert
              onClick={() => {
                deletePost();
              }}
            />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img
            className="postImg"
            src={
              // 投稿用の写真 ( post.imgは変数 )
              // userではなくpostのスキーマのためPUBLIC_FOLDERが必要
              PUBLIC_FOLDER + post.img
            }
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PUBLIC_FOLDER + "/eart.png"}
              alt=""
              onClick={() => handleLike()}
            />
            <span className="postLikeCounter">
              {like}人がいいねを押しました
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
