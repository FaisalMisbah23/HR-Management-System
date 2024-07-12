import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const hrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default:"data:image/png;base64,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"
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    company:{
      type:mongoose.Types.ObjectId,
      ref:"Company"
    },
    notifications:[
      {
        message:String,
        date:String,
        seen:{
          type:Boolean,
          default:false
        }
      },
    ]
  },
  { timestamps: true }
);

hrSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

hrSchema.methods.checkCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

hrSchema.methods.genereteAccessToken = function () {
  return jwt.sign(
    {
      id: this.id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

hrSchema.methods.genereteRefreshToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const HR = mongoose.model("HR", hrSchema);
