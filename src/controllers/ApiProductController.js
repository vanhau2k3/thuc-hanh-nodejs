import productModel from '../model/ProductModel'

const getProductWithGroup = async (req, res) => {
  try {
    const group = req.params.id;
    let listProduct = await productModel.getProductWithGroup(group);
    return res.status(200).json({
      message: 'Success',
      data: listProduct
    });
  } catch (error) {
    console.log(error);
  }
}

const getDetailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let product = await productModel.getDetailProduct(id);
    return res.status(200).json({
      message: 'Success',
      data: product
    });
  } catch (error) {
    console.log(error);
  }
}

export default { getProductWithGroup, getDetailProduct }