# iTunes Search FE

Project contains a React App to search for the iTunes library. It connects to a local express proxy server. To start the app run the proxy server first.

#### npm run start-proxy-server

and then run the React app in a different terminal

#### npm start

## Design Decisions

Project is mainly using react hooks which handles all the interaction with the backend. As the app is relatively small hooks is sufficient in this case. Alternatively we can also add Redux and Redux Saga but with the tradeoff of much higher boilerplate code.
