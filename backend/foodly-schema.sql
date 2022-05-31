CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT  NOT NULL,
    last_name TEXT  NOT NULL,
    email TEXT CHECK(position('@' IN email) > 1)
);

CREATE TABLE plans (
    plan_id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE saved_recipes (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    api_id INTEGER
);


CREATE TABLE diet_plan_recipies (
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    plan_id  INTEGER REFERENCES plans ON DELETE CASCADE,
    api_id INTEGER REFERENCES saved_recipes ON DELETE CASCADE,
    PRIMARY KEY (username , plan_id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users ON DELETE CASCADE,
    api_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    date_posted TEXT NOT NULL,
    is_edited BOOLEAN NOT NULL,
    comment_commented_on INTEGER
)

