const Product = require("../model/product");
const User = require("../model/user");
const { cloudinary } = require("../config/cloudinary");

const addProduct = async (req, res) => {
    console.log(req.file);

    const { title, price, description } = req.body;

    try {
        if (!title || !price || !description || !req.file) {
            return res.status(401).json({ message: "all fieald are required" });
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder: "february Products" },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Cloudinary upload failed" });
                }
                console.log(result, "from cludinary");

                const productData = {
                    ...req.body,
                    image: result.secure_url,
                    imageId: result.public_id,
                };

                const product = await Product.create(productData);

                if (product) {
                    return res
                        .status(201)
                        .json({ message: "product created Succefully", product });
                }
            },
        );
        stream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error, error.message);
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.find();
        if (product) {
            return res
                .status(200)
                .json({ message: "Successfully", product, lenght: product.length });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error, error.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const removeProduct = await Product.findByIdAndDelete(id);

        if (!removeProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product deleted successfully", removeProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error, error.message);

    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product found successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error, error.message);
    }
}



module.exports = { addProduct, getProduct, deleteProduct, getSingleProduct };