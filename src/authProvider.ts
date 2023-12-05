import { AuthProvider, HttpError } from "react-admin";
// import data from "./users.json";

const apiUrl = "https://pet-shop-36ob.onrender.com/auth/login";
// const httpClient = fetchUtils.fetchJson;

/*
 * This authProvider is only for test purposes. Don't use it in production.
 */

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    type dataAdmin = {
      username: String;
      password: String;
    };

    const dataAdmin = {
      username,
      password,
    };

    // Вернуть промис из функции login
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataAdmin),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const admin = [];
        admin.push(data.user);

        const user = admin.find(
          (u) => u.username === username && u.password === password
        );

        if (user) {
          // eslint-disable-next-line no-unused-vars
          let { password, ...userToPersist } = user;
          localStorage.setItem("user", JSON.stringify(userToPersist));
          return Promise.resolve();
        }

        return Promise.reject(
          new HttpError("Unauthorized", 401, {
            message: "Invalid username or password",
          })
        );
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        return Promise.reject(error); // Вернуть отклоненный промис
      });
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
