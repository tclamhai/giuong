import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface BedAttrs {
  name: string;
  displayname: string;
  active: Boolean;
  deleted: Boolean;
  createby: Date;
  createAt: Date;
  updateAt: Date;
}

// An interface that describes the properties
// that a User Model has
interface BedModel extends mongoose.Model<BedDoc> {
  build(attrs: BedAttrs): BedDoc;
}

// An interface that describes the properties
// that a User Document has
interface BedDoc extends mongoose.Document {
  name: string;
  displayname: string;
}

const bedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    displayname: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
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

bedSchema.statics.build = (attrs: BedAttrs) => new Bed(attrs);

const Bed = mongoose.model<BedDoc, BedModel>('Bed', bedSchema);

export { Bed };
