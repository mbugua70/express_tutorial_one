const express = require("express");
const router = express.Router();
const { members } = require("../data");
const uuid = require("uuid");
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: members });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const person = members.find((person) => person.id === id);
  if (!person) {
    res
      .status(404)
      .json({ success: false, msg: `We couldn't find the user of ID: ${id}` });
  }
  const newMember = members.filter((person) => person.id === id);
  res.status(201).json({ success: true, data: newMember });
});

// adding a post request

router.post("/", (req, res) => {
  const newData = {
    id: uuid.v4(),
    names: req.body.names,
    email: req.body.email,
    status: req.body.status,
  };

  if (!newData.names || !newData.email) {
    return res
      .status(404)
      .json({ success: false, msg: "Please provide the name and email" });
  }
  members.push(newData);
  res.status(201).json({ success: true, data: [...members] });
});

// update members

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const person = members.find((person) => person.id === id);
  if (!person) {
    res
      .status(404)
      .json({ success: true, msg: `We can't find user with the id ${id}` });
  }
  const newPersonDetail = members.map((person) => {
    if (person.id === id) {
      person.has_2fa = true;
    }
  });

  res.status(201).json({ success: true, data: [...members] });
});

module.exports = router;
