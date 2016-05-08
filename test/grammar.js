const {assert} = require("chai");

const parser = require("../lib/grammar.js");

// TODO(xymostech): Make these tests actually check the return value.
describe("grammar", () => {
    it("parses media queries", () => {
        const body = `
        @media screen {}
        @media only screen {}
        @media not screen {}
        @media screen and (blah) {}
        @media screen and (max-width: 300) {}
        @media (max-width: 300) {}
        @media (max-width) {}
        @media (max-width: 300) and (min-width: 400) {}
        `;

        parser.parse(body);
    });

    it("parses selectors", () => {
        const body = `
        div, div {}
        div#boo.hello:after > div div {}
        div > div {}
        div div {}
        div#boo.hello:after {}
        div {}
        `;

        parser.parse(body);
    });

    it("parses capital letters", () => {
        const body = `DiV.BOO { CoLoR: "ReD"; }`;

        parser.parse(body);
    });

    it("parses properties", () => {
        const body = `
        div {
            test: 1 !important;
            test: blah(1, 2), blah(1/2);
            test: "\\"";
            test: "boo", 'boo';
            test: 'boo';
            test: 1, 1;
            width: 1;
            -webkit-blah0: 2;
            test: 1%;
            test: 1em;
            test: 1ex;
            test: 1px;
            test: 1cm;
            test: 1mm;
            test: 1in;
            test: 1pt;
            test: 1pc;
            test: 1deg;
            test: 1rad;
            test: 1grad;
            test: 1ms;
            test: 1s;
            test: 1hz;
            test: 1khz;
        }
        `;

        parser.parse(body);
    });

    it('parses nested things', () => {
        const body = `
        @media screen { div.blah { color: "red"; } }
        `;

        parser.parse(body);
    });
});
