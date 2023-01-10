USE docker_nginx_challenge_db;

CREATE TABLE people (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);
