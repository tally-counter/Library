const path = require('path');
const fs = require('fs');

const markdown = require('./markdown');

const library = {}

library.fetch = source => {
    source = source ? source : "library";
    
    const result = {
        files: [],
        folders: [],
        active: source
    }

    let buffer = fs.readdirSync(source);
    for (let i = 0; i < buffer.length; i++) {
        let tmp = path.join(source, buffer[i]);
        if (fs.lstatSync(tmp).isDirectory())
            result.folders.push(buffer[i]);
        else if (fs.lstatSync(tmp).isFile()) {
            if (tmp == path.join(source, "README.md")) continue;
            if (tmp == path.join(source, "QUESTIONS.json")) continue;
            
            if (path.extname(tmp) == ".md") result.files.push(buffer[i]);
        }
    }

    // File is Exist
    buffer = path.join(source, "QUESTIONS.json");
    buffer = fs.existsSync(buffer) ? JSON.parse(fs.readFileSync(buffer).toString()) : [];
    result.questions = buffer;

    source = source.split("/");
    source.shift();
    source = source.toString()
    result.readme = markdown.read_file("library", path.join(source, "README"));

    return result;
}

module.exports = library;