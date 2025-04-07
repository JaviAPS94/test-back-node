import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import logger from "../utils/logger.js";

const createOrder = async (req, res) => {
    // {
    //     userId: "asdadadasd",
    //     products: [
    //         {
    //             product: "asdasdasd",
    //             quantity: 2,
    //         },
    //         {
    //             product: "1223q34354",
    //             quantity: 2,
    //         },
    //     ]
    // }

    try {
        const { products, userId } = req.body;
        //Con el arreglo de productso que recibimos del front
        //Vamos a iterar este arreglo, consultando en BDD la informacion del producto
        //Definimos esta variable con let, porque va a cambiar su valor durante la ejecucion del codigo
        let totalPrice = 0;

        //Calcular el procio total basado en los productos y sus cantidades
        for(let item of products) {
            //Por cada producto vamos a ir la BDD a buscar su informacion -> ocupamos el precio
            const productFromDb = await Product.findById(item.product);
            if(!productFromDb) {
                return res.status(404).json({message: 'Product not found'});
            }
            totalPrice += productFromDb.price * item.quantity;
        }

        // const productPromises = products.map(async (item) => {
        //     productDb = await Product.findById(item.product);
        // })

        // await Promise.all(productPromises)

        const order = new Order({
            user: userId,
            products,
            totalPrice,
        })

        await order.save();
        res.status(201).json({message: 'Order created successfully', order});
    } catch (error) {
        res.status(500).json({message: 'Error creating order'})
    }
}

const getOrdersByUserId = async (req, res) => {
    try {
        //logger.silly("entra al metodo getOrdersByUserId - nivel silly")
        logger.debug("entra al metodo getOrdersByUserId - nivel debug")
        //logger.verbose("entra al metodo getOrdersByUserId - nivel verbose")
        //logger.http("entra al metodo getOrdersByUserId - nivel http")
        logger.info("entra al metodo getOrdersByUserId - nivel info")
        logger.warning("entra al metodo getOrdersByUserId - nivel warn")
        logger.error("entra al metodo getOrdersByUserId - nivel error")
        const userId = req.params.userId;
        const orders = await Order.find({user: userId}).populate("products.product");
        res.json(orders)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({message: 'Error getting orders'})
    }
}

export {   
    createOrder, getOrdersByUserId
}