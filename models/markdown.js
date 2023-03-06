const path = require('path');
const fs = require('fs');

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const markdown = {}

markdown.render = string => md.render(string);

markdown.read_file = (root, source) => {
	source = source ? path.join(root, source + ".md") : path.join(root, "README.md");

	let buffer = fs.existsSync(source) ? fs.readFileSync(source).toString() : "";
	buffer = markdown.render(buffer);

	return buffer;
}

module.exports = markdown;