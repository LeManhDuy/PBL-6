//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APISchedule = "/api/schedule/";

chai.use(chaiHttp);
//Our parent block
describe("Schedule", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET schedules", () => {
        it("it should GET all the Schedules", (done) => {
            chai.request(API)
                .get(APISchedule)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.schedules.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
