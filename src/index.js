const parser = require("../lib/grammar.js");

function indent(depth) {
    return Array.apply(null, {length: depth * 4 + 1}).join(" ");
}

function traverse(node, depth) {
    switch (node.type) {
        case "stylesheet": {
            return node.rules.map(n => traverse(n, depth)).join("\n");
        }
        case "media": {
            return '@media ' + node.selectors.join(",\n" + indent(depth) + "       ") + " {\n" +
                indent(depth + 1) +
                node.rules.map(n => traverse(n, depth + 1)).join("\n" + indent(depth + 1)) +
                "\n" + indent(depth) + "}";
        }
        case "ruleset": {
            return node.selectors.join(",\n" + indent(depth)) + " {\n" +
                indent(depth + 1) +
                node.declarations.map(n => traverse(n, depth + 1)).join("\n" + indent(depth + 1)) +
                "\n" + indent(depth) + "}";
        }
        case "declaration": {
            return node.property + ": " + node.value + (node.important ? " !important" : "") + ";";
        }
        default:
            throw new Error("Invalid node type: " + node.type);
    }
}

function format(text) {
    const parsed = parser.parse(text);

    return traverse(parsed, 0);
}

module.exports = format;
