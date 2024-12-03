package com.start.ecommerce.common.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
   @Autowired
   private ProductRepository productRepository;

   public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
       product.setImageName(imageFile.getOriginalFilename());
       product.setImageType(imageFile.getContentType());
       product.setImageData(imageFile.getBytes());
       return productRepository.save(product);
   }
   
   public List<Product> addProducts(List<Product> products) {
       return productRepository.saveAll(products);
   }

   public List<Product> getAllProducts() {
       return productRepository.findAll();
   }

   public Product getProductById(Long id) {
       return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
   }
}
