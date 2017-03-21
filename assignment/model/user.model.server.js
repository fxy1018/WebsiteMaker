var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('WebAppUser', userSchema);
var q = require('../../node_modules/q/q');

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCreadentials = findUserByCreadentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    var d = q.defer();

    userModel.create(user, function(err, user){
        if (err){
            d.reject(err);
        }else{
            d.resolve(user);
        }
    });
    return d.promise;
}

function findUserById(userId) {
    var d = q.defer();

    userModel
        .findById(userId, function (err, user) {
            if(err){
                d.reject(err);
            } else {
                d.resolve(user);
            }
        });
    return d.promise;
}

function findUserByUsername(username) {
    var d = q.defer();

    userModel.findOne({username: username}, function (err, user) {
        if (err){
            d.reject(err);
        } else {
            d.resolve(user);
        }
    })
    return d.promise;
}

function findUserByCreadentials(username, password) {
    var d = q.defer();

    userModel
        .findOne({$and : [{username:username}, {password:password}]}, function(err, user){
        if (err) {
           d.reject(err);
        } else {
            d.resolve(user);
        }
        });
    return d.promise;
}

function updateUser(userId, user) {
    var d = q.defer();

    userModel.update({_id: userId}, {$set: {firstName: user.firstName, lastName:user.lastName}}, function(err, user){
        if (err) {
            d.reject(err);
        } else {
            d.resolve(user);
        }
    });
    return d.promise;
}

function deleteUser(userId) {
    var d = q.defer();

    userModel
        .remove({_id:userId}, function (err, status) {
            if (err){
                d.reject(new Error(err));
            }else {
                d.resolve(status);
            }
        });
    return d.promise;
}

