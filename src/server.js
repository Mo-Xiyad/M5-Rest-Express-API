import express from "express"; // NEW IMPORT SYNTAX (remember to add type: "module" in package.json to use new syntax)
import listEndpoints from "express-list-endpoints";

const server = express();

server.use(express.json()); // this line needs to be mentioned before the end point of the server

// ******************** END POINTS STARTS HERE **********************

const port = 3001;

// console.table(server);
