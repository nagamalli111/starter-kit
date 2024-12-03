package com.start.ecommerce.common.cart;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private  CartServiceImpl cartService;

    @PostMapping
    public ResponseEntity<Cart> addToCart(@RequestBody AddToCartRequest request) {
        return ResponseEntity.ok(cartService.addProductToCart(request.getUserId(), request.getProductId(), request.getQuantity()));
    }
}
