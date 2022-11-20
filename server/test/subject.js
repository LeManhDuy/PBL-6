//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APISubject = "/api/subject/";

chai.use(chaiHttp);
//Our parent block
describe("Subject", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET Subject", () => {
        it("it should GET all the subjects", (done) => {
            chai.request(API)
                .get(APISubject)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.allSubject.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe("/GET/:subjectID subject", () => {
        it("it should GET a subject by the given id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "634988b9468b94a171ab5722";
            chai.request(API)
                .get(APISubject + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getSubjectInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
