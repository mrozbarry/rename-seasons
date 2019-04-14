const flatten = arr => arr.reduce((out, sub) => out.concat(sub), []); 

module.exports = { flatten };

