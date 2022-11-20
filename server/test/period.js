//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIPeriod = "/api/period/";

chai.use(chaiHttp);
//Our parent block
describe("Period", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET period", () => {
        it("it should GET all the Period", (done) => {
            chai.request(API)
                .get(APIPeriod)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.periods.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe("/GET/:periodID periods", () => {
        it("it should GET a period by the given id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "637071b0554bc14f83e802e8";
            chai.request(API)
                .get(APIPeriod + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.period.should.be.a("object");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
