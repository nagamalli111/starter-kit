package com.start.ecommerce.common.cart;

public interface CartService {
    Cart addProductToCart(String user_id, Long product_id, int quantity);
    void removeProductFromCart(int productId);
    void checkout();
}
