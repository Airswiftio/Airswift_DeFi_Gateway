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
      console.log("Error", error);
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
      console.log("Error", error);
    });
};

export { get, post };
