import axios from "axios";
import { toast } from "react-toastify";
import { setToken, setIsLoggedIn, setUser } from "../reducers/authReducers";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/login`,
      {
        email,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("Response Login", response?.data);
    if (response?.status === 200) {
      const { data } = response?.data;
      const { token } = data;
      dispatch(setToken(token));
      dispatch(setIsLoggedIn(true));
      // console.log("token login", setToken(token));
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  } catch (error) {
    // console.log("Error: ", error);
    const message = error?.response?.data?.message;
    return message;
  }
};

export const register = (email, name, password, navigate) => async () => {
  try {
    const response = await axios.post(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/register`,
      {
        email,
        name,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log("Response register", response?.data);
    if (response?.status === 201) {
      toast.success(`Successfuly registered!`);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  } catch (error) {
    // console.log("Error Register: ", error);
    const message = error?.response?.data?.message;
    return message;
  }
};

export const continueWithGoogle =
  (accessToken, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(
        `https://shy-cloud-3319.fly.dev/api/v1/auth/google`,
        {
          access_token: accessToken,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("Response Login", response?.data);
      if (response?.status === 200) {
        const { token } = response?.data?.data;
        // console.log("token google", token);
        dispatch(setToken(token));
        dispatch(setIsLoggedIn(true));
        setTimeout(() => {
          toast.success("Welcome ✨");
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      // console.log("Error Google: ", error);
    }
  };

export const getProfile = () => async (dispatch, getState) => {
  const { token } = getState().auth;
  // console.log("token profile", token);
  try {
    const { data } = await axios.get(
      `https://shy-cloud-3319.fly.dev/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Response data", data.data);
    dispatch(setUser(data?.data));
  } catch (error) {
    // console.log("Error Profile: ", error);
  }
};

export const logout = (navigate) => async (dispatch) => {
  dispatch(setToken(null));
  dispatch(setIsLoggedIn(false));
  dispatch(setUser(null));

  navigate("/");
};
