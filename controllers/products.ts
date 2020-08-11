let products = [
  {
    id: "1",
    title: "iphone 11",
    price: 1000,
    currency: "USD",
  },
  {
    id: "2",
    title: "iphone 12",
    price: 2000,
    currency: "USD",
  },
  {
    id: "3",
    title: "iphone 13",
    price: 3000,
    currency: "USD",
  },
];
import db from "./../utils/dbConnection.ts";
let productCollection = db.collection("products");
class Product {
  async products({ response }: { response: any }) {
    let products = await productCollection.find();
    response.body = {
      success: true,
      data: products,
    };
  }
  product({ params, response }: { params: { id: string }; response: any }) {
    let productId = params.id;
    if (!productId) {
      response.status = 400;
      response.body = {
        status: false,
        msg: "Product Id is required",
      };
    }
    let productDetails = products.find((product) => {
      return product.id === productId;
    });
    if (productDetails) {
      response.status = 200;
      response.body = {
        status: true,
        data: productDetails,
      };
    } else {
      response.status = 400;
      response.body = {
        status: false,
        msg: "This product Does not exist",
      };
    }
  }
  async save({ request, response }: { request: any; response: any }) {
    const body = await request.body();
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        status: false,
        msg: "Missed Parameters",
      };
    }
    let product = await body.value;
    const errors = [];
    if (!product.title) {
      errors.push("title is required");
    }
    if (!product.price) {
      errors.push("price is required");
    }
    if (!product.currency) {
      errors.push("currency is required");
    }
    if (errors.length !== 0) {
      response.status = 400;
      response.body = {
        status: false,
        errors: errors,
      };
    } else {
      //save new product in db
      await productCollection.insertOne(product);
      response.status = 201;
      response.body = {
        status: true,
        data: product,
      };
    }
  }
  async update({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) {
    let body = await request.body();
    let productId = params.id;
    if (!productId) {
      (response.status = 400),
        (response.body = {
          status: false,
          msg: "ProductId is required",
        });
    }
    //get product
    let productDetails = products.find((product) => {
      return product.id === productId;
    });
    if (productDetails) {
      //updating the product
      let newProduct = await body.value;
      console.log(productDetails);
      products = products.map((element) => {
        return element.id === productId ? { ...newProduct } : element;
      });
      response.status = 200;
      response.body = {
        status: true,
        data: newProduct,
      };
    } else {
      response.status = 400;
      response.body = {
        status: false,
        msg: "This product does not exist",
      };
    }
  }
  async delete({
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  }) {
    //productId
    let productId = params.id;
    //get product details
    let productDetails = products.find((element) => {
      return element.id === productId;
    });
    if (productDetails) {
      //get the index in array
      let productIndex = products.indexOf(productDetails);
      if (productIndex > -1) {
        products.splice(productIndex, 1);
      }
      response.status = 200;
      response.body = {
        status: true,
        data: productDetails,
      };
    } else {
      response.status = 400;
      response.body = {
        status: false,
        msg: "This product not exist",
      };
    }
  }
}
export default new Product();
