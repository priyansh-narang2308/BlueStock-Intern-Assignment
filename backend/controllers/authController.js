const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await User.verifyPassword(email, password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
