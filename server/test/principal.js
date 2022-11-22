//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIPrincipal = "/api/principal/";

chai.use(chaiHttp);
//Our parent block
describe("Principal", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET principal", () => {
        it("it should GET all the Principal", (done) => {
            chai.request(API)
                .get(APIPrincipal)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getPrincipalInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe("/GET/:principalID principal", () => {
        it("it should GET a principal by the given id", (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = "635ce1c51f84afc94c59b405";
            chai.request(API)
                .get(APIPrincipal + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getPrincipalInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});
