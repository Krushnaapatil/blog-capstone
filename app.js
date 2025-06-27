import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
  res.render("home", { posts: posts });
});

app.get("/compose", (req, res) => {
  res.render("post", {
    postTitle: '',
    postBody: '',
    index: undefined
  });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/edit/:index", (req, res) => {
  const index = req.params.index;
  res.render("post", {
    postTitle: posts[index].title,
    postBody: posts[index].content,
    index: index
  });
});

app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  posts[index] = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  res.redirect("/");
});

app.get("/delete/:index", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
