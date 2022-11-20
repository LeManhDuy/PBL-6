//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIPupil = "/api/pupil/";

chai.use(chaiHttp);
//Our parent block
describe("Pupil", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET pupils", () => {
        it("it should GET all the Pupil", (done) => {
            chai.request(API)
                .get(APIPupil)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getPuilInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe("/GET/:pupilID pupil", () => {
        it("it should GET a pupil by the given id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "63704f5b1d1371ad460d5325";
            chai.request(API)
                .get(APIPupil + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getPupilInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
