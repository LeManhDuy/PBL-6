//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIClass = '/api/class/';

chai.use(chaiHttp);
//Our parent block
describe("Classes", () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET classes", () => {
        it("it should GET all the classes", (done) => {
            chai.request(API)
                .get(APIClass)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.allClass.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/:class classes', () => {
        it('it should GET a class by the given id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635e2957b41c372de36e3330';
            chai.request(API)
                .get(APIClass + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getClassInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
