import { BadRequestException } from '@nestjs/common'
import * as nodeMail from 'nodemailer'
import EMAIL_CONFIG from '../config/email'

export class Email {
    private transporter = null
    private verifyCodeMap = new Map()

    constructor() { 
        this.transporter = nodeMail.createTransport({
            host: EMAIL_CONFIG.host,
            port: EMAIL_CONFIG.port,
            secure: EMAIL_CONFIG.secure,
            auth: {
                user: EMAIL_CONFIG.user,
                pass: EMAIL_CONFIG.pass
            }
        })
    }

    send({ email, subject = EMAIL_CONFIG.alias, html = '' }) { 
        const code = Math.random().toString().slice(-6)
        const options = {
            from: `${EMAIL_CONFIG.alias}<${EMAIL_CONFIG.user}>`,
            to: email,
            subject,
            text: `验证码为${code}`,
            html
        }

        // 设置邮箱和验证码的
        this.verifyCodeMap.set(email, code)
        // 5分钟后失效
        this.invalidateEmailCode({ email })


        this.transporter.sendMail(options, (err, info) => { 
            if (err) {

                throw new BadRequestException('邮件发送失败')
            } else {
                console.log('邮件发送成功')
                console.log(info)
            }
        })
    }

    verify({ email, code }) { 
        console.log(email, code)
        if (!this.verifyCodeMap.has(email)) {
            throw new BadRequestException('email不正确，请校验')
        }

        if (this.verifyCodeMap.get(email) !== code) { 
            throw new BadRequestException('验证码不正确，请校验')
        }

        return true
    }

    invalidateEmailCode({ email }) { 
        setTimeout(() => { 
            this.verifyCodeMap.set(email, '')
        }, 1000 * 60 * 5)
    }


}