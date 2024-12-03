package com.start.ecommerce.common.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestPart Product product,
                                              @RequestPart MultipartFile imageFile) throws IOException {
       Product product1 =  productService.addProduct(product, imageFile);
       return ResponseEntity.ok(product1);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable long productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Product> updateProduct(@PathVariable long productId, @RequestPart Product product,
                                                 @RequestPart MultipartFile imageFile) throws IOException {
        Product p = productService.getProductById(productId);
        p.setName(product.getName());
        p.setDescription(product.getDescription());
        p.setPrice(product.getPrice());
        Product p1 = productService.addProduct(p, imageFile);
        return ResponseEntity.ok(p1);
    }

    @GetMapping("/{productId}/image")
    public ResponseEntity<byte[]> getProductImage(@PathVariable long productId) {
        Product product = productService.getProductById(productId);
        return ResponseEntity.ok(product.getImageData());
    }


    @PostMapping("/bulk")
    public ResponseEntity<List<Product>> addProducts(@RequestBody List<Product> products) {
        return ResponseEntity.ok(productService.addProducts(products));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
}
