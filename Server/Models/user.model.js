import "dotenv/config";
import mongoose from "mongoose";
import crypto from "crypto";

const ALGORITHM = 'aes-256-cbc';

const getEncryptionKey = () => {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        console.warn(
            "\x1b[33m[WARNING]\x1b[0m ENCRYPTION_KEY is not set in .env. " +
            "Please set a persistent 64-char hex ENCRYPTION_KEY in your .env file."
        );
        return null;
    }
    return Buffer.from(key, 'hex');
};

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
        default:"Voice"
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


userSchema.pre('save', async function() {
    if (this.isModified('geminiApiKey') && this.geminiApiKey) {
        try {
            const keyBuffer = getEncryptionKey();
            if (!keyBuffer) {
                console.error("Cannot encrypt API key: ENCRYPTION_KEY is not configured");
                return;
            }
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, iv);
            let encrypted = cipher.update(this.geminiApiKey, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            this.geminiApiKey = encrypted;
            this.geminiApiIv = iv.toString('hex');
        } catch (e) {
            console.error("Encryption failed", e);
        }
    }
});

userSchema.methods.getDecryptedApiKey = function() {
    if (!this.geminiApiKey || !this.geminiApiIv) return this.geminiApiKey; 
    try {
        const keyBuffer = getEncryptionKey();
        if (!keyBuffer) {
            console.error("Cannot decrypt API key: ENCRYPTION_KEY is not configured");
            return "";
        }
        const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, Buffer.from(this.geminiApiIv, 'hex'));
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