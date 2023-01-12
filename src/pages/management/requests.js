import axios from "axios";

const get = (setData, url) => {
  axios
    .get(url, {
      withCredentials: true,
      credentials: "same-origin",
    })
    .then(function (response) {
      setData(response.data.msg);
      return response.data.msg;
    })
    .catch(function (error) {
      if (error.response.status === 403 && url.includes("/api/admin")) {
        window.location.href = "/management/login";
      }
    });
};

const post = (data, url, cb) => {
  axios
    .post(url, data, {
      withCredentials: true,
      credentials: "same-origin",
    })
    .then(function (response) {
      if (cb !== undefined) {
        cb(response.data.msg);
      }
    })
    .catch(function (error) {
      if (cb !== undefined) {
        cb(error);
      }
    });
};

export { get, post };
