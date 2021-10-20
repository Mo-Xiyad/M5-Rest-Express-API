import express from "express"; // 3rd party form (npm i express)
import fs from "fs"; // core module from NODE
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

// this need to be initialized before everything
const authorsRouter = express.Router(); // a Router is a set of endpoints(GET, POST, PUT, DELETE) that share something like a prefix (authorsRouter is going to share /authors as a prefix)

// *************** How to find the path of the JSON file *****************
const currentFilePath = fileURLToPath(import.meta.url);
const parentFolderPath = dirname(currentFilePath);
const authorJSONpath = join(parentFolderPath, "../jsons/authors.json"); // one folder above
// const authorJSONpath = join(parentFolderPath, "authors.json"); //from the same folder

// *************** END *****************

authorsRouter.get("/", (req, res) => {
  // 1. read the content from the author.json
  const fileContent = fs.readFileSync(authorJSONpath);
  console.log(JSON.parse(fileContent));

  // 2. send back the content as a JSOn respons
  const arrayOfAuthors = JSON.parse(fileContent);
  res.send(arrayOfAuthors);
});

authorsRouter.get("/:authorId", (req, res) => {
  // 1. Read the content of authors.json file (obtaining an array)
  const authors = JSON.parse(fs.readFileSync(authorJSONpath));

  // 2. Find the user by id in the array
  const author = authors.find((auth) => auth.id === req.params.authorId);

  // 3. Send the user as a response
  res.send(author);
});

authorsRouter.post("/", (req, res) => {
  // 1. Read the request body obtaining the new authors's data
  console.log(req.body);

  const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log(newAuthor);

  // 2. Read the file content obtaining the authors array
  const authors = JSON.parse(fs.readFileSync(authorJSONpath));

  // 3. Add new student to the array
  authors.push(newAuthor);

  // 4. Write the array back to the file
  fs.writeFileSync(authorJSONpath, JSON.stringify(authors));

  // 5. Send back a proper response
  res.status(201).send({ id: newAuthor.id });
});

authorsRouter.put("/:authorId", (req, res) => {
  // 1. Read authors.json obtaining an array of authors
  const authors = JSON.parse(fs.readFileSync(authorJSONpath));

  // 2. Modify the specified student
  const index = authors.findIndex(
    (author) => author.id === req.params.authorId
  );

  const updatedAuthor = { ...authors[index], ...req.body };

  authors[index] = updatedAuthor;

  // 3. Save the file with updated list of authors
  fs.writeFileSync(authorJSONpath, JSON.stringify(authors));

  // 4. Send back a proper response
  res.send(updatedAuthor);
});

authorsRouter.delete("/:authorId", (req, res) => {
  // 1. Read authors.json obtaining an array of authors
  const authors = JSON.parse(fs.readFileSync(authorJSONpath));

  // 2. Filter out the specified student from the array, keeping just the remaining students

  const remainingAuthors = authors.filter(
    (author) => author.id !== req.params.authorId
  );

  // 3. Save the remaining students into students.json file again
  fs.writeFileSync(authorJSONpath, JSON.stringify(remainingAuthors));

  res.status(204).send(console.log("OBJECT DELETED"));
});

export default authorsRouter;

// {
//      "name": "{{$randomFirstName}}",
//     "surname": "{{$randomLastName}}",
//     "email": "{{$randomEmail}}",
//     "DOB": "{{$randomDatePast}}",
//     "avatar": "{{$randomImageUrl}}"
// }
