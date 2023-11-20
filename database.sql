CREATE DATABASE blog;

CREATE TABLE
    users (
        ID_USER SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        pseudo VARCHAR(255) NOT NULL,
        key_password VARCHAR(1024) NOT NULL,
        is_admin BOOLEAN,
        date_create TIMESTAMP
    );

CREATE TABLE
    blogs (
        ID_BLOG SERIAL PRIMARY KEY,
        id_user INT NOT NULL,
        id_category INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        text_content_blog TEXT NOT NULL,
        picture VARCHAR(255) NOT NULL,
        date_create TIMESTAMP
    );

CREATE TABLE
    comments (
        ID_COMMENT SERIAL PRIMARY KEY,
        id_blog INT NOT NULL,
        id_user INT NOT NULL,
        text_content_comment TEXT NOT NULL,
        date_create TIMESTAMP
    );

CREATE TABLE
    categories (
        ID_CATEGORY SERIAL PRIMARY KEY,
        name_category VARCHAR(255) NOT NULL
    );