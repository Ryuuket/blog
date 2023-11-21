-- Creation of product table

CREATE TABLE IF NOT EXISTS users (
        ID_USER INT NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        pseudo VARCHAR(255) NOT NULL,
        key_password VARCHAR(1024) NOT NULL,
        is_admin BOOLEAN,
        date_create TIMESTAMP,
        PRIMARY KEY (ID_USER)
    );


CREATE TABLE IF NOT EXISTS blogs (
        ID_BLOG INT NOT NULL,
        id_user INT NOT NULL,
        id_category INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        text_content_blog TEXT NOT NULL,
        picture VARCHAR(255) NOT NULL,
        date_create TIMESTAMP,
        PRIMARY KEY (ID_BLOG)
    );


CREATE TABLE IF NOT EXISTS comments (
        ID_COMMENT INT NOT NULL,
        id_blog INT NOT NULL,
        id_user INT NOT NULL,
        text_content_comment TEXT NOT NULL,
        date_create TIMESTAMP,
        PRIMARY KEY (ID_COMMENT)
    );


CREATE TABLE IF NOT EXISTS categories (
        ID_CATEGORY INT NOT NULL,
        name_category VARCHAR(255) NOT NULL,
        PRIMARY KEY (ID_CATEGORY)
    );