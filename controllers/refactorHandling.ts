import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Model } from "mongoose";
import { FilterData } from "../interfaces/filterData";
import ApiErrors from "../utils/apiErrors";
import Features from "../utils/features";

export const getAll = <modelType>(model: Model<any>, modelName: string) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let filterData: any = {};
        let searchLength: number = 0;
        if (req.filterData) {
            filterData = req.filterData
        }
        // hear when fir this code  is called we are getting the data from the database
        // and fire the code in features file
        // when make find() is return in mongooseQuery
    if (req.query) {
      const searchResult: Features = new Features(model.find(filterData), req.query).filter().search(modelName) // hear naw build of query  and make execute to store in documents because return in response
    const searchData: modelType[] = await searchResult.mongooseQuery;
    searchLength = searchData.length;
    }
    const documentsCount: number = searchLength || await model.find(filterData).countDocuments()
    const features: Features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName).pagination(documentsCount);
    //hear but the mongooseQuery in object 
    const { mongooseQuery, paginationResult } = features
    const documents: modelType[] = await mongooseQuery; // hear make execute by query
    res.status(200).json({ length: documents.length, pagination: paginationResult, data: documents })
  });



export const getOne = <modelType>(model: Model<any>, populateOptions?: string) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let query = model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const document: modelType | null = await query;
    if (!document) { return next(new ApiErrors(req.__('not_found'), 404)) }
    res.status(200).json({ data: document })
  })


export const createOne = <modelType>(model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document: modelType = await model.create(req.body);
    res.status(201).json({ data: document })
  })

export const updateOne = <modelType>(model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!document) { return next(new ApiErrors('Document not found', 404)) }
    document.save();
    res.status(200).json({ data: document })
  })

export const deleteOne = <modelType>(model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const document: modelType | null = await model.findByIdAndDelete(req.params.id);
    if (!document) { return next(new ApiErrors('Document not found', 404)) }
    res.status(204).json()
  })
