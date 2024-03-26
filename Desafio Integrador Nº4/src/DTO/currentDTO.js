/* El profe sabe que nsotoros en la estrategia jwt, no guardamos datos confidenciales.
entonces quedamos de acuerdo en utilizar DTO solo para manipular de alguna manera la informacion para demostrar comprendido el tema */

export const currentDTO =(user)=>{
    user.first_name = user.first_name.toLowerCase()
    user.last_name = user.last_name.toUpperCase()
    return user
}
