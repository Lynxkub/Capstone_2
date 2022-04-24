CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL CHECK(position('@' IN email) > 1)
);

CREATE TABLE plans (
    plan_id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users,
    plan_name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE saved_recipes (
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) REFERENCES users,
    api_id INTEGER NOT NULL
);

CREATE TABLE diet_plan_recipies (
    username VARCHAR(25) REFERENCES users,
    plan_id  INTEGER REFERENCES plans,
    api_id INTEGER REFERENCES saved_recipes,
    PRIMARY KEY (username , plan_id)
);