package com.start.ecommerce.common.cart;

import lombok.Getter;

@Getter
public class AddToCartRequest {
    String userId;
    Long productId;
    int quantity;
}
