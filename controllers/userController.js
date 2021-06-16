// export const getAllUsers = getAll(User);
// export const getUser = getOne(User);

// // Do NOT update passwords with this
// export const updateUser = updateOne(User);
// export const deleteUser = deleteOne(User);

export const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
