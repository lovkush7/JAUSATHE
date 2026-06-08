import "reflect-metadata"
import AppDataSource from "./config/database.config.ts"
import { seedconfig } from "./utils/Fareseed.ts"


async function runseed() {
    console.log('running seed')

    await AppDataSource.initialize()

    await seedconfig()

    console.log("all seed seeded")
    process.exit(0)

}

runseed().catch((err) => {
    console.error(err)
    process.exit(1)
})