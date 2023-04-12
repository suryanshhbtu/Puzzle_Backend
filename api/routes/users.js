const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');

router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          // this type of fidng will not have user null -> [] empty Array
          return res.status(409).json({
            message: "mail exists",
          }); // 409 resource conflict,
          // 422 unprocessable entity
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => { // 10 is salt
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                time: req.body.time,
                score: req.body.score,
                level: req.body.level,
                role: req.body.role,
                password: hash,
              });
  
              user
                .save()
                .then((result) => {
                  console.log(result);
                  res.status(201).json({
                    message: "User Created",
                    user: user
                  });
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });


  router.delete("/:userId", (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
      .exec()
      .then((result) => {
        res.status(200).json({
          message: "user - deleted",
          result: result
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

  router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth Failed",
          });
        }
        // bcrypt offers -> compare (same strings have also different hash values but compare compares)
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          // user is array having unique user
          if (err) {
            return res.status(401).json({
              message: "Auth Failed",
            });
          }
          if (result) {
            const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            }, process.env.JWT_KEY, {
              expiresIn: "2h"
            });
            return res.status(200).json({
              message: "Auth Successful",
              token: token,
              expiresIn: "2h",
              _id: user[0]._id,
                name: user[0].name,
                email: user[0].email,
                time: user[0].time,
                score: user[0].score,
                level: user[0].level,
                role: user[0].role,
                password: user[0].password,
            });
          }
          res.status(401).json({
            message: "Auth Failed",
          });
        });
      });
  });
  router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        User.updateOne({ _id: id }, { password: hash })
          .exec()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              message: "Password Updated",
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
  
          });
      }
    });
  });
  
  module.exports = router;