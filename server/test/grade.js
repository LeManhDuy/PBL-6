//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIGrade = '/api/grade/';

chai.use(chaiHttp);
//Our parent block
describe("Grades", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET grades", () => {
        it("it should GET all the grades", (done) => {
            chai.request(API)
                .get(APIGrade)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.allGrade.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/:gradeID grades', () => {
        it('it should GET a grade by the given id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635a9048e70a140a006c374d';
            chai.request(API)
                .get(APIGrade + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getGradeInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/get-class-by-grade-id/:gradeID grades', () => {
        it('it should GET classes by the given Grade id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '6363d3982458748fc7a2c35e';
            chai.request(API)
                .get(APIGrade + 'get-class-by-grade-id/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getClassByGradeId.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});

