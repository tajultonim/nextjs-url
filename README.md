##### this package is inspired by [next-absolute-url](https://github.com/jakeburden/nextjs-url)

# nextjs-url

> Get the protocol, host and all for your Next.js app

This module enables you to easily get the protocol, host and all URL params of your Next.js app, both on the server and the client.

## Install

With [npm](https://npmjs.org/) installed, run

```sh
npm install nextjs-url --save
```

or with [yarn](https://yarnpkg.com/) installed, run

```sh
yarn add nextjs-url
```

This package will let you get the current url of your running Next.js website. You can get the url server side or clientside. For server side calling, you have to provide a request object as a prop. You can get this object from getServerSideFunction. So it is important to note that you can not run this module in a static page as your domain is assigned after you page is built. You may consider calling it client side in this senario or use environment variable for preknown domains.

> If you are deploying with `Vercel`, you may consider using [System Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables).

## Structure

By default the function return an URL Object which is structured something like:

```
URL {
    hash,
    host,
    hostname,
    href,
    origin,
    password,
    pathname,
    port,
    protocol,
    search,
    searchParams: URLSearchParams {},
    username,
}
```

## Usage

### For server side calling:

You must provide a request for server side calling which can be acured by calling `getServerSideProps`.

```js
import { getBaseUrl, getApiRoot } from "nextjs-url";

export async function getServerSideProps({ req }) {
  const baseUrl = getBaseUrl(req).href; // http://localhost:<PORT>/
  const apiRoot = getApiRoot(req).href; // http://localhost:<PORT>/api/

  //Do something with the data

  return {
    props: {
      apiRoot,
      baseUrl,
    },
  };
}
```

### For calling in API:

You may sometimes need to call another API from a API. In that case you can call the module with the API request prop.

```js
import { getBaseUrl, getApiRoot } from "nextjs-url";

export default function Test(req, res) {
  const baseUrl = getBaseUrl(req).href; // http://localhost:<PORT>/
  const apiRoot = getApiRoot(req).href; // http://localhost:<PORT>/api/

  //Do something with the data

  res.send({ apiRoot, baseUrl });
}
```

### For client side calling:

For client side calling you don't need the request object just call the function without any prop. `Remeber that you can't call it without request prop in server side.`

```js
import { getBaseUrl, getApiRoot } from "nextjs-url";
import { useEffect } from "react";

export default function MyApp() {
  useEffect(() => {
    const baseUrl = getBaseUrl().href; // http://localhost:<PORT>/
    const apiRoot = getApiRoot().href; // http://localhost:<PORT>/api/

    //Do something with the data
  }, []);
  return <h>Hello World 🙋‍♂️</h>;
}
```

If you deployed your Next.js app with `Vercel` the `baseUrl` will be something like `https://<your-app>.vercel.app/`.

However, if you are running the app locally the `baseUrl` will be `http://localhost:<PORT>/` instead.

Same thing with the `apiRoot`.

MIT
