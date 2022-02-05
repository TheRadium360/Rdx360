const AppError = require('./../utils/appError');
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");


const JWTtoken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, res) => {
    const token = JWTtoken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
exports.signUp = catchAsync(async(req, res, next) => {
    const newAdmin = await Admin.create({
        username: req.body.username,
        password: req.body.password,
    });

    createSendToken(newAdmin, 201, res);
});

exports.login = catchAsync(async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return next(new AppError("Please provide username and password", 400));
    }
    const admin = await Admin.findOne({ username }).select("+password");
    if (!admin || !(await admin.correctPassword(password, admin.password))) {
        return next(new AppError("incorrect username or password!"), 401);
    }
    createSendToken(admin, 201, res);
});


exports.protect = catchAsync(async(req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.headers.cookie) {
        token = req.headers.cookie.split("=")[1];
    }
    if (!token) {
        return next();
    }
    // verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshAdmin = await Admin.findById(decoded.id);

    // Grant Access to protected route
    req.admin = freshAdmin;
    res.locals.admin = freshAdmin;
    next();
});