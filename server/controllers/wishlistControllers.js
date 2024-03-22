import Wishlist from "../models/wishListModel.js";
import asyncHandler from "express-async-handler";
export const addToWishlist = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req?.user?._id;
        const productInUserWishlist = await Wishlist.findOne({ addedBy: userId, product: productId });
        if (productInUserWishlist) {
            return res.status(403).json({ message: "This Product is already in your wishlist" })
        }
        const wishList = await Wishlist.create({
            product: productId,
            addedBy: userId
        })
        res.status(201).json(wishList)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error?.message })
    }
})
export const allWishLists = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 2;

        const skip = (page - 1) * pageSize;

        const [wishList, totalItems] = await Promise.all([
            Wishlist.aggregate([
                {
                    $match: {
                        addedBy: userId
                    }
                }, {
                    $sort: {
                        createdAt: 1
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "addedBy",
                        as: "addedBy"
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        foreignField: "_id",
                        localField: "product",
                        as: "product"
                    }
                },
                {
                    $unwind: "$product"
                },
                {
                    $unwind: "$addedBy"
                },
                {
                    $skip: skip
                },
                {
                    $limit: pageSize
                }
            ]),
            Wishlist.countDocuments({ addedBy: userId })
        ]);

        res.status(200).json({ items: wishList, totalItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


export const deleteWishList = asyncHandler(async (req, res) => {
    try {
        const { wishlistId } = req.params;
        // console.log(wishlistId);
        const deleted = await Wishlist.findByIdAndDelete(wishlistId);
        if (!deleted) {
            return res.status(400).json({ message: "not deleted" });
        }
        res.status(203).json({ message: "Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})