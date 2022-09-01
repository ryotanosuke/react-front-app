import axios from "axios";

// login.jsから呼び出され,userにはアドレスが渡る
export const loginCall = async (user, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    // サーバーにアドレス(user)を送って一致するオブジェクトを返す
    const response = await axios.post("auth/login", user);

    // dispatchでuserに対して取得したオブジェクト(payload)を格納する
    // type によって取得した payload をどこに格納するか決定する
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "LOGIN_ERROR", payload: err });
  }
};
