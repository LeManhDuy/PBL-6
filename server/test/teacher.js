//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APITeacher = "/api/teacher/";

chai.use(chaiHttp);
//Our parent block
describe("Teacher", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET teachers", () => {
        it("it should GET all the Teacher", (done) => {
            chai.request(API)
                .get(APITeacher)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getTeacherInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe("/GET/:teacherID teacher", () => {
        it("it should GET a teacher by the given id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "635a1b27485e38dfe943bffb";
            chai.request(API)
                .get(APITeacher + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getTeacherInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
