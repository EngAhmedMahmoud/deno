import { Application, Router } from "https://deno.land/x/oak/mod.ts";
const app = new Application();
const router = new Router();
const port = 5000;
//get all products
router.get("/api/v1/products", ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
});
//get product details by id
router.get(
  "/api/v1/products/:id",
  ({ params, response }: { params: { id: string }; response: any }) => {
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
);
router.post(
  "/api/v1/products",
  async ({ request, response }: { request: any; response: any }) => {
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
    if (!product.id) {
      errors.push("id is required");
    }
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
      products.push(product);
      response.status = 201;
      response.body = {
        status: true,
        data: product,
      };
    }
  }
);
router.put(
  "/api/v1/products/:id",
  async ({
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  }) => {
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
);
router.delete(
  "/api/v1/products/:id",
  async ({ params, response }: { params: { id: string }; response: any }) => {
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
);

app.use(router.routes());
app.use(router.allowedMethods());
console.log(`Server is running on http://localhost:${port}`);
await app.listen({ port });
