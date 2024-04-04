/* El profe sabe que nsotoros en la estrategia jwt, no guardamos datos confidenciales.
entonces quedamos de acuerdo en utilizar DTO solo para manipular de alguna manera la informacion para demostrar comprendido el tema */

import { userModel } from "../dao/models/usersModel.js"

export const currentDTO =async(user)=>{
    if(!user.first_name){
        let userGH = await userModel.findOne({ _id: user._doc._id}).lean()
        return userGH
    }
    user.first_name = user.first_name.toLowerCase()
    
    return user
}
