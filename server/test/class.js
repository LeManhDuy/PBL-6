//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";

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
                .get("/api/class")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.allClass.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
