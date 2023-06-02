const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { usedEmail, saveUser } = require("../database/user");

const router = express.Router();

const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/register", async (req, res) => {
  try {
    const user = userSchema.parse(req.body);
    const isEmailAlreadyBeingUsed = await usedEmail(user.email);
    if (isEmailAlreadyBeingUsed)
      return res.status(400).json({
        message: "This email has been used!",
      });
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    const savedUser = await saveUser(user);
    delete savedUser.password;
    res.json({ savedUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }

    res.status(500).json({
      message: "server error!",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await usedEmail(data.email);
    const isSamePassword = bcrypt.compareSync(data.password, user.password);
    if (!isSamePassword) return res.starus(401).send();

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.SECRET
    );

    res.json({
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }

    res.status(500).json({
      message: "server error!",
    });
  }
});

module.exports = router;
