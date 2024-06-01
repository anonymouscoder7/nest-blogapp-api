import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Category } from "src/categories/entities/category.entity";
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Blog {

    @Prop()
    title: string;

    @Prop()
    details: string;

    @Prop()
    image: String;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
    category: Category;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
