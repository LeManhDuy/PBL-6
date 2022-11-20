//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APISubjectTeacher = "/api/subject_teacher/";

chai.use(chaiHttp);
//Our parent block
describe("Subject Teacher", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET subject_teacher", () => {
        it("it should GET all the Subject_Teacher", (done) => {
            chai.request(API)
                .get(APISubjectTeacher)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.allSubjectTeacher.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
