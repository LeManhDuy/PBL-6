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
            let id = "6396b4672695623b059c6a50";
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
            let id = "6397f7c1e850caa282b74f15";
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
