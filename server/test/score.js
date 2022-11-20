//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIScore = "/api/score/";

chai.use(chaiHttp);
//Our parent block
describe("Score", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */

    describe("/GET/:pupilID score", () => {
        it("it should GET all score by the pupil id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "63704f5c1d1371ad460d532a";
            chai.request(API)
                .get(APIScore + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.result.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe("/GET/:scoreID score", () => {
        it("it should GET a score by the score id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "63705c308dcd23141cc77a0f";
            chai.request(API)
                .get(APIScore + "get-detail-score/" + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.scoreInfor.should.be.a("object");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
