import { Request } from 'express';
import { Document, InferSchemaType } from 'mongoose';
import { userSchema } from './models/user';

export type UserRequest = Request & { user?: InferSchemaType<typeof userSchema> & Document };

