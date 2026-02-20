import { createFieldRecord } from "./field.service.js";

export const createField = async (req, res) => {   
    try{
        const field = await createFieldRecord({
            fieldData: req.body,
            file: req.file
        })
        res.status(201).json({
            sucess: true,
            message: 'Cancha registrada exitosamente',
            data: field
        })
    }catch(error){
        res.status(500).json({
            sucess: false,
            message: 'Error al registrar la cancha',
            error: error.message
        })
    }
}