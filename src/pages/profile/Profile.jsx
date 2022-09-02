import React, { useEffect, useState } from "react";
import "./Profile.css";
import TimeLine from "../../components/timelline/TimeLine";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { proxy } = useContext(AuthContext);

  // スキームをステートに保持
  const [user, setUser] = useState({});

  // propsがないのでparamsからIDを取得
  const username = useParams().username;

  // Homeと違って画像と名前を取得する必要がある
  // paramを元にDB情報を取得
  useEffect(() => {
    const fetchUser = async () => {
      // サーバーはクエリで取得 [ router.get("/" , 関数 ) で取得できる ]
      const response = await axios.get(`${proxy}/users?username=${username}`);
      //ステートのuserにセット
      setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                // userに入っていなければデフォルトの写真（ PUBLIC_FOLDER ）
                src={user.coverPicture || PUBLIC_FOLDER + "/post/3.jpeg"}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  // PUBLIC_FOLDER +
                  // ↓ はサーバーのfindByIdの代わり（ ダミーデータ ）
                  // Users.filter((user) => user.id === post.id)[0].profilePicture
                  user.profilePicture
                    ? PUBLIC_FOLDER + user.profilePicture
                    : PUBLIC_FOLDER + "/person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
