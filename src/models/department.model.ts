import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface DepartmentAttrs {
  name: string;
  displayname: string;
}

// An interface that describes the properties
// that a User Model has
interface DepartmentModel extends mongoose.Model<DepartmentDoc> {
  build(attrs: DepartmentAttrs): DepartmentDoc;
}

// An interface that describes the properties
// that a User Document has
interface DepartmentDoc extends mongoose.Document {
  name: string;
  displayname: string;
}

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    displayname: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

departmentSchema.statics.build = (attrs: DepartmentAttrs) => new Department(attrs);

const Department = mongoose.model<DepartmentDoc, DepartmentModel>('Department', departmentSchema);

export { Department };
