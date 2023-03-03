import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { subjectRepository } from "../repositories/subjectRepository";

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestError("O nome é obrigatório");
    }

    const newSubject = subjectRepository.create({ name });

    await subjectRepository.save(newSubject);

    return res.status(201).json(newSubject);
  }

  async list(req: Request, res: Response) {
    try {
      const subjectList = await subjectRepository.find({
        relations: {
          rooms: true,
        },
      });
      res.status(200).json(subjectList);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }
}
