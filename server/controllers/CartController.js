const { Cart, Product, CartProduct } = require('../models');

// Obtener el carrito de un usuario
const getCart = async (req, res) => {
    const user_id = req.user.id;
    
    try {
      const cart = await Cart.findOne({
        where: { user_id },
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      // Obtener los productos del carrito
      const cartProducts = await CartProduct.findAll({
        where: { cart_id: cart.id },
        include: {
          model: Product,
          attributes: ['id', 'name', 'price', 'image_url'],
        },
      });
  
      if (!cartProducts || cartProducts.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos en el carrito' });
      }
  
      // Devolver los productos del carrito
      res.json({
        products: cartProducts.map(cartProduct => ({
          productId: cartProduct.Product.id,
          productName: cartProduct.Product.name,
          productPrice: cartProduct.Product.price,
          quantity: cartProduct.quantity,
          image_url: cartProduct.Product.image_url,
        }))
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  
  
// Crear un nuevo carrito o añadir un producto al carrito
const createCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    // Verificar si el producto existe y tiene stock
    const product = await Product.findByPk(product_id);

    if (!product || product.quantity < quantity) {
      return res.status(400).json({ message: 'Stock insuficiente o producto no encontrado' });
    }

    // Verificar si el producto ya está en el carrito
    const cartProduct = await CartProduct.findOne({
      where: { cart_id: user_id, product_id }, 
    });

    if (cartProduct) {
      // Si el producto ya existe en el carrito, actualizar la cantidad
      cartProduct.quantity += quantity;
      await cartProduct.save();
    } else {
      // Si no existe en el carrito, agregarlo
      await CartProduct.create({
        cart_id: user_id,
        product_id,
        quantity,
      });
    }

    product.quantity -= quantity;
    await product.save();

    res.status(201).json({ message: 'Producto añadido al carrito exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.body; 

    try {
        // Buscar el carrito del usuario
        const cart = await Cart.findOne({
            where: { user_id },
        });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado para este usuario.' });
        }

        // Buscar el CartProduct
        let cartProduct = await CartProduct.findOne({
            where: { cart_id: cart.id, product_id },
        });

        // Si no se encuentra el CartProduct, lo creamos
        if (!cartProduct) {
            const product = await Product.findByPk(product_id);
            if (!product || product.quantity < 1) {
                return res.status(400).json({ message: 'Stock insuficiente para agregar al carrito' });
            }

            // Crear el CartProduct
            cartProduct = await CartProduct.create({
                cart_id: cart.id,
                product_id,
                quantity: 1,
            });

            product.quantity -= 1;
            await product.save();

            return res.status(201).json(cartProduct); 
        }

        // Si el producto ya está en el carrito, aumentamos la cantidad
        const product = await Product.findByPk(product_id);

        if (!product) {
            return res.status(400).json({ message: 'Producto no encontrado.' });
        }


        const newQuantity = cartProduct.quantity + 1;

        if (newQuantity > product.quantity) {
            return res.status(400).json({ message: 'Stock insuficiente para actualizar la cantidad' });
        }


        product.quantity -= 1;
        await product.save();

        // Actualizar la cantidad en el carrito
        cartProduct.quantity = newQuantity;
        await cartProduct.save();

        return res.status(201).json(cartProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const removeFromCart = async (req, res) => {
    const user_id = req.user.id;
    const { product_id } = req.body; 

    try {
        // Buscar el carrito del usuario
        const cart = await Cart.findOne({
            where: { user_id },
        });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado para este usuario.' });
        }

        // Buscar el CartProduct 
        const cartProduct = await CartProduct.findOne({
            where: { cart_id: cart.id, product_id },
        });

        if (!cartProduct) {
            return res.status(404).json({ message: 'Producto no encontrado en el carrito.' });
        }

        // Buscar el producto
        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        if (cartProduct.quantity > 1) {
            cartProduct.quantity -= 1;
            product.quantity += 1; 
            await cartProduct.save();
            await product.save();
            return res.status(200).json({ message: 'Producto reducido en el carrito exitosamente' });
        } else {
            await cartProduct.destroy();
            product.quantity += 1;  
            await product.save();
            return res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



// Eliminar un producto del carrito
const deleteCart = async (req, res) => {
    const { user_id, product_id } = req.params;
  
    try {
      // Buscar el carrito del usuario
      const cart = await Cart.findOne({
        where: { user_id: user_id },
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'El usuario no tiene un carrito' });
      }
  
      // Buscar el CartProduct que tiene el product_id en el carrito del usuario
      const cartProduct = await CartProduct.findOne({
        where: { cart_id: cart.id, product_id: product_id },
      });
  
      if (!cartProduct) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }
  
      // Obtener el producto correspondiente al product_id
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Aumentar el stock del producto al eliminarlo del carrito
      product.quantity += cartProduct.quantity;
      await product.save();
  
      // Eliminar el CartProduct
      await cartProduct.destroy();
  
      res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

module.exports = { getCart, createCart, removeFromCart, addToCart, deleteCart };
