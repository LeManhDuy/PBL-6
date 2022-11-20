//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIFee = '/api/fee/';

chai.use(chaiHttp);
//Our parent block
describe("Fees", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET Fees", () => {
        it("it should GET all the Fees", (done) => {
            chai.request(API)
                .get(APIFee)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.allFee.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/:feeID Fees', () => {
        it('it should GET a fee by the given id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '6378344b3b122575779949c7';
            chai.request(API)
                .get(APIFee + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getfeeInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/get-fee-by-category-id/:feeCategoryID Fees', () => {
        it('it should GET fees by the given FeeCategory id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '6369d2052a9d07e1a5898203';
            chai.request(API)
                .get(APIFee + 'get-fee-by-category-id/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getfeeInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/get-fee-status/:feeStatus Fees', () => {
        it('it should GET fees by the given Fee Status', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let status = 'true';
            chai.request(API)
                .get(APIFee + 'get-fee-status/' + status)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getfeeInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/get-fee-infor-by-parent-id/:personID Fees', () => {
        it('it should GET fees by the given Parent ID', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635e17d6d9a49257f8eb8936';
            chai.request(API)
                .get(APIFee + 'get-fee-infor-by-parent-id/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getFeeInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});

