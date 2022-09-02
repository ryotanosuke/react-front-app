import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// 最初のユーザーの状態を定義
const initialState = {
  // user: JSON.parse(localStorage.getItem("user")) || null,
  user: {
    _id: "63019b460deb7acd04366205",
    username: "yota",
    email: "yo@yahoo.co.jp",
    password: "111111",
    profilePicture: "/person/1.jpeg",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
  },

  // isFetching: false,
  // error: false,
};

const proxy = "https://real-sns-nodejs.herokuapp.com/api";

// 状態をグローバルに管理する
// 使用する時はAuthContextをuseContextで受け取る
export const AuthContext = createContext(initialState);

// useReducerを作成してしてコンテキスト化
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // リロードしてもデータがリセットされない空間(ローカルストレージ)に保存する
  // ログイン情報が変わったときにレンダリング(更新)される
  useEffect(() => {
    // アプリケーション情報としての保存はJson形式にする必要がある
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        proxy,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
