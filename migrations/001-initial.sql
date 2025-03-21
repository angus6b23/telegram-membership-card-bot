--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id       INTEGER                         PRIMARY KEY NOT NULL,
  role     INTEGER CHECK( role IN (0, 1, 2))  NOT NULL DEFAULT 0 --0: restricted user, 1: user, 2: admin
);

CREATE TABLE IF NOT EXISTS codes (
  id       INTEGER          PRIMARY KEY NOT NULL,
  format   TEXT             NOT NULL,
  content  TEXT             NOT NULL,
  amount   REAL             ,
  name     TEXT             NOT NULL,
  owner    INTEGER          NOT NULL,
  type     INTERGER CHECK (type IN (0, 1)) NOT NULL, -- 0: membership, 1: gift_card
  created_at DATETIME       DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY (owner) REFERENCES users (id)
);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------
DROP TABLE codes;

DROP TABLE users;
