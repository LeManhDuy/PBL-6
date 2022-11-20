//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIStatistic = "/api/statistic/";

chai.use(chaiHttp);
//Our parent block
describe("Statistic", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET Statistic", () => {
        it("it should GET all the comment by class ID", (done) => {
            let classID = "635e2957b41c372de36e3330";
            chai.request(API)
                .get(APIStatistic + "get-comment-by-class-id/" + classID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("/GET Statistic", () => {
        it("it should GET all the comment by grade ID", (done) => {
            let gradeID = "6363d3982458748fc7a2c35e";
            chai.request(API)
                .get(APIStatistic + "get-comment-by-grade-id/" + gradeID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
