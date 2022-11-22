//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APIFeeCategory = '/api/feecategory/';

chai.use(chaiHttp);
//Our parent block
describe("FeeCategories", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET FeeCategories", () => {
        it("it should GET all the Fee Categories", (done) => {
            chai.request(API)
                .get(APIFeeCategory)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.allFeeCategory.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/:feeCategoryID FeeCategories', () => {
        it('it should GET a Fee Category by the given id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '6369d2052a9d07e1a5898203';
            chai.request(API)
                .get(APIFeeCategory + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.getFeeCategoryInfor.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});

