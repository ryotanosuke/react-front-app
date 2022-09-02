import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import "./Share.css";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { proxy } = useContext(AuthContext);

  // 投稿の処理
  const handleSubmit = async (e) => {
    //何回もリロードされないようにする
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // 画像APIを叩く
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      // fileName と file のプロパティを持つdataを作成
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      try {
        // dataを引き渡し
        await axios.post(`${proxy}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post(`${proxy}/posts`, newPost);
      // リロードしなくても投稿を反映させる
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PUBLIC_FOLDER + user.profilePicture
                : PUBLIC_FOLDER + "/person/noAvatar.png"
            }
            alt=""
            className="shareProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="今何してるの？"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form
          className="shareButtons"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                name="file"
              />
            </label>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
