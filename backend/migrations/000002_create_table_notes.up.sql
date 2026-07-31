CREATE TABLE "notes"(
    "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "id_user" BIGINT NOT NULL REFERENCES "users"("id"),
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);