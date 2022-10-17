const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const { ObjectId } = Schema.Types

const userSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last Name is required"]
    },
    email: {
        type: String,
        trim: true,
        validate: [validator.isEmail, "Valid Email Is Required"],
        lowerCase: true,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                }),
            message: "Password isn't strong enough"
        },
    },
    confirmPassword: {
        type: String,
        validate: {
            validator: function (value) {
                const password = this.password;
                return value === password
            },
            message: "Password not matched",
        },
        required: [true, "Confirm Password is required"]
    },
    role: {
        type: String,
        default: "candidate",
        enum: ["candidate", "hr", "admin"]
    },
    contactNumber: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "discontinue"]
    },
    postedJob: [
        {
            name: {
                type: String
            },
            id: {
                type: ObjectId,
                ref: "Job"
            }
        }
    ],
    appliedJob: [
        {
            name: {
                type: String
            },
            id: {
                type: ObjectId,
                ref: "Job"
            }
        }
    ],
    passChangeDate: String,
    passResetToken: String,
    passResetExpires: String,
}, {
    timestamps: true
});


userSchema.pre("save", function (next) {
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password, salt);

    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.matchPassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;
}


const User = model('User', userSchema);

module.exports = User;
