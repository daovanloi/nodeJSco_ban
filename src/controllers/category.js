import axios from "axios";
import dotenv from "dotenv";
import joi from "joi";
import Category from"../models/category"

dotenv.config();


const categorySchema = joi.object({
    name: joi.string().required(),
   

});

export const getAll = async (req, res) => {
    try {
        
        //const { data: products } = await axios.get(`${API_URI}/products`);
        const categories=await Category.find();
        if (categories.length === 0) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        return res.json(categories);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const get = async function (req, res) {
    try {
        //const { data: product } = await axios.get(`${API_URI}/products/${req.params.id}`);
        const category=await Category.findById(req.params.id).populate("products")
        if (!category) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        return res.json(category);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const create = async function (req, res) {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const   category = await Category.create(req.body);
        if (!category) {
            return res.json({
                message: "Không thêm danh mục",
            });
        }
        return res.json({
            message: "Thêm danh mục thành công",
            category,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async function (req, res) {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if (!category) {
            return res.json({
                message: "Cập nhật danh mục không thành công",
            });
        }
        return res.json({
            message: "Cập nhật danh  mục thành công",
           category
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async function (req, res) {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({
            message: "Xóa danh  mục thành công",
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
