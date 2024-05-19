const path=require("path")

const data=require("dotenv").config(
    {
        path:path.resolve(__dirname,`../environments/.env.${process.env.NODE_ENV}`)
    }
)

module.exports={
    PORT:data.parsed.PORT,
    API: data.parsed.ROOT_API,
    EMAIL:data.parsed.GMAIL_EMAIL,
    PASSWORD:data.parsed.GMAIL_PASSWORD,
    CLIENT_ID:data.GMAIL_CLIENT_ID,
    CLIENT_SECRET:data.GMAIL_CLIENT_SECRET,
    TOKEN:data.GMAIL_TOKEN

}