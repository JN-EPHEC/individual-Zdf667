import { Sequelize } from "sequelize";

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    })
    : new Sequelize("postgres", "postgres.grvffvpkpgdybctqzuon", "d3HyaN-3sactL-Gi05vl", {
        host: "aws-1-eu-west-3.pooler.supabase.com",
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
    });

export default sequelize;