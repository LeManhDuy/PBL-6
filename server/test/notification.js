//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const { expect } = require("chai");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

const API = "http://localhost:8000";
const APINotify = '/api/notification/';

chai.use(chaiHttp);
//Our parent block
describe("Notifications", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("/GET notifications", () => {
        it("it should GET all public notifications", (done) => {
            chai.request(API)
                .get(APINotify)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.publicNotifications.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/:notificationID notification', () => {
        it('it should GET a public notification by the given id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '63623b0bd103dd13dcf258f3';
            chai.request(API)
                .get(APINotify + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/private/:personID private notification', () => {
        it('it should GET private notifications for teacher by the given person id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635e179cee485add9c27669e';
            chai.request(API)
                .get(APINotify + 'private/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.privateNotifications.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/private/parents/:personID private notification', () => {
        it('it should GET private notifications for parent by the given person id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '635df7827d49695053c322af';
            chai.request(API)
                .get(APINotify + 'private/parents/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.privateNotifications.should.be.a("array");
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });

    describe('/GET/private/get-by-id/:notificationID private notification', () => {
        it('it should GET private notifications for parent by the given person id', (done) => {
            // TODO add a model to db then get that *id* to take this test
            let id = '6363cbaf2458748fc7a2c104';
            chai.request(API)
                .get(APINotify + 'private/get-by-id/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    expect(res.body.success).to.be.true;
                    done();
                });
        });
    });
});

