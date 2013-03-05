/*** Generated by streamline 0.4.5 (callbacks) - DO NOT EDIT ***/ var __rt=require('streamline/lib/callbacks/runtime').runtime(__filename),__func=__rt.__func,__cb=__rt.__cb; (function() {
  var BaseModule, User, __bind = function(fn, me) {
    return function() { return fn.apply(me, arguments); };
  }, __hasProp = { }.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) { child[key] = parent[key]; }; }; function ctor() { this.constructor = child; }; ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BaseModule = require("./baseModule");

  module.exports = User = (function(_super) {

    __extends(User, _super);

    function User() {
      this.getUserByEmail = __bind(this.getUserByEmail, this);

      this.getUserByKnownodeId = __bind(this.getUserByKnownodeId, this);

      this.getUserByNodeId = __bind(this.getUserByNodeId, this);
      User.__super__.constructor.call(this, null); };


    User.prototype.formatUser = function(usr) {
      var retVal;
      if (!usr) {
        return null; } ;

      retVal = {
        id: usr.id,
        KN_ID: usr.KN_ID,
        email: usr.email,
        firstName: usr.firstName,
        lastName: usr.lastName,
        gender: usr.gender,
        dateOfBirth: usr.dateOfBirth,
        displayName: ((usr.firstName + " ") + usr.lastName) };

      return retVal; };


    User.prototype.getAllUsers = function User_prototype_getAllUsers__1(_) { var userList, __this = this; var __frame = { name: "User_prototype_getAllUsers__1", line: 40 }; return __func(_, this, arguments, User_prototype_getAllUsers__1, 0, __frame, function __$User_prototype_getAllUsers__1() {

        userList = [];
        return __this.DB.User.all({
          limit: 10 }, __cb(_, __frame, 3, 6, function ___(__0, __2) {
          return __2.forEach_(__cb(_, __frame, 5, 6, function __$User_prototype_getAllUsers__1() {


            return _(null, userList); }, true), function __1(_, currentUserObj) { var __frame = { name: "__1", line: 45 }; return __func(_, this, arguments, __1, 0, __frame, function __$__1() { return _(null, userList.push(currentUserObj)); }); }); }, true)); }); };


    User.prototype.getUserByNodeId = function User_prototype_getUserByNodeId__2(id, _) { var usr, __this = this; var __frame = { name: "User_prototype_getUserByNodeId__2", line: 51 }; return __func(_, this, arguments, User_prototype_getUserByNodeId__2, 1, __frame, function __$User_prototype_getUserByNodeId__2() {

        return __this.DB.User.find(id, __cb(_, __frame, 2, 12, function ___(__0, __1) { usr = __1;
          return _(null, __this.formatUser(usr)); }, true)); }); };


    User.prototype.getUserByKnownodeId = function User_prototype_getUserByKnownodeId__3(id, _) { var usr, __this = this; var __frame = { name: "User_prototype_getUserByKnownodeId__3", line: 57 }; return __func(_, this, arguments, User_prototype_getUserByKnownodeId__3, 1, __frame, function __$User_prototype_getUserByKnownodeId__3() {

        return __this.DB.User.findOne({
          where: {
            KN_ID: id } }, __cb(_, __frame, 2, 12, function ___(__0, __1) { usr = __1;


          return _(null, __this.formatUser(usr)); }, true)); }); };


    User.prototype.getUserByEmail = function User_prototype_getUserByEmail__4(email, _) { var usr, __this = this; var __frame = { name: "User_prototype_getUserByEmail__4", line: 67 }; return __func(_, this, arguments, User_prototype_getUserByEmail__4, 1, __frame, function __$User_prototype_getUserByEmail__4() {

        return __this.DB.User.findOne({
          where: {
            email: email } }, __cb(_, __frame, 2, 12, function ___(__0, __1) { usr = __1;


          return _(null, __this.formatUser(usr)); }, true)); }); };


    User.prototype.saveNewUser = function User_prototype_saveNewUser__5(userData, _) { var __this = this; var __frame = { name: "User_prototype_saveNewUser__5", line: 77 }; return __func(_, this, arguments, User_prototype_saveNewUser__5, 1, __frame, function __$User_prototype_saveNewUser__5() {
        return __this.DB.User.create(userData, __cb(_, __frame, 1, 13, _, true)); }); };


    User.prototype.deleteUser = function User_prototype_deleteUser__6(id, _) { var user, __this = this; var __frame = { name: "User_prototype_deleteUser__6", line: 81 }; return __func(_, this, arguments, User_prototype_deleteUser__6, 1, __frame, function __$User_prototype_deleteUser__6() {

        return __this.DB.User.find(id, __cb(_, __frame, 2, 13, function ___(__0, __1) { user = __1;
          return user.destroy(__cb(_, __frame, 3, 13, _, true)); }, true)); }); };


    return User;

  })(BaseModule);

}).call(this);