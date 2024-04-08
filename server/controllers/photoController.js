const Photo = require("../models/Photo")

//Getall
const getAllPhotos = async(req,res)=>{
    const photos = await Photo.find().lean()
    if(!photos?.length){
        return res.status(400).json({message:'No photos found'})
    }
    res.json(photos)
}

//GetbyId
const getPhotoByID=async(req,res)=>{


}

//CreatPhoto
const createNewPhoto = async(req,res)=>{
    const { title, imageUrl } = req.body
    const photo = await Photo.create({ title, imageUrl })
    if (photo){
        return res.status(201).json({message: 'photo is created'})
    }
    else {
        return res.status(400).json({message: 'photo cant be created'})
    }
    
}

//UpdatePhoto
const updatePhoto = async(req,res) => {
    const {_id, title, body } = req.body
    if(!_id){
        res.status(400).json ({message:"required field!!"})
    }
    const photo = await Photo.findById(_id).exec()
    if(!photo){
        return res.status(400).json({message:"photo not found"})
    }

    photo.title = title
    photo.imageUrl = imageUrl

    const updatePhoto = await photo.save()
    res.json(`'${updatePhoto.title}' updated`)

}

//DeletePhoto
const deletePhoto = async(req,res) => {
    const {id} = req.body
    const photo = await Photo.findById(id).exec()
    if(!photo){
        return res.status(400).json({message:"this photo is not existed!!"})
    }
    const result = await Photo.deleteOne()
    res.json(` photo is deleted `)

}


module.exports={
    getAllPhotos,
    createNewPhoto,
    updatePhoto,
    deletePhoto
}