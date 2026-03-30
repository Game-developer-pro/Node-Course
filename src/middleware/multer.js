const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || 
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ){
        cb(null, true);
    }else{
        cb(new Error("Invalid file type only jpeg, png, jpg are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter,
})

module.exports = { upload };