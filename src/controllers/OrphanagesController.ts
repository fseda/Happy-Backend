import { Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default { 
    async index(req: Request, res: Response) {

        const orphanagesRepo = getRepository(Orphanage);

        const orphanages = await orphanagesRepo.find();

        return res.status(200).json(orphanages);
    },

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const orphanagesRepo = getRepository(Orphanage);

        const orphanage = await orphanagesRepo.findOneOrFail(id);

        return res.status(200).json(orphanage);
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
        
        const orphanage = orphanagesRepo.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            openingHours,
            openOnWeekends,
        });
    
        const result = await orphanagesRepo.save(orphanage);

        return res.status(201).json(result);
    },
};