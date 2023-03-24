const addProductToCart = async (req, res, next) => {
    const { productId } = req.body;

    if (!productId) {
        return next(new BadRequest("Product id is required"));
    }

    
};
