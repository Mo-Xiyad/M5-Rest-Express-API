import express from "express"; // NEW IMPORT SYNTAX (remember to add type: "module" in package.json to use new syntax)
import listEndpoints from "express-list-endpoints";

import authorsRouter from "./API/blog/index.js";

const server = express();

server.use(express.json()); // this line needs to be mentioned before the end point of the server

// ******************** END POINTS STARTS HERE **********************

server.use("/authors", authorsRouter); // all of the endpoints which are in the authorsRouter will have /author as a prefix

const port = 3001;

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("Server running on post:", port);
});
