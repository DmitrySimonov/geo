# Konux
## Konux Dashboard Client Application


We suggest to use the ‘axios’ library for the requests to the server, and a request would look like this example:

```axios
  .post('authenticate', JSON.stringify(req))
      .then(resp => {
              dispatch(loginSubmit(resp.data, StatusType.SUCCESS));
              browserHistory.push(”overview”);
        }, error => {
         dispatch(requestInvite( resp.data, StatusType.FAILED));
      }
    )
    .catch( error => {
         console.log(’‘authenticate”, error)
    });
```


*We placed ‘setTimeout’ in every place where we make requests to the server.*

**If you didn't install Nodejs go by link and install it;**
- [Nodejs](https://nodejs.org/en/download/)

### For correct installation of node environment
#### mac should run next command from project folder:
_cd ~/konux/andromeda-client/dashboard_
_sudo npm i yarn -g_ 
_sudo yarn i_

#### windows
_cd konux/andromeda-client/dashboard_
_npm i yarn -g_ 
_yarn i_


### To run application locally use :

#### Development mode
_yarn run dev_
- to see application go [http://localhost:8090](http://localhost:8090)

> Now dev local server uses PORT 8090, so it should be free

#### Production environment
_yarn run prop-env_
- to see application go [http://localhost:5000](http://localhost:5000)

> Now prod local server uses PORT 5000, so it should be free


In order to find an endpoint you should search the project by this type of query:

`//API' + API name + end-point`

*example:*
`//API User Management profile`

**The package client/actions/auth/index.js contains all requests from the auth app to your server.**