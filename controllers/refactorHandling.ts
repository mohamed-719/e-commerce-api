import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Model } from "mongoose";
import { FilterData } from "../interfaces/filterData";
import ApiErrors from "../utils/apiErrors";

export const getAll = <modelType>(model: Model<any>,modelNames: string) =>   
    asyncHandler(async(req:Request, res :Response,next:NextFunction) => {
        let filterData: any   =  {};
        if( req.filterData) {
            filterData = req.filterData
        }
    const document: modelType[] = await model.find(filterData)
    res.status(200).json({ data: document })
});



export const getOne = <modelType>(model: Model<any>) => 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const document:modelType | null = await model.findById(req.params.id); // id of categories 
        if (!document) { return next(new ApiErrors('Document not found', 404)) }
    res.status(201).json({ data: document })
    })


export const createOne = <modelType>(model: Model<any>) => 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const document: modelType | null = await model.create(req.body);
    res.status(201).json({ data: document })    
    })

export const updateOne = <modelType>(model: Model<any>) => 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const document: modelType | null = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!document) { return next(new ApiErrors('Document not found', 404)) }
    res.status(200).json({ data: document })
    })

export const deleteOne = <modelType>(model: Model<any>) => 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 
    const document: modelType | null = await model.findByIdAndDelete(req.params.id);
    res.status(200).json({ data: document })
    })
