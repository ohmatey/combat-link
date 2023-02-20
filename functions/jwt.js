import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export const createToken = (user) => {
  const token = jwt.sign({ user }, secret)
  
  return token
}

export const verifyToken = (token) => {
  try {
    const { user } = jwt.verify(token, secret)
    
    return user
  } catch (error) {
    console.error(error)
    
    return null
  }
}
