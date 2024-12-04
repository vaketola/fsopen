const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const auth = request.get("authorization");

  if (!auth) {
    request.token = null;
    return next();
  }

  const authorization = auth.replace(/"/g, "");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    request.user = null;
    return next();
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    request.user = null;
    return next();
  }

  request.user = await User.findById(decodedToken.id);

  next();
};

module.exports = { tokenExtractor, userExtractor, errorHandler };
