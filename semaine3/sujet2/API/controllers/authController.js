import User from '../models/User.js';

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering a new user' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: 'Invalid username' });
        }

        if (!user.comparePassword(password)) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        req.session.user = user;
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
};

const logoutUser = (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while logging out' });
            }
            res.status(200).json({ message: 'User logged out successfully' });
        });
    } else {
        res.status(400).json({ error: 'No user is logged in' });
    }
};

export { loginUser, logoutUser, registerUser };
