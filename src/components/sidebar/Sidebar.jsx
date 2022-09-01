import {
  Bookmark,
  Home,
  MessageRounded,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import Closefriend from "../closefriend/Closefriend";
import "./Sidebar.css";
import { Users } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../state/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="sidevarWrapper">
        <ul className="sidebarList">
          <li className="sidevarListItem">
            <Home className="sidebarIcon" />
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <span className="sidebarListItemText">ホーム</span>
            </Link>
          </li>
          <li className="sidevarListItem">
            <Search className="sidebarIcon" />
            <span className="sidebarListItemText">検索</span>
          </li>
          <li className="sidevarListItem">
            <Notifications className="sidebarIcon" />
            <span className="sidebarListItemText">通知</span>
          </li>
          <li className="sidevarListItem">
            <MessageRounded className="sidebarIcon" />
            <span className="sidebarListItemText">メッセージ</span>
          </li>
          <li className="sidevarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">ブックマーク</span>
          </li>
          <li className="sidevarListItem">
            <Person className="sidebarIcon" />
            <Link
              to={`/profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="sidebarListItemText">プロフィール</span>
            </Link>
          </li>
          <li className="sidevarListItem">
            <Settings className="sidebarIcon" />
            <span className="sidebarListItemText">設定</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((user) => (
            <Closefriend user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
