const express = require("express");
const router = express.Router({ mergeParams: true });

const User = require("../models/user.js");

// Index — GET /users/:userId/foods
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render("foods/index.ejs", {
      foods: user.pantry,
      userId: req.params.userId,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// New — GET /users/:userId/foods/new
router.get("/new", (req, res) => {
  res.render("foods/new.ejs", { userId: req.params.userId });
});

// Create — POST /users/:userId/foods
router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.push(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Delete — DELETE /users/:userId/foods/:itemId
router.delete("/:itemId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Edit — GET /users/:userId/foods/:itemId/edit
router.get("/:itemId/edit", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const food = user.pantry.id(req.params.itemId);
    res.render("foods/edit.ejs", {
      food: food,
      userId: req.params.userId,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Update — PUT /users/:userId/foods/:itemId
router.put("/:itemId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.pantry.id(req.params.itemId).set(req.body);
    await user.save();
    res.redirect(`/users/${req.params.userId}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;