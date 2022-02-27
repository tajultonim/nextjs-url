"use strict";
exports.__esModule = true;

function getBaseUrl(serverRequest) {
  try {
    let url;
    if (typeof window != "undefined") {
      url = new URL(window.location.origin);
    } else {
      let req = serverRequest;
      let headers = req.headers;
      let referer = headers.referer ? new URL(headers.referer) : "";
      let baseurlhost = headers.host;
      let refererhost = referer.host;
      if (
        refererhost == baseurlhost &&
        headers["sec-fetch-site"] == "same-origin"
      ) {
        url = new URL(referer.origin);
      } else {
        let protocol =
          baseurlhost.split(":")[0] == "localhost"
            ? "http"
            : baseurlhost.split(":")[0] == "127.0.0.0"
            ? "http"
            : "https";
        url = new URL(protocol + "://" + baseurlhost);
      }
    }
    return url;
  } catch (err) {
    console.log("Invalid Request or Window value");
  }
}

function getApiRoot(req) {
  return new URL(getBaseUrl(req).origin + "/api");
}

exports["default"] = getBaseUrl;
exports["getBaseUrl"] = getBaseUrl;
exports["getApiRoot"] = getApiRoot;
