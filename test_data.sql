CREATE TABLE restaurant(
id BIGSERIAL NOT NULL primary key,
name VARCHAR(50) NOT NULL,
location VARCHAR(50) NOT NULL,
price_range INT NOT NULL check(price_range >= 1 and price_range <=5 )
);

UPDATE restaurant SET name = 'sufficeint grace', location = 'yaba', price_range = 2 where id = 5;

CREATE TABLE reviews(
    id BIGSERIAL NOT NULL primary key,
    restaurant_id BIGINT NOT NULL REFERENCES restaurant(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >=1 and rating <=5)
);

INSERT INTO reviews (restaurant_id, name, review, rating) values (35, 'dayo', 'this is a nice restaurant', 4);

Select count(*) from reviews;
Select avg(rating) from reviews;

//converts the aveage to nmber decimal places//
Select trunc(avg(rating), 0) as average from reviews where restaurant_id = 35;
Select count(rating) from reviews where restaurant_id = 35;