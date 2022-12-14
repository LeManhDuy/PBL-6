//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIComment = "/api/comment/";

chai.use(chaiHttp);
//Our parent block
describe("Comment", () => {
    beforeEach((done) => {
        done();
    });
    describe("/GET/:pupilID comment", () => {
        it("it should GET a comment by the given pupil id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "6396b4682695623b059c6a64";
            chai.request(API)
                .get(APIComment + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.pupilComment.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
