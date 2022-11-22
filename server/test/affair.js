//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIAffair = '/api/affair/';

chai.use(chaiHttp);
//Our parent block
describe("Affairs", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET affairs", () => {
        it("it should GET all the affairs", (done) => {
            chai.request(API)
                .get(APIAffair)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getAffairInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/:personID affairs', () => {
        it('it should GET a affair by the given person id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635de701fa3a80de5e555b8f';
            chai.request(API)
                .get(APIAffair + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getAffairInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});

