//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIParent = '/api/parent/';

chai.use(chaiHttp);
//Our parent block
describe("Parents", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET parents", () => {
        it("it should GET all the parents", (done) => {
            chai.request(API)
                .get(APIParent)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getParentsInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/:parentID parent', () => {
        it('it should GET a parent by the given id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635df7827d49695053c322b1';
            chai.request(API)
                .get(APIParent + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getParentInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/get-parents-info/:personID parent', () => {
        it('it should GET a parent by the given person id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635df7827d49695053c322af';
            chai.request(API)
                .get(APIParent + 'get-parents-info/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getParentInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});

