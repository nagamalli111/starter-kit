package com.start.ecommerce.common.product;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private double price;
    private String imageName;
    private String imageType;
    @Lob
    @Basic(fetch = FetchType.LAZY)  // Use LAZY loading for large objects
    @Column(name = "image_data", columnDefinition = "MEDIUMBLOB")  // Optional: Explicitly specify MEDIUMBLOB
    private byte[] imageData;
}
