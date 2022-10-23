const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  name: {
    type: String,
  },
  createDate: {
    type: Date,
    dafault: Date.now,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const populationFields = 'posts'

UserSchema.post('save', async (doc) => {
    await doc.populate(populationFields).execPopulate()
})
// function populateFields() {
//     this.populate(populationFields)
// }

// UserSchema.pre('find', populateFields)
// UserSchema.pre('findOne', populateFields)
// UserSchema.pre('findOneAndUpdate', populateFields)
module.exports = model('User', UserSchema)