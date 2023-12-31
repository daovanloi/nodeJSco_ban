import axios from "axios";
import dotenv from "dotenv";
import joi from "joi";
import Product from"../models/products"

dotenv.config();
const { API_URI } = process.env;

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    image: joi.string(),
    categoryId: joi.string().required(),
});

export const getAll = async (req, res) => {
    try {
        // 
        const { _sort = "createdAt", _order = "asc", _limit = 6, _page = 1 } = req.query;
        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order === "desc" ? -1 : 1,
            },
        };

        const products = await Product.paginate({}, options)
        // 
        //const { data: products } = await axios.get(`${API_URI}/products`);
        // const products=await Product.find();
        if (products.length === 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const get = async function (req, res) {
    try {
        //const { data: product } = await axios.get(`${API_URI}/products/${req.params.id}`);
        const product=await Product.findById(req.params.id).populate("categoryId")
        if (!product) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(product);
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const   product = await Product.create(req.body);
        if (!product) {
            return res.json({
                message: "Không thêm sản phẩm",
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async function (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async function (req, res) {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
