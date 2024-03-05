import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport(
    {
        service: 'gmail',
        port: 587,
        auth: {
            user: "agusrugbyy@gmail.com",
            pass: "nlgixgkrvkyldwec"
        }
    }
)

export const sendMail = (to, subject, message)=>{
    return transport.sendMail(
        {
            to, subject,
            html: message
        }
    )
}