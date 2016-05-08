const {assert} = require("chai");

const format = require("../src/index.js");

describe("formatter", () => {
    it("formats things", () => {
        assert.equal(
            format(`@media screen{div.blah,p:after{color:"red";background-color:#ccc !important;}}`),
            `@media screen {
    div.blah,
    p:after {
        color: "red";
        background-color: #ccc !important;
    }
}`
        );
    });
});
