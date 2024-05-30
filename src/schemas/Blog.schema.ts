import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Blog{

    @Prop()
    title:string;

    @Prop()
    details:string;

    @Prop()
    image:String ;
 }
export const BlogSchema = SchemaFactory.createForClass(Blog);
