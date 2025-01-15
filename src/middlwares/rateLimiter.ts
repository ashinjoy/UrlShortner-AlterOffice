import setLimiter from 'express-rate-limit'

const rateLimiter = setLimiter({
    windowMs:60*1000,
    max:4,
    message:"You have exceeded 4 requests per minute",
    headers:true
})

export {rateLimiter}