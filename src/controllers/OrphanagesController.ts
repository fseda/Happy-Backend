import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphangesView from '../views/orphanagesView';
import * as Yup from 'yup';

export default { 
    async index(req: Request, res: Response) {

        const orphanagesRepo = getRepository(Orphanage);

        const orphanages = await orphanagesRepo.find({
            relations: ['images']
        });

        return res.status(200).json(orphangesView.renderMany(orphanages));
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepo = getRepository(Orphanage);

        const orphanage = await orphanagesRepo.findOneOrFail(id, {
            relations: ['images']
        });

        return res.status(200).json(orphangesView.render(orphanage));
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends,
        } = req.body;
    
        const orphanagesRepo = getRepository(Orphanage);
        
        const requestImages = req.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename };
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends: openOnWeekends === 'true' ? true : false,
            images,
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().max(300).required(),
            instructions: Yup.string().required(),
            openingHours: Yup.string().required(),
            openOnWeekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const orphanage = orphanagesRepo.create(data);
    
        const result = await orphanagesRepo.save(orphanage);

        return res.status(201).json(result);
    },
};