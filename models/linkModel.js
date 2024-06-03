// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// const clickSchema = new Schema({
//   insertedAt: { type: Date, default: Date.now },
//   ipAddress: { type: String }
// });

// const linkSchema = new Schema({
//   originalUrl: { type: String, required: true },
//   clicks: [clickSchema]
// });

// export default mongoose.model('Link', linkSchema);
// models/link.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const clickSchema = new Schema({
  insertedAt: { type: Date, default: Date.now },
  ipAddress: { type: String },
  targetParamValue: { type: String }
});

const targetValueSchema = new Schema({
  name: { type: String },
  value: { type: String }
});

const linkSchema = new Schema({
  originalUrl: { type: String, required: true },
  clicks: [clickSchema],
  targetParamName: { type: String, default: "t" },
  targetValues: [targetValueSchema]
});

export default mongoose.model('Link', linkSchema);
