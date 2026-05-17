import "dotenv/config"

class Envconfig {
static DB_HOST = process.env.DB_HOST;
static DB_PORT = process.env.DB_PORT;
static DB_USERNAME = process.env.DB_USERNAME;
static DB_PASSWORD = process.env.DB_PASSWORD;
static DB_DATABASE = process.env.DB_DATABASE;
static JWT_SECRET = process.env.JWT_SECRET;
static NODE_ENV = process.env.NODE_ENV;

static PORT = process.env.PORT;

}

export default Envconfig;