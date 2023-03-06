const express = require('express');
const router = express.Router();

const library = require("../models/library");
const markdown = require("../models/markdown");

/* GET home page. */
router.get('/', function(req, res) {
  const context = req.context;

  const fetch = library.fetch(req.query.folder);

  context.library_active = fetch.active;
  context.library_readme = fetch.readme || "null<br>";
  context.library_questions = fetch.questions;
  context.library_folders = fetch.folders;
  context.library_files = fetch.files;

  res.render('pages/index', context);
});

router.get('/markdown', function(req, res) {
  const context = req.context;
  context.title_page = "Markdown";
  
  let source = req.query.file.slice(0, -3);
  source = source.replace("library/", "");
  context.content = markdown.read_file("library", source);
  res.render('pages/markdown', context);
});

router.get('/docs', function(req, res) {
  const context = req.context;
  context.title_page = "Help";

  const source = "README";
  context.content = markdown.read_file("docs", req.query.file);
  res.render('pages/docs', context);
});

router.get('/404', function(req, res) {
  const context = req.context;
  context.title_page = "404";
  context.message = context.message ? context.message : "Halaman Tidak Ditemukan!";
  res.render('pages/404', context);
});

module.exports = router;
