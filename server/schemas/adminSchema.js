const express = require("express");
const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
},
  password: {
    type: String,
    required: true,
}
});

module.exports = adminSchema;