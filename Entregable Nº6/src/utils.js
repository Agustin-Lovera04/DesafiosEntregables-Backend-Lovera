import {fileURLToPath} from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

import bcrypt from 'bcrypt'

export const hashearPass = (password)=>bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const validPass = (user,password)=>bcrypt.compareSync(password,user.password)