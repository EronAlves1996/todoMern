import { model, Model, Types } from "mongoose";
import { mongooseSchemaDef } from "../schema/schemaType";

type loaderDefsType = {
  [key: string]: {
    [key: string]: (...args: any) => Promise<any>;
  };
};

function createLoaders(mongooseSchemas: mongooseSchemaDef[]) {
  const models: Model<any, unknown, unknown, unknown, any>[] =
    mongooseSchemas.map((mongoSchema) =>
      model(mongoSchema.name, mongoSchema.schema)
    );
  return models.reduce((loaderDefs: loaderDefsType, model) => {
    const modelName = model.modelName;
    loaderDefs[modelName] = {
      findOneBy: async (criteria: any) => {
        const result = await model.findOne(criteria);
        return result.toObject();
      },
      findManyBy: async (criteria: any) => {
        const result = await model.find(criteria);
        return result.map((r) => r.toObject());
      },
      create: async (entity: any) => {
        const _id = new Types.ObjectId();
        const createdDoc = new model({ ...entity, _id });
        const docSaved = await createdDoc.save();
        return docSaved.toObject();
      },
      existsBy: async (criteria: any) => {
        const exists = await model.exists(criteria);
        return !!exists;
      },
      updateWhere: async (criteria: any, entity: any) => {
        const updated = await model.findOneAndUpdate(criteria, entity, {
          new: true,
        });
        return updated.toObject();
      },
      delete: async (criteria: any) => {
        const deleted = await model.findOneAndDelete(criteria);
        return deleted.toObject();
      },
    };
    return loaderDefs;
  }, {});
}

export default createLoaders;
