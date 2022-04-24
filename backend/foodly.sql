\echo 'Delete and recreate foodly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE foodly;
CREATE DATABASE foodly;
\connect foodly


\i foodly-schema.sql


\echo 'Delete and recreate foodly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE foodly_test;
CREATE DATABASE foodly_test;


\connect foodly_test
\i foodly-schema.sql