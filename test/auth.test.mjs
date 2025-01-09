import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.mjs'; // Adjust the path and extension if necessary
import User from '../model/userModel.mjs'; // Adjust the path and extension if necessary

const should = chai.should();
chai.use(chaiHttp);

describe('Auth', () => {
    before(async () => {
        // Clear the database before running tests
        await User.deleteMany({});
    });

    describe('/POST register', () => {
        it('it should register a new user', (done) => {
            const user = {
                username: 'testuser',
                password: 'testpassword'
            };
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User registered');
                    res.body.user.should.have.property('username').eql('testuser');
                    done();
                });
        });

        it('it should not register a user with an existing username', (done) => {
            const user = {
                username: 'testuser',
                password: 'testpassword'
            };
            chai.request(server)
                .post('/auth/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Error registering user');
                    done();
                });
        });
    });
});