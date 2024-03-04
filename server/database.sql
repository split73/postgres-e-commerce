create TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    brand VARCHAR(255),
    stock INTEGER,
    lowResolutionImageUrl VARCHAR(1000),
    fullResolutionImageUrl VARCHAR(1000),
    price INT,
    overView VARCHAR[],
    keyFeatures VARCHAR[],
    specs VARCHAR[],
    specification VARCHAR[]
);

create TABLE reviews(
    id SERIAL PRIMARY KEY,
    date DATE,
    title VARCHAR(255),
    content VARCHAR(10000),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

create TABLE users(
    id SERIAL PRIMARY KEY,
    userEmail VARCHAR(255),
    userSecondEmail VARCHAR(255),
    userPassword VARCHAR(255),
    userPhoneNumber INT
);

create TABLE userCart(
    id SERIAL PRIMARY KEY,
    guitar_id INTEGER,
    FOREIGN KEY (guitar_id) REFERENCES product(id)
);