require('dotenv').config(); // simpler & safer for Render

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const propRoutes = require('./routes/propRoutes');
const otpRoutes = require('./routes/otpRoutes');
const errorHandler = require('./middleware/error');

// Security & Performance
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();

// ✅ Use Render PORT
const PORT = process.env.PORT || 5000;

// ✅ Database Connection handled below

// ✅ Trust proxy (IMPORTANT for Render)
app.set('trust proxy', 1);

// ✅ Middleware
app.use(helmet());

app.use(cors({
    origin: true, // Allow all origins for local development
    credentials: true
}));

app.use(express.json({ limit: '10mb' })); // reduced size (50mb is risky)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// ✅ Rate limiter (fixed for proxy)
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
});
app.use('/api', limiter);

// ✅ Routes
app.use('/api', contactRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/properties', propRoutes);

// ✅ Health check (Render uses this)
app.get('/', (req, res) => {
    res.status(200).send('API is running 🚀');
});

// ✅ Error handler (must be last)
app.use(errorHandler);

// ✅ Start server ONLY after DB connects
connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});