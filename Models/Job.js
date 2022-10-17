const { Schema, model } = require('mongoose');
const validator = require('validator');

const { ObjectId } = Schema.Types


const jobSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Job name is required"],
        minlength: [5, "Name is too small"],
        maxlength: [100, "Name is too large"]
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"]
    },
    location: {
        type: String,
        required: [true, "Password is required"],
        enum: {
            values: ['dhaka', 'rajshahi', 'rangpur', 'barishal', 'jossore', 'chittagong', 'sylhet', 'khulna'],
            message: "{VALUE} isn't available right now"
        }
    },
    jobShift: {
        type: [String],
        enum: {
            values: ['remote', 'hybrid', 'offline'],
            message: "{VALUE} can't be the job type"
        },
        required: [true, "Job type is required"]
    },
    jobType: {
        type: String,
        enum: {
            values: ['part-time', 'full-time', 'internship'],
            message: "{VALUE} can't be the job type"
        },
        required: [true, "Job type is required"]
    },
    description: {
        type: String,
        minlength: [20, "Description too small"],
        required: [true, "Job description is required"]
    },
    hrManager: {
        name: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "User",
            required: true
        }

    },
    applierList: [{
        type: ObjectId,
        ref: "User"
    }],
    expireDate: {
        type: Date,
        required: [true, "Job expiration date is required"],
        default: +new Date() + 7 * 24 * 60 * 60 * 1000,
        min: Date.now()
    }

}, {
    timestamps: true
});

const Job = model('Job', jobSchema);

module.exports = Job;
