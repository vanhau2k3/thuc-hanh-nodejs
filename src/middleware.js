const checkLogin = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      return res.status(404).json({
        message: "Vui lòng đăng nhập",
      });
    }
  };
  
  const checkUser = (req, res, next) => {
    const id = req.session.user?.id;
    const role = req.session.user?.role;
    const idUser = req.params.id;
  
    if (id == idUser || role === 2) {
      next();
    } else {
      return res.status(404).json({
        message: "Bạn không có quyền sử dụng chức năng",
      });
    }
  };
  
  export default {
    checkLogin,
    checkUser,
  };