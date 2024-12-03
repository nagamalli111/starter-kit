package com.start.ecommerce.common.cart;

import com.example.backend.users.User;
import com.example.backend.users.service.UserService;
import com.start.ecommerce.common.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final UserService userService;
    private final CartRepository cartRepository;
    private final ProductService productService;

    public Cart getUserCart(String  user_id) {
        Long id = userService.getUser(user_id).get().getId();
        return cartRepository.findByUserId(id.toString()).orElseGet(() -> {
            User user = userService.getUser(user_id).orElseThrow(() -> new RuntimeException("User not found!"));
            Cart cart = new Cart();
            cart.setUser(user);
            return cartRepository.save(cart);
        });
    }

    @Override
    public Cart addProductToCart(String user_id, Long product_id, int quantity) {
        User user = userService.getUser(user_id).orElseThrow(() -> new RuntimeException("User not found!"));
        Cart userCart = this.getUserCart(user_id);
        CartItem cartItem = new CartItem();
        cartItem.setProduct(productService.getProductById(product_id));
        cartItem.setQuantity(quantity);
        userCart.getCartItemList().add(cartItem);
        return cartRepository.save(userCart);
    }

    @Override
    public void removeProductFromCart(int productId) {

    }

    @Override
    public void checkout() {

    }
}
