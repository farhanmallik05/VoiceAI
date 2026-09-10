import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
    {
    name: String,

    path: String,

    keywords: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
)

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    assistantName:{
        type:String,
        default:"Shifra"
    },
    businessName:{
        type:String,
        default:""
    },
    businessType:{
        type:String,
        default:""
    },
    businessDescription:{
        type:String,
        default:""
    },
    tone:{
        type:String,
        enum: [
        "friendly",
        "professional",
        "sales",
      ],
      default:"friendly"
    },
    theme:{
        type:String,
        enum:[
        "light",
        "dark",
        "glass",
        "neon",
      ],
      default:"dark"
    },
    enableVoice:{
        type:Boolean,
        default:true
    },
    pages:{
        type:[pageSchema],
        default:[]
    },
    enableNavigation:{
        type:Boolean,
        default:true
    },
    geminiApiKey:{
        type:String,
        default:""
    },
    geminiApiIv: {
        type: String,
        default: ""
    },
    geminiStatus:{
        type:String,
        enum:[
        "active",
        "quota_exceeded",
        "invalid",
      ],
      default:"active"
    },
    totalMessages:{
        type:Number,
        default:0
    },
    plan:{
        type:String,
        enum:["free","pro"],
        default:"free"
    },
    requestLimit: {
      type: Number,
      default: 200,
    },

    proExpiresAt: {
      type: Date,
      default: null,
    },

    isSetupComplete:{
        type:Boolean,
        default:false
    }

},{timestamps:true})

import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');
const ALGORITHM = 'aes-256-cbc';

userSchema.pre('save', function(next) {
    if (this.isModified('geminiApiKey') && this.geminiApiKey) {
        try {
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
            let encrypted = cipher.update(this.geminiApiKey, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            this.geminiApiKey = encrypted;
            this.geminiApiIv = iv.toString('hex');
        } catch (e) {
            console.error("Encryption failed", e);
        }
    }
    next();
});

userSchema.methods.getDecryptedApiKey = function() {
    if (!this.geminiApiKey || !this.geminiApiIv) return this.geminiApiKey; 
    try {
        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), Buffer.from(this.geminiApiIv, 'hex'));
        let decrypted = decipher.update(this.geminiApiKey, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (e) {
        console.error("Decryption failed", e);
        return "";
    }
};

const User = mongoose.model("User" ,userSchema)

export default User